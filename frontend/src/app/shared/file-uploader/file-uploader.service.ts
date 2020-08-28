import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

import { API } from "../../app.api";

@Injectable({
	providedIn: "root",
})
export class FileUploaderService {
	constructor(private http: HttpClient) {}

	upload(file): Observable<any> {
		const formData = new FormData();
		formData.append("file", file);
		return this.http.post<any>(`${API}/upload`, formData);
	}
	uploadProgress(files, id): Observable<any> {
		return this.http.post<any>(`${API}/galeria/premio/${id}`, files, {
			reportProgress: true,
			observe: "events",
		});
	}
	getGalleryProperty(id): Observable<any> {
		return this.http.get<any>(`${API}/galeria/premio/${id}
		`);
	}
	wallpaperOrCapa(form, id): Observable<any> {
		return this.http.put(`${API}/galeria/capawallpaper/${id}`, form);
	}
	deleteFileGalleryProperty(id): Observable<any> {
		return this.http.delete<any>(`${API}/galeria/${id}
		`);
	}
}
