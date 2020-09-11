import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { API } from '../app.api';

@Injectable({
	providedIn: 'root',
})
export class StickyService {
	lastUrl: string;
	mostrarMenu = new EventEmitter<boolean>();

	constructor(private http: HttpClient, private router: Router) {}

	getSticky(search?: string): Observable<any[]> {
		return this.http.get<any[]>(`${API}/sticky`);
	}

	save(form) {
		console.log(form);
		return this.http.post<any>(`${API}/sticky`, form);
	}
	file(form) {
		return this.http
			.post<any>(`${API}/file`, form)
			.pipe(tap((produto) => {}));
	}

	update(form, id) {
		return this.http
			.put(`${API}/premio/${id}`, form)
			.pipe(tap((user) => {}));
	}

	inativar(id: string) {
		return this.http.delete(`${API}/premio/${id}`);
	}
}
