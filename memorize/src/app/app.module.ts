import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/header/header.component';
import { MenuComponent } from './layout/menu/menu.component';
import { FooterComponent } from './layout/footer/footer.component';
import { LoaderComponent } from './shared/loader/loader.component';
import { CommemorationsComponent } from './shared/commemorations/commemorations.component';

import { HttpClientModule } from '@angular/common/http';
import { RouterModule, PreloadAllModules } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ROUTES } from './app.routes';

import { SharedModule } from './shared/shared.module';

import { ApplicationErrorHandler } from './app.error-handler';
import { ErrorHandler } from '@angular/core';
import { LoginComponent } from './security/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MenuComponent,
    FooterComponent,
    LoaderComponent,
    LoginComponent,
    CommemorationsComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SharedModule.forRoot(),

    // RouterModule.forRoot(ROUTES, { preloadingStrategy: PreloadAllModules })
    RouterModule.forRoot(ROUTES),
  ],
  providers: [{ provide: ErrorHandler, useClass: ApplicationErrorHandler }],
  bootstrap: [AppComponent],
})
export class AppModule {}
