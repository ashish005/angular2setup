import { Injectable } from '@angular/core';

interface AuthConfiguration {
    clientId: string;
    domain: string;
}

@Injectable()
export class AuthConfig {
    public get SERVER_URI(): string {
        if(IS_PRODUCTION){
            return SERVERURI;
        }
        return 'http://localhost:8080';
    }

    public get AUTH0_OPTIONS(): AuthConfiguration {
        if(IS_PRODUCTION){
            try {
                return JSON.parse(AUTH0OPTIONS);
            } catch (error) {
                console.log(error.message);
            }
        }else {
            return {
                clientId: 'jNn1V2ORu1rN1TzgEv1SvDldgnz18W0Y',
                domain: 'anjanikumar2109.auth0.com'
            };
        }
    }
}