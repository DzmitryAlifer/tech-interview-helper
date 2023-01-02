import {AfterViewInit, ChangeDetectionStrategy, Component, ElementRef} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Store} from '@ngrx/store';
import {combineLatest, Observable} from 'rxjs';
import {debounceTime, map} from 'rxjs/operators';
import {Tech} from 'src/types';
import {highlight} from '../common';
import {DEFAULT_FONT_SIZE_PX} from '../constants';
import {getUserSettings} from '../service/firebase';
import {RightSidePanelService} from '../service/right-side-panel.service';
import {updateSettings} from './state/settings.actions';
import * as appSelectors from '../store/app.selectors';
import * as settingsSelectors from '../settings-panel/state/settings.selectors';
import {Settings} from '../settings-panel/state/settings.reducers';


interface EnabledTechs {
  [tech: string]: FormControl<boolean|null>;
}

interface Colors {
  backgroundHighlightColor: FormControl<string|null>;
  textHighlightColor: FormControl<string|null>;
}

interface SettingsForm {
  colors: FormGroup<Colors>;
  enabledTechs: FormGroup<EnabledTechs>;
  fontSize: FormControl<number|null>;
  hasVoiceRecognition: FormControl<boolean|null>;
}


@Component({
  selector: 'settings-panel',
  templateUrl: './settings-panel.component.html',
  styleUrls: ['./settings-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsPanelComponent implements AfterViewInit {
  toggleText = false;
  toggleBackground = false;
  readonly techs = Object.values(Tech);
  readonly techs$: Observable<string[]> = 
      this.store.select(appSelectors.selectTechs);
  readonly hasVoiceRecognition$: Observable<boolean> = 
      this.store.select(settingsSelectors.selectHasVoiceRecognition);
  readonly highlightColors$: Observable<Partial<Settings>> = 
      this.store.select(settingsSelectors.selectHighlightColors);
  readonly fontSize$: Observable<number> =
      this.store.select(settingsSelectors.selectFontSize);
  private readonly settings: Settings = 
      JSON.parse(localStorage.getItem('settings') ?? '');
  private enabledTechs: string[] = this.settings?.enabledTechs ?? [];
  
  readonly fontSize = new FormControl<number>(DEFAULT_FONT_SIZE_PX);
  readonly hasVoiceRecognition = new FormControl<boolean>(false);

  readonly colorsForm = new FormGroup<Colors>({
    backgroundHighlightColor: new FormControl<string>(''),
    textHighlightColor: new FormControl<string>(''),
  });

  readonly settingsForm$ = combineLatest([
    this.techs$,
    this.hasVoiceRecognition$,
    this.highlightColors$,
    this.fontSize$,
  ]).pipe(
    map(([techs, hasVoiceRecognition, highlightColors, fontSize]) => {
      const enabledTechs = new FormGroup<EnabledTechs>({});
      techs.forEach(tech => {
        const toggleControl = this.createToggleControl(this.enabledTechs, tech);
        enabledTechs.setControl(tech, toggleControl);
      });

      this.fontSize.setValue(fontSize);
      this.hasVoiceRecognition.setValue(hasVoiceRecognition);

      this.colorsForm.setValue({
        backgroundHighlightColor: highlightColors.backgroundHighlightColor ?? '',
        textHighlightColor: highlightColors.textHighlightColor ?? '',
      });
      
      return new FormGroup({
        enabledTechs,
        hasVoiceRecognition: this.hasVoiceRecognition,
        colors: this.colorsForm,
        fontSize: this.fontSize,
      });
    }),
  );

  constructor(
    private readonly elementRef: ElementRef,
    private readonly rightSidePanelService: RightSidePanelService,
    private readonly store: Store,
  ) {}

  async ngAfterViewInit() {
    const settings = await getUserSettings();
    this.enabledTechs = settings?.enabledTechs ?? this.enabledTechs;
    
    this.highlightColors$.subscribe(highlightColors => {
      highlight(this.elementRef, '.highlight-example', highlightColors);
    });

    this.colorsForm.valueChanges.pipe(debounceTime(500)).subscribe(highlightColors => {
      highlight(this.elementRef, '.highlight-example', highlightColors as Settings);
    });
  }

  changeTextHighlightColor(color: string): void {
    this.colorsForm.setValue({
      backgroundHighlightColor: this.colorsForm.value.backgroundHighlightColor ?? '',
      textHighlightColor: color,
    });
  }

  changeBackgroundHighlightColor(color: string): void {
    this.colorsForm.setValue({
      backgroundHighlightColor: color,
      textHighlightColor: this.colorsForm.value.textHighlightColor ?? '',
    });
  }

  close(form: FormGroup<SettingsForm>, fontSize: number, initialHasVoiceRecognition: boolean, highlightColors: Partial<Settings>): void {
    this.rightSidePanelService.close();
    this.setToggleControls(form.controls.enabledTechs);
    this.fontSize.setValue(fontSize);
    this.hasVoiceRecognition.setValue(initialHasVoiceRecognition);

    this.colorsForm.setValue({
      backgroundHighlightColor: highlightColors.backgroundHighlightColor ?? '',
      textHighlightColor: highlightColors.textHighlightColor ?? '',
    });
  }

  saveSettings(form: FormGroup<SettingsForm>): void {
    const enabledTechs = Object.entries(form.value.enabledTechs!)
      .filter(entry => entry[1])
      .map(entry => entry[0]);

    this.enabledTechs = enabledTechs;
    const settings: Settings = {
      enabledTechs,
      hasVoiceRecognition: !!form.value.hasVoiceRecognition,
      textHighlightColor: form.value.colors?.textHighlightColor ?? '',
      backgroundHighlightColor: form.value.colors?.backgroundHighlightColor ?? '',
      fontSize: form.value.fontSize ?? DEFAULT_FONT_SIZE_PX,
    };
    form.reset();
    this.store.dispatch(updateSettings(settings));
  }

  private createToggleControl(enabledTechs: string[], tech: string): FormControl<boolean|null> {
    const isChecked = enabledTechs.includes(tech);
    return new FormControl<boolean>(isChecked);
  }

  private setToggleControls(form: FormGroup<EnabledTechs>): void {
    this.techs.forEach(tech => {
      form.setControl(tech, this.createToggleControl(this.enabledTechs, tech));
    });
  }
}
