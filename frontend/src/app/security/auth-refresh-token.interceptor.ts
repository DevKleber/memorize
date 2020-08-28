import {
	HttpInterceptor,
	HttpRequest,
	HttpHandler,
	HttpErrorResponse,
	HttpClient,
	HttpEvent,
} from "@angular/common/http";
import { catchError, flatMap } from "rxjs/operators";
import { Injectable, Injector } from "@angular/core";
import { LoginService } from "../security/login/login.service";
import { NotificationService } from "../shared/messages/notification.service";
import { Observable, throwError } from "rxjs";
import { API } from "../app.api";

@Injectable()
export class AuthRefreshtokenInterceptor implements HttpInterceptor {
	constructor(
		private injector: Injector,
		private notificationService: NotificationService
	) {}
	// const loginService = this.injector.get(LoginService);
	intercept(
		request: HttpRequest<any>,
		next: HttpHandler
	): Observable<HttpEvent<any>> {
		return next.handle(request).pipe(
			catchError((errorResponse: HttpErrorResponse) => {
				// console.log("errorResponse: ");
				// console.log(errorResponse.status);
				// return next.handle(request)
				const error =
					typeof errorResponse.error !== "object"
						? JSON.parse(errorResponse.error)
						: errorResponse.error;

				if (
					(errorResponse.status === 401 &&
						error.error === "token_expired") ||
					errorResponse.status === 0
				) {
					// alert("token expirado");
					const http = this.injector.get(HttpClient);
					// return http.post<any>(`${API}/auth/refresh`, {})
					//     .pipe(
					//         flatMap(data => {
					//             localStorage.setItem("dG9rZW5fbWVtb3JpemU=", data.token)
					//             const authRequest = request.clone({ setHeaders: { 'Authorization': `Bearer ${data.dG9rZW5fbWVtb3JpemU=}` } })
					//             return next.handle(authRequest)
					//         })
					//     )
				}
				// console.log("token status"+errorResponse.status);
				if (
					errorResponse.status === 400 &&
					(error.error === "token_expired" ||
						error.error === "token_invalid" ||
						error.error === "A token is required" ||
						error.error === "token_not_provider")
				) {
					const loginService = this.injector.get(LoginService);
					loginService.bloquearMenu();
				}
				return throwError(errorResponse);
			})
		);
	}
}
