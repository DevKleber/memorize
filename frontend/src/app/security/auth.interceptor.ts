import {
	HttpInterceptor,
	HttpRequest,
	HttpHandler,
	HttpEvent,
	// HttpResponse,
	// HttpErrorResponse
} from "@angular/common/http";
import {
	Observable,
	// throwError
} from "rxjs";
// import { map, catchError } from 'rxjs/operators';
import { Injectable, Injector } from "@angular/core";
import { LoginService } from "../security/login/login.service";
import { LoaderService } from "../shared/loader/loader.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
	constructor(private injector: Injector) {}

	intercept(
		request: HttpRequest<any>,
		next: HttpHandler
	): Observable<HttpEvent<any>> {
		const loginService = this.injector.get(LoginService);
		const loaderService = this.injector.get(LoaderService);
		// loaderService.isLoad(true)
		// console.log(request.method)
		if (loginService.isLoggedIn()) {
			//
			const authRequest = request.clone({
				setHeaders: {
					Authorization: `Bearer ${localStorage.getItem(
						"dG9rZW5fbWVtb3JpemU="
					)}`,
				},
			});
			// console.log("entrou no logado")
			return next.handle(authRequest);
			// .pipe(
			//     map((event: HttpEvent<any>) => {
			//         if (event instanceof HttpResponse) {
			//             // console.log('event', event);
			//             loaderService.isLoad(false)
			//         }
			//         return event;
			//     }),
			//     catchError((error: HttpErrorResponse) => {
			//         let data = {};
			//         console.log(data);
			//         return throwError(error);
			//     }));
		} else {
			// console.log("entrou no  não logado")
			loaderService.isLoad(false);
			return next.handle(request);
			// .pipe(
			//     map((event: HttpEvent<any>) => {
			//         if (event instanceof HttpResponse) {
			//             // console.log('event', event);
			//             loaderService.isLoad(false)
			//         }
			//         return event;
			//     }),
			//     catchError((error: HttpErrorResponse) => {
			//         let data = {};
			//         console.log(data);
			//         return throwError(error);
			//     }));
		}
	}
}
