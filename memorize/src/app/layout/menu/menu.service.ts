import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Router, NavigationEnd } from '@angular/router'
import { Observable } from 'rxjs'
import { tap, filter } from 'rxjs/operators'
import { API } from '../../app.api'
import { LoginService } from '../../security/login/login.service'


@Injectable()
export class MenuService {
    lastUrl: string
    constructor(private http: HttpClient, private router: Router, private loginService: LoginService) {
    }
    
    getMenu(): Observable<any[]> {
        return this.http.get<any[]>(`${API}/menu`)
    }

}