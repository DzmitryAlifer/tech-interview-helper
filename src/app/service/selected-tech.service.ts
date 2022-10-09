import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Tech } from 'src/types';
import { map } from 'rxjs';

@Injectable({providedIn: 'root'})
export class SelectedTechService {

  private readonly selectedTechsMap$ = 
      new BehaviorSubject<Map<Tech, boolean>>(this.populateInintialTechStates());

  toggleTech(tech: Tech): void {
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
    return Object.keys(Tech).reduce((map, tech) => {
      map.set(tech as Tech, false);
      return map;
    }, new Map<Tech, boolean>());
  }
}
