import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { HttpClient } from '@angular/common/http'
import { Router} from '@angular/router'

import { API } from '../../app.api'

@Injectable({
  providedIn: 'root'
})

export class LogradouroService {

  constructor(
    private http: HttpClient
  ) { }

  getTpEndereco(): Observable<any[]> {
    return this.http.get<any[]>(`${API}/tpendereco`)
  }
  getEstados(): Observable<any[]> {
    return this.http.get<any[]>(`${API}/dne/estados`)
  }
  getLocalidades(uf): Observable<any[]> {
    return this.http.get<any[]>(`${API}/dne/localidade/${uf}`)
  }
  getLocalidade(id): Observable<any[]> {
    return this.http.get<any[]>(`${API}/dne/localidadebyid/${id}`)
  }
  findLocalidade(data): Observable<any[]> {
    return this.http.post<any>(`${API}/dne/findlocalidade`,data)
  }
  getBairros(localidade): Observable<any[]> {
    return this.http.get<any[]>(`${API}/dne/bairros/${localidade}`)
  }
  getCep(cep): Observable<any[]> {
    return this.http.get<any[]>(`${API}/dne/findcep/${cep.replace(/\D/g, '')}`)
  }

}
