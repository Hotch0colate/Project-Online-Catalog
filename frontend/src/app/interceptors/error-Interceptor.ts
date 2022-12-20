import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private router: Router
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {  
                  
            if (!(event.status == 200)){
              throw event.body;
            }
        }
        return event;
    }),
      catchError((err) => {
        // let token = ''
        
        // if (token && (err.status == 401 || err.code == 401)) {
        //   this.router.navigate(['accounts/login']);
        // }
        if (err.error || err.massage) {
          const error = err.error.message || err.message;
          return throwError(error);
        }
        const error = err.message;
        return throwError(error);
      }))
  }
}
