import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Tech } from 'src/types';
import { map } from 'rxjs';

const INITIAL_KNOWLEDGE_BASE_TECH = 'Angular';
const ENABLED_TECHS_BY_DEFAULT: string[] = ['Angular'];


@Injectable({providedIn: 'root'})
export class SelectedTechService {

  private readonly knowledgeBaseTech$ = new BehaviorSubject<string>(INITIAL_KNOWLEDGE_BASE_TECH);
  private readonly selectedTechsMap$ = 
      new BehaviorSubject<Map<string, boolean>>(this.populateInintialTechStates());

  setKnowledgeBaseTech(tech: Tech): void {
    this.knowledgeBaseTech$.next(tech);
  }

  getKnowledgeBaseTech(): Observable<string> {
    return this.knowledgeBaseTech$.asObservable();
  }

  toggleTechRecognition(tech: string): void {
    const previousStateMap = this.selectedTechsMap$.getValue();
    previousStateMap.set(tech, !previousStateMap.get(tech));
    this.selectedTechsMap$.next(previousStateMap);
  }

  getSelectedTechsMap(): Observable<Map<string, boolean>> {
    return this.selectedTechsMap$.asObservable();
  }

  getSelectedTechs(): Observable<string[]> {
    return this.getSelectedTechsMap().pipe(
      map(selectedTechsMap => Array.from(selectedTechsMap.entries())
          .filter(([, isSelected]) => isSelected)
          .map(([tech]) => tech)),
    );
  }

  private populateInintialTechStates(): Map<string, boolean> {
    return Object.values(Tech).reduce((map, tech) => {
      const isEnabled = ENABLED_TECHS_BY_DEFAULT.includes(tech);
      map.set(tech, isEnabled);
      return map;
    }, new Map<string, boolean>());
  }
}
