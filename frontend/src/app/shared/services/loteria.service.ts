import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { API } from "../../app.api";

@Injectable({
	providedIn: "root",
})
export class LoteriaService {
	constructor(private http: HttpClient) {}

	getNextNumberContest(): Observable<any[]> {
		return this.http.get<any[]>(`${API}/nextNumberContest`);
	}
}
