import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { GeneralService } from '../shared/general.service';


@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    // signin = '/signin';
    constructor(private authSrv: AuthService, private gs: GeneralService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        const currentUser = this.authSrv.isUserLoggedIn();
        if (currentUser && !request.url.includes('/user/confirm-email')) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${this.gs.getToken}`
                }
            });
        }
        return next.handle(request);
    }
}
