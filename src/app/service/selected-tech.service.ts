import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Tech } from 'src/types';
import { map } from 'rxjs';

const INITIAL_KNOWLEDGE_BASE_TECH = Tech.CSS;
const ENABLED_TECHS_BY_DEFAULT: string[] = [Tech.CSS];


@Injectable({providedIn: 'root'})
export class SelectedTechService {

  private readonly knowledgeBaseTech$ = new BehaviorSubject<Tech>(INITIAL_KNOWLEDGE_BASE_TECH);
  private readonly selectedTechsMap$ = 
      new BehaviorSubject<Map<Tech, boolean>>(this.populateInintialTechStates());

  setKnowledgeBaseTech(tech: Tech): void {
    this.knowledgeBaseTech$.next(tech);
  }

  getKnowledgeBaseTech(): Observable<Tech> {
    return this.knowledgeBaseTech$.asObservable();
  }

  toggleTechRecognition(tech: Tech): void {
    const previousStateMap = this.selectedTechsMap$.getValue();
    previousStateMap.set(tech, !previousStateMap.get(tech));
    this.selectedTechsMap$.next(previousStateMap);
  }

  getSelectedTechsMap(): Observable<Map<Tech, boolean>> {
    return this.selectedTechsMap$.asObservable();
  }

  getSelectedTechs(): Observable<Tech[]> {
    return this.getSelectedTechsMap().pipe(
      map(selectedTechsMap => Array.from(selectedTechsMap.entries())
          .filter(([, isSelected]) => isSelected)
          .map(([tech]) => tech)),
    );
  }

  private populateInintialTechStates(): Map<Tech, boolean> {
    return Object.values(Tech).reduce((map, tech) => {
      const isEnabled = ENABLED_TECHS_BY_DEFAULT.includes(tech);
      map.set(tech as Tech, isEnabled);
      return map;
    }, new Map<Tech, boolean>());
  }
}
