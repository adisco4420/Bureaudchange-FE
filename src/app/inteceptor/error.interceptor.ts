import { GeneralService } from 'src/app/shared/general.service';
import { AuthService } from 'src/app/auth/auth.service';
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(
        private authSrv: AuthService,
        private gs: GeneralService,
        private router: Router) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if (this.isLogin(request)) {
                return throwError(err);
            }
            switch (err.status) {
                case 401:
                    this.authSrv.logout();
                    this.router.navigate(['/auth/login']);
                    break;
                case 400:
                    return throwError(this.gs.getError(err));
                case 412:
                    return throwError(this.gs.getError(err));
                default:
                    return throwError(this.gs.getError(err));
            }
            const error = this.gs.getError(err);
            return throwError(error);
        }));
    }

    isLogin(request: HttpRequest<any>): any {
        return request.url.search('/auth/login') !== -1;
    }

    getValidationError(errors): string {
        let errorString = '';
        if (errors.status) {
            for (const key in errors) {
                if (errors.hasOwnProperty(key)) {
                    if (key !== 'status') {
                        errorString += errors.status;
                    }
                }
            }
        } else if (errors.errorMessage) {
            errorString +=  errors.errorMessage;
        } else {
            errors.forEach(element => {
                if (element.constraints) {
                    errorString +=  Object.values(element.constraints) + '\n';
                } else {
                    if (typeof(element) === 'string') {
                        errorString += element + '\n';
                    } else {
                        errorString += element.message + '\n';
                    }
                }
            });
        }
        return errorString;
    }
}
