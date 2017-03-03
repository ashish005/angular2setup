import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
    templateUrl: './login.html',
    styleUrls: ['./login.css']
})
export class LoginComponent implements OnInit {
    options:any = {};
    constructor(private authService: AuthService, private route: ActivatedRoute) {
        this.options = {
            closable: false,
            container: 'login-view',
            initialScreen: 'login',
            theme: {
                logo: '../assets/images/logo/wize-logo.png',
                labeledSubmitButton: false
            },
            socialButtonStyle: 'small',
            languageDictionary: {
                title: 'Wizni, Inc'
            },
            auth: {
                redirectUrl: '',
                responseType: 'token',
                params: {
                    state: JSON.stringify({pathname: '/login'}),
                    scope: 'openid name email companyName user_metadata app_metadata'
                }
            },
            additionalSignUpFields: [
                {
                    name: 'name',
                    placeholder: 'Full Name',
                    validator: function (name) {
                        return {
                            valid: name.length >= 5,
                            hint: 'Must have 5 or more chars' // optional
                        };
                    }
                },
                {
                    name: 'companyName',
                    placeholder: 'Company Name*',
                    validator: function (companyName) {
                        return {
                            valid: companyName.length >= 5,
                            hint: 'Must have 5 or more chars' // optional
                        };
                    }
                },
                {
                    name: 'phoneNumber',
                    placeholder: 'Phone Number (Optional)',
                    validator: function (phoneNumber) {
                        let phone = phoneNumber.trim();
                        return {
                            valid: (phone && phone.length > 0) ? phone.match(/\d/g).length === 10 : true
                        };
                    }
                }
            ]
        };
    }

    ngOnInit() {
        this.options.auth.redirectUrl = window.location.origin + window.location.pathname + window.location.hash;
        this.authService.login(this.options);
    }
}
