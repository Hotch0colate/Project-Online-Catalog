import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
// import { environment } from '../../environments/environment';
// import { AuthService } from 'src/app/services/auth/auth.service'


@Injectable()
export class SendInterceptor implements HttpInterceptor {

  constructor(
    private authenticationService: AuthService
  ) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // this.shiftDates(request.body);
    // add auth header with jwt if user is logged in and request is to the api url
    let token = this.authenticationService.tokenValue
    if (token != '' && token != null) {
      // const accessToken = dataPermission.token;
      request = request.clone({
        setHeaders: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+token!
        }
      });
      return next.handle(request);
    }
    return next.handle(request);
  }
}
