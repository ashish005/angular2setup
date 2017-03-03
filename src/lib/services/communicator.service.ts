import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CommunicatorService {
    properties:Array<any>;
    private error: Subject<any> = new Subject<any>();
    private resp: Subject<any> = new Subject<any>();
    
    setBodyParams(data:Array<any>) {
        this.properties = data;
    }
    getBodyParams() {
        return this.properties;
    }
    setError(data: any): void {
        this.error.next(data);
    }
    getError(): Observable<any> {
        return this.error.asObservable();
    }

    setAPIResponse(data: any): void {
        this.resp.next(data);
    }
    getAPIResponse(): Observable<any> {
        return this.resp.asObservable();
    }
}
