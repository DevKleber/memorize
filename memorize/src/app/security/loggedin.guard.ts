import {
	CanLoad,
	Route,
	CanActivate,
	ActivatedRouteSnapshot,
	RouterStateSnapshot,
} from "@angular/router";
import { Injectable } from "@angular/core";
import { LoginService } from "./login/login.service";

@Injectable()
export class LoggedInGuard implements CanLoad, CanActivate {
	hasPermission: boolean = true;

	constructor(private loginService: LoginService) {}

	checkAuthentication(path: string): boolean {
		const loggedIn = this.loginService.isLoggedIn();
		// console.log(loggedIn)
		if (!loggedIn) {
			this.loginService.handleLogin();
		}
		return loggedIn;
	}

	canLoad(route: Route) {
		// return false;
		if (!this.checkAuthentication(route.path)) {
			return false;
		}
	}
	canActivate(
		activatedRoute: ActivatedRouteSnapshot,
		routerState: RouterStateSnapshot
	): boolean {
		return this.checkAuthentication(activatedRoute.routeConfig.path);
	}
}
