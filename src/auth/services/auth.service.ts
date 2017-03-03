import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthConfig } from '../auth.config';
import Auth0Lock from 'auth0-lock';
import * as Auth0 from 'auth0-js';
import { IdentityService } from './auth.identity.service';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class AuthService {
    redirectUrl : string = window.location.origin + window.location.pathname + window.location.hash;
    options = {};
    lock = this.createLock();

    constructor(private router: Router, private authConfig:AuthConfig, private identityService: IdentityService) {}

    authorize(hash) {
        let auth0 = new Auth0({
            domain: this.authConfig.AUTH0_OPTIONS.domain,
            clientID: this.authConfig.AUTH0_OPTIONS.clientId,
            callbackURL: window.location.href
        });
        let result: any = auth0.parseHash(hash);
        if (result && result.idToken) {
            this.identityService.update(result);
        }
    }

    login(option: any) {
        this.options = option;
        this.lock = this.createLock();
        // Capture the user credentials when the user has succesfully logged in
        this.lock.on('authenticated', (authResult: any) => {
            this.lock.getProfile(authResult.idToken, (error: any, profile: any) => {
                if (error) {
                    console.log(error);
                }
                this.router.navigateByUrl('/home');
            });
            this.lock.hide();
        });
        this.lock.show();
    };

    signUp(option: any) {
        this.options = option;
        this.lock = this.createLock();
        this.lock.show();
    }

    createLock() {
        return new Auth0Lock(this.authConfig.AUTH0_OPTIONS.clientId, this.authConfig.AUTH0_OPTIONS.domain, this.options);
    }

    authenticated() {
        return tokenNotExpired();
    };

    activateUser(input){
        /*return this._http.patch(`/user/activate`,JSON.stringify(input))
            .map((response: Response) => response.json());*/
    }

    logout() {
        this.identityService.update(null);
        this.router.navigate(['/login']);
    };
}