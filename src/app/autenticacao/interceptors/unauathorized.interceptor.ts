import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class UnauathorizedInterceptor implements HttpInterceptor {

  constructor(private router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<any>> {
    const cloneRequest = request.clone({
      headers: request.headers.set('X-Requested-With', 'XMLHttpRequest'),
      withCredentials: true
    })

    return next.handle(cloneRequest).pipe(tap({
      next: ()=> {},
      error: (error:any) => {
        if (error instanceof HttpErrorResponse) {
          if (error.status == 401) {
            this.router.navigateByUrl('/autenticacao')
          } else {
            return;
          }
        }
      }

    }));
  }
}
