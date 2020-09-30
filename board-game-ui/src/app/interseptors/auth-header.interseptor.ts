import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TokenStoreService} from '../services/stores/token-store.service';
import {tap} from 'rxjs/operators';
import {Router} from '@angular/router';

@Injectable()
export class AuthHeaderInterceptor implements HttpInterceptor {

  constructor(private router: Router){}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url.includes('signin') || req.url.includes('signup')) {
      return next.handle(req);
    }
    req = req.clone({
      setHeaders: {Authorization: TokenStoreService.accessToken }
    });

    return next.handle(req).pipe( tap(() => {},
      (err: any) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status !== 401) {
            return;
          }

          sessionStorage.setItem('accessToken', '');
          this.router.navigate(['']);
        }
      }));
  }

}
