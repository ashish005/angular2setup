import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

export class User {
    name: string;
    email: string;
    organization: string;
    roles: string[];
    permissions: Object;
    isAdmin: boolean;

    accessToken: string;
    idToken: string;
    idTokenPayload: any;

    constructor(idToken?: string) {
        this.idToken = idToken;
    }

    get isAuthenticated(): boolean {
        return !!this.idToken;
    }
}

@Injectable()
export class IdentityService {
    private _user: User;
    private _dispatch: Subject<User> = new Subject<User>();

    public get user(): User {
        return this._user;
    }

    public set user(value) {
        this._user = value;
    }

    constructor() {
        this._user = new User();
    }

    public get identityDispatch(): Observable<User> {
        return this._dispatch.asObservable();
    };

    public update(identityData: User): void {
        let user = new User();
        debugger;
        if (!!identityData && !!identityData.idToken) {
            Object.assign(user, identityData);
        }
        this._user = user;
        this._dispatch.next(this._user);
    }
}