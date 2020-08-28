import { NgModule, ModuleWithProviders,LOCALE_ID } from "@angular/core";
import { CommonModule,registerLocaleData } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { InputComponent } from './input/input.component'
import { RadioComponent } from './radio/radio.component'


import { SnackbarComponent } from './messages/snackbar/snackbar.component'

import {HTTP_INTERCEPTORS} from '@angular/common/http'
import {MatTreeModule} from '@angular/material/tree';
import { NotificationService } from './messages/notification.service'
import { LoginService } from '../security/login/login.service'
import {LoggedInGuard }from '../security/loggedin.guard'
import {AuthInterceptor }from '../security/auth.interceptor'
import {AuthRefreshtokenInterceptor }from '../security/auth-refresh-token.interceptor'
// import {RefreshTokenInterceptor }from '../security/refresh-token.interceptor'

import { BrowserModule } from '@angular/platform-browser';
import {MenuService} from '../layout/menu/menu.service'

// pipes
import { EncryptPipe } from '../pipes/encrypt.pipe';

import { Helper } from '../helper';
import { Calculos } from './calculoMaquininhas/calculos';


import { ImagemTipoarquivoPipe } from '../pipes/imagem-tipoarquivo.pipe';
import { SafeHtml } from '../pipes/safe-html.pipe';
import { BooleanMessagePipe } from '../pipes/boolean-message.pipe';
import { HelpersPipe } from '../pipes/helpers.pipe';
import { CepPipe } from '../pipes/cep.pipe';
import { MesTostringPipe } from '../pipes/mes-tostring.pipe';
import { TruncateTextPipe } from '../pipes/truncate-text.pipe';
import { VerificarVencimentoPipe } from '../pipes/verificar-vencimento.pipe';

import { NgSelectModule } from '@ng-select/ng-select';

import { NgxMaskModule, IConfig } from "ngx-mask";


import {MatNativeDateModule,MAT_DATE_LOCALE} from '@angular/material/core'
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatCardModule} from '@angular/material/card';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import ptBr from '@angular/common/locales/pt';




import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatButtonModule} from '@angular/material/button';
import {MatStepperModule} from '@angular/material/stepper';
registerLocaleData(ptBr)

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
    suppressScrollX: true
  };



@NgModule({
    declarations: [
        BooleanMessagePipe,
        SafeHtml,
        ImagemTipoarquivoPipe,
        InputComponent,
        RadioComponent,
        SnackbarComponent,
        EncryptPipe,
        HelpersPipe,
        TruncateTextPipe,
        VerificarVencimentoPipe,
        CepPipe,
        MesTostringPipe
    ],

    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatDatepickerModule,
        NgSelectModule,
        MatNativeDateModule,
        MatTooltipModule,
        MatCardModule,
        PerfectScrollbarModule,
        MatTreeModule,
        MatBottomSheetModule,
		MatButtonModule,
		NgxMaskModule.forRoot(),
        MatStepperModule,
    ],
    exports: [
        BooleanMessagePipe,
        SafeHtml,
        ImagemTipoarquivoPipe,
        InputComponent,
        RadioComponent,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SnackbarComponent,
        EncryptPipe,
        HelpersPipe,
        TruncateTextPipe,
        VerificarVencimentoPipe,
        CepPipe,
        MesTostringPipe,
        MatDatepickerModule,
        NgSelectModule,
        MatNativeDateModule,
        MatTooltipModule,
        MatCardModule,
        PerfectScrollbarModule,
        MatTreeModule,
        MatBottomSheetModule,
        MatButtonModule,
		MatStepperModule,
		NgxMaskModule,
    ]
})
export class SharedModule {
    static forRoot(): ModuleWithProviders<SharedModule> {
        return {
            ngModule: SharedModule,
            providers:[
                NotificationService,
                LoginService,
                LoggedInGuard,
                MenuService,
                Helper,
                Calculos,
                { provide: LOCALE_ID, useValue: 'pt-br' }  ,
                { provide: MAT_DATE_LOCALE, useValue: 'pt-br' },
                {provide:HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi:true},
                // {provide:HTTP_INTERCEPTORS, useClass: AuthRefreshtokenInterceptor, multi:true},
                {
                    provide: PERFECT_SCROLLBAR_CONFIG,
                    useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
                  }
            ]
        }
    }
}
