import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse, HttpClient, HttpEvent } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError, flatMap } from "rxjs/operators";
import { Injectable, Injector } from "@angular/core";
import { LoginService } from "../security/login/login.service";
import { API } from '../app.api';

@Injectable()
export class RefreshTokenInterceptor implements HttpInterceptor {

    constructor(private injector: Injector) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        return next.handle(request)
            .pipe(
                catchError((errorResponse: HttpErrorResponse) => {
                    const error = (typeof errorResponse.error !== 'object') ? JSON.parse(errorResponse.error) : errorResponse.error;
                    // console.log("Status: "+errorResponse.status);
                    // console.log(error.error);
                    if (errorResponse.status === 401 && error.error === 'token_expired' || errorResponse.status === 0) {
                        const http = this.injector.get(HttpClient);

                        // return http.post<any>(`${API}/auth/refresh`, {})
                        //     .pipe(
                        //         flatMap(data => {
                        //             localStorage.setItem("token", data.token)
                        //             const authRequest = request.clone({ setHeaders: { 'Authorization': `Bearer ${data.token}` } })
                        //             return next.handle(authRequest)
                        //         })
                        //     )
                    }
                    return throwError(errorResponse);
                })
            )
    }
}