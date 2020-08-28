import { ErrorHandler, Injectable, Injector, NgZone,EventEmitter } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http'
import { Observable, timer } from 'rxjs'

import { NotificationService } from './shared/messages/notification.service'
import { LoginService } from './security/login/login.service'
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Router } from '@angular/router';


@Injectable()
export class ApplicationErrorHandler extends ErrorHandler {

  constructor(private ns: NotificationService, private injector: Injector, private zone: NgZone) {
    super()
  }

  handleError(errorResponse: HttpErrorResponse | any) {

    if (errorResponse instanceof HttpErrorResponse) {
      const error = (typeof errorResponse.error !== 'object') ? JSON.parse(errorResponse.error): errorResponse.error;
      this.zone.run(() => {

        // console.log(errorResponse.status)
        // console.log(errorResponse.error)
        console.log(error.error)

        switch (errorResponse.status) {
          case 0:
              // this.ns.notifyError("token expirado");
              const loginService = this.injector.get(LoginService);
              loginService.logoutForce()
            break;
          case 400:
            if(error.error === 'token_expired' || error.error == 'Token is Expired' || error.error === 'token_invalid' || error.error === 'A token is required' || error.error === 'token_not_provider'){
              this.ns.notifyError(error.error);
              const loginService = this.injector.get(LoginService);
              loginService.logout()
              loginService.logoutForce()

            }else{
              let erro = error.response != undefined ?error.response :error.error
              this.ns.notifyError(erro);
            }
            break;
          case 401:
            if(error.error === 'token_has_been_blacklisted'){
              this.ns.notifyError("token na lista negra");
              const loginService = this.injector.get(LoginService);
              loginService.logout()
              this.goToLogin();
            }else if(error.error === 'token_invalid'){
              this.ns.notifyError("Token Inválido");
              const loginService = this.injector.get(LoginService);
              loginService.logout()
              this.goToLogin('login');

            }else{
              this.ns.notifyError(error.response);
              if(!error.permission){
                let router = this.injector.get(Router);
                if(router.url == '/pdv'){
                  setTimeout(() => { this.goToLogin(''); }, 5000);//esperando 5 segundos e fechando a janela.
                }else{
                  this.goToLogin('');
                }
                // history.go(-1);
              }
            }
            break;
          case 403:
            console.log("error 403")
            this.ns.notifyError(error || 'Não autorizado.')
            break;
          case 404:
            console.log("error 404")
            this.ns.notifyError(error || 'Recurso não encontrado. Verifique o console para mais detalhes')
            break
          case 408:
            this.ns.notifyError("tempo fim")
            break;
          case 500:
            let erro = error.message != undefined ?error.message :error.error
            console.log(error.message);
            this.ns.notifyError(" Erro interno no servidor! \n"+erro);
            break;


        }
      })

    }
    super.handleError(errorResponse)
  }
  goToLogin(path?){
    const router = this.injector.get(Router);
    router.navigate([`/${path}`]);
  }
}
