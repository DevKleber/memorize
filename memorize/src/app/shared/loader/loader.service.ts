import { Injectable, EventEmitter } from '@angular/core'
@Injectable({
    providedIn: 'root'
})
export class LoaderService {
    loader = new EventEmitter<boolean>()

    isLoad(loader: boolean) {
        this.loader.emit(loader)
    }
}