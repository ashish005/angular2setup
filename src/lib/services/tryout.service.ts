import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestMethod, Request } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class TryoutService {
    constructor (
        private http: Http
    ) {}

    get(url, urlParams?, data?) {
        var requestoptions = new RequestOptions({
            method: RequestMethod.Get,
            url: url,
            search:urlParams,
            headers: this.getHeader()
        });
        return this.http.request(new Request(requestoptions)).map(response => response.json());
    }

    post(url, urlParams?, data?) {
        var requestoptions = new RequestOptions({
            method: RequestMethod.Post,
            url: url,
            headers: this.getHeader(),
            body: JSON.stringify(data)
        });

        return this.http.request(new Request(requestoptions)).map(response => response.json());
    }
    delete(url, urlParams?, data?) {
        var requestoptions = new RequestOptions({
            method: RequestMethod.Delete,
            url: url,
            search:urlParams,
            headers: this.getHeader(),
            body: JSON.stringify(data)
        });

        return this.http.request(new Request(requestoptions)).map(response => response.json());
    }
    patch(url, urlParams?, data?) {
        var requestoptions = new RequestOptions({
            method: RequestMethod.Patch,
            url: url,
            search:urlParams,
            headers: this.getHeader(),
            body: JSON.stringify(data)
        });

        return this.http.request(new Request(requestoptions)).map(response => response.json());
    }
    put(url, urlParams?, data?) {
        var requestoptions = new RequestOptions({
            method: RequestMethod.Patch,
            url: url,
            search:urlParams,
            headers: this.getHeader(),
            body: JSON.stringify(data)
        });

        return this.http.request(new Request(requestoptions)).map(response => response.json());
    }

    protected extractArray(res: Response, showprogress: boolean = true) {
        let data = res.json();
        return data || [];
    }
    getHeader(obj?) {
        let headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization':'Basic '+window.localStorage.getItem('auth')
         });
        return headers;
    }
}