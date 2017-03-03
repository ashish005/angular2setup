import { NgModule, OnInit, Component } from '@angular/core';
export { LoginComponent } from './login/login.component';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';
import { LoginComponent } from './login/login.component';
import { AuthConfig } from './auth.config';
import { AUTHRoutingModule } from './auth.routing';
import { IdentityService } from './services/auth.identity.service';
import { Router } from '@angular/router';


@Component({
    template: 'Validation is in progress...Please have patience!'
})
export class AuthTokenValidator {
    constructor(private router: Router,
                private authService: AuthService,
                private identityService: IdentityService){
        if (window.location.hash) {
            debugger;
            // Angular router clears location.hash on redirects
            // This is a better way to authorize the user reading auth0 hash before any redirects happen
            this.authService.authorize(window.location.hash);
            this.router.navigate(['/loan-pricing'], {replaceUrl: true});
        } else {
            debugger;
            localStorage.getItem('authLoginData')
        }
    }
}

@NgModule({
    imports: [CommonModule, AUTHRoutingModule],
    providers: [AuthService, IdentityService, AuthConfig],
    declarations: [LoginComponent, AuthTokenValidator]
})

export class AuthModule {
    constructor(){
    }
}

