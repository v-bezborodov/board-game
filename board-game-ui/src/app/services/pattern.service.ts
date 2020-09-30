import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {Pattern} from '../models/pattern.model';
import {CopyGamePattern} from '../models/copy-game-pattern.model';

@Injectable({
  providedIn: 'root'
})
export class PatternService {

  patternUrl = environment.apiUrl.pattern;

  constructor(private http: HttpClient) {
  }

  create(pattern: Pattern): Observable<Pattern> {
    return this.http.post<Pattern>(this.patternUrl.pattern, pattern);
  }

  update(pattern: Pattern): Observable<Pattern> {
    return this.http.put<Pattern>(this.patternUrl.pattern, pattern);
  }

  publish(patternId): Observable<Pattern> {
    return this.http.put<Pattern>(this.patternUrl.publish, {id: patternId});
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(this.patternUrl.pattern + `/${id}`);
  }

  getAll(): Observable<Pattern[]> {
    return this.http.get<Pattern[]>(this.patternUrl.pattern);
  }

  getPublishedAll(): Observable<Pattern[]> {
    return this.http.get<Pattern[]>(this.patternUrl.published);
  }

  copy(copyGamePattern: CopyGamePattern): Observable<Pattern> {
    return this.http.post<Pattern>(this.patternUrl.copy, copyGamePattern);
  }

}
