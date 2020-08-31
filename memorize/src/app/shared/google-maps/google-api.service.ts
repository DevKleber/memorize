import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { HttpClient } from '@angular/common/http'
import { API } from '../../app.api'


@Injectable({
    providedIn: 'root'
})

export class GoogleApiService {
    key:string = 'AIzaSyCoR3VCFGP4jbsbkaQKylAh7V0YSq-nTZk';
    distancematrix:string = `https://maps.googleapis.com/maps/api/distancematrix/json?units=metric`;
    geocode:string = `https://maps.googleapis.com/maps/api/geocode/json`;

    constructor(
        private http: HttpClient
    ) { }

    getGistancematrix(origin,destinations): Observable<any[]> {
        return this.http.get<any[]>(`${this.distancematrix}&origins=${origin}&destinations=${destinations}&key=${this.key}`)
    }
    getGeocode(logradouro,numero,cidade,estado,pais="BR"): Observable<any[]> {
        let address = `${logradouro},${numero},${cidade},${estado},${pais}`;
        console.log(address);
        
        return this.http.get<any[]>(`${API}/google/geocode/${address}`)
    }
    
}
