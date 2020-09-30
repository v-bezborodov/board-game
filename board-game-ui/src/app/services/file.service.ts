import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  fileUrl = environment.apiUrl.file;

  constructor(private http: HttpClient) {
  }

  upload(file: FormData): Observable<{ path: string }> {
    return this.http.post<{ path: string }>(this.fileUrl, file);
  }

}
