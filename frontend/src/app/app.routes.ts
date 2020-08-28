import { Routes } from "@angular/router";

import { LoginComponent } from "./security/login/login.component";

import { LoggedInGuard } from "./security/loggedin.guard";

export const ROUTES: Routes = [
	// { path: '', component: HomeComponent ,canLoad:[LoggedInGuard]},
	{ path: "login/:to", component: LoginComponent },
	{ path: "login", component: LoginComponent },

	{ path: "", redirectTo: "dashboard", pathMatch: "full" },
	{
		path: "dashboard",
		loadChildren: () =>
			import("./layout/home/home.module").then((m) => m.HomeModule),
		canLoad: [LoggedInGuard],
		canActivate: [LoggedInGuard],
	},

	{
		path: "not-found",
		loadChildren: () =>
			import("./not-found/not-found.module").then(
				(m) => m.NotFoundModule
			),
		canActivate: [LoggedInGuard],
		canLoad: [LoggedInGuard],
	},

	{ path: "**", redirectTo: "not-found", pathMatch: "full" },
];
