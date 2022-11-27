import {Injectable} from '@angular/core';
import {SafeResourceUrl} from '@angular/platform-browser';
import {Observable, Subject} from 'rxjs';
import {filter} from 'rxjs/operators';


@Injectable({providedIn: 'root'})
export class DataService {
  private readonly url$ = new Subject<SafeResourceUrl>();
  
  sendUrl(url: SafeResourceUrl): void {
    this.url$.next(url);
  }

  getUrl(): Observable<SafeResourceUrl> {
    return this.url$.pipe(filter(url => !!url));
  }
}
