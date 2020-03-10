import {Injectable} from '@angular/core';
import {HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';

import { environment } from '../../../environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const token = sessionStorage.getItem(environment.AUTHENTICATION_TOKEN_KEY);
        const newReq = req.clone({
            headers: req.headers.set('Authorization', `Bearer ${token}`),
        });
        return next.handle(newReq);
    }
}
