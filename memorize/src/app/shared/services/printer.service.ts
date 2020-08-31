import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { HttpClient } from '@angular/common/http'
import { API, SERVER_ND } from '../../app.api'


@Injectable({
    providedIn: 'root'
})

export class PrinterService {
    server_nd = ''
    constructor( private http: HttpClient ) { }

    getProfissoes(): Observable<any[]> {
        return this.http.get<any[]>(`${API}/profissao`)
    }
    
    checkIsOn() {
        return this.http.get<any>(`${SERVER_ND}`)
    }
    print(post){
        return this.http.post<any>(`${SERVER_ND}/getPDf`,post);
    }
    printComprovantePagamento(post){
        return this.http.post<any>(`${SERVER_ND}/imprimirComprovantePagamento`,post);
    }

}
