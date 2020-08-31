import { Routes } from '@angular/router';

import { LoginComponent } from './security/login/login.component';

import { LoggedInGuard } from './security/loggedin.guard';

export const ROUTES: Routes = [
	// { path: '', component: HomeComponent ,canLoad:[LoggedInGuard]},
	{ path: 'login/:to', component: LoginComponent },
	{ path: 'login', component: LoginComponent },
	{
		path: '',
		loadChildren: () =>
			import('./sticky/sticky.module').then((m) => m.StickyModule),
	},
	{
		path: 'not-found',
		loadChildren: () =>
			import('./not-found/not-found.module').then(
				(m) => m.NotFoundModule
			),
	},

	{ path: '**', redirectTo: 'not-found', pathMatch: 'full' },
];
