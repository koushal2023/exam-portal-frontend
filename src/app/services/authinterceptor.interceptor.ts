import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';

// const TOKEN_HEADER = 'Authorization';

@Injectable()
export class AuthinterceptorInterceptor implements HttpInterceptor {

  constructor(private loginService: LoginService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // return next.handle(request);
    // add the jwt token from localStorage to request
    let authReq = request;
    const token = this.loginService.getToken();
    console.log("inside interceptor");

    if (token != null) {
      authReq = authReq.clone({
        setHeaders: { Authorization: `Bearer ${token}` }
      });
    }
    return next.handle(authReq);
  }
}

export const authInterceptorProviders = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthinterceptorInterceptor,
    multi: true,
  }
]