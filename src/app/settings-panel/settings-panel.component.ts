import {AfterViewInit, ChangeDetectionStrategy, Component, ElementRef} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Store} from '@ngrx/store';
import {combineLatest, Observable} from 'rxjs';
import {debounceTime, map} from 'rxjs/operators';
import {Tech} from 'src/types';
import {highlight} from '../common';
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
}


@Component({
  selector: 'settings-panel',
  templateUrl: './settings-panel.component.html',
  styleUrls: ['./settings-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsPanelComponent implements AfterViewInit {
  readonly techs = Object.values(Tech);
  readonly techs$: Observable<string[]> = this.store.select(appSelectors.selectTechs);
  readonly highlightColors$: Observable<Partial<Settings>> = this.store.select(settingsSelectors.selectHighlightColors);
  private readonly settings: Settings = JSON.parse(localStorage.getItem('settings') ?? '');
  private enabledTechs: string[] = this.settings?.enabledTechs ?? [];
  
  readonly colorsForm = new FormGroup<Colors>({
    backgroundHighlightColor: new FormControl<string>(''),
    textHighlightColor: new FormControl<string>(''),
  });

  readonly settingsForm$ = combineLatest([this.techs$, this.highlightColors$]).pipe(
    map(([techs, highlightColors]) => {
      const enabledTechs = new FormGroup<EnabledTechs>({});
      techs.forEach(tech => {
        const toggleControl = this.createToggleControl(this.enabledTechs, tech);
        enabledTechs.setControl(tech, toggleControl);
      });
      this.colorsForm.setValue({
        backgroundHighlightColor: highlightColors.backgroundHighlightColor ?? '',
        textHighlightColor: highlightColors.textHighlightColor ?? '',
      });
      return new FormGroup({enabledTechs, colors: this.colorsForm});
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

  close(form: FormGroup<SettingsForm>): void {
    this.rightSidePanelService.close();
    this.setToggleControls(form.controls.enabledTechs);
  }

  saveSettings(form: FormGroup<SettingsForm>): void {
    const enabledTechs = Object.entries(form.value.enabledTechs!)
      .filter(entry => entry[1])
      .map(entry => entry[0]);

    this.enabledTechs = enabledTechs;
    const settings: Settings = {
      enabledTechs,
      textHighlightColor: form.value.colors?.textHighlightColor ?? '',
      backgroundHighlightColor: form.value.colors?.backgroundHighlightColor ?? '',
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
