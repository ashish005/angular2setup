import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';

@Injectable()
export class LocalStorage {
    storageBackend: any;

    getItem(key) {
        if (this.storageBackend) {
            return Observable.create((observer) => {
                observer.next(this.storageBackend.getItem(key));
                observer.complete();
            });
        } else {
            console.log('Storage not initialized');
            return Observable.empty();
        }
    }

    setItem(key, value) {
        if (this.storageBackend) {
            this.storageBackend.setItem(key, value);
        } else {
            console.log('Storage not initialized');
        }
    }

    removeItem(key) {
        if (this.storageBackend) {
            this.storageBackend.removeItem(key);
        } else {
            console.log('Storage not initialized');
        }
    }

    initStorage(storageBackend: any) {
        this.storageBackend = storageBackend;
    }
}