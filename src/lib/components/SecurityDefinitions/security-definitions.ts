'use strict';
import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { SpecManager, BaseComponent } from '../base';

import { ComponentParser } from '../../services/component-parser.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

const AUTH_TYPES = {
  'oauth2': 'OAuth2',
  'apiKey': 'API Key',
  'basic': 'Basic Authorization'
}

@Component({
  selector: 'security-definitions',
  styleUrls: ['./security-definitions.css'],
  templateUrl: './security-definitions.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SecurityDefinitions extends BaseComponent implements OnInit {
  info: any = {};
  specUrl: String;
  defs: any[];
  authForm: FormGroup;
  public acceptedInfo:string;

  static insertTagIntoDescription(md:string) {
    if (ComponentParser.contains(md, 'security-definitions')) return md;
    if (/^#\s?Authentication\s*$/mi.test(md)) return md;
    return md + '\n# Authentication \n' + ComponentParser.build('security-definitions');
  }

  constructor(specMgr:SpecManager, private formBuilder: FormBuilder) {
    super(specMgr);
    this.authForm = this.formBuilder.group({
      user: ['', Validators.required],
      password: ['', Validators.required]
    });
    if(this.getStorage()){
      this.updateInfo('Credential applied!');
    }
  }

  init() {
    this.componentSchema = this.componentSchema.securityDefinitions;
    this.defs = Object.keys(this.componentSchema).map(name => {
      let details = this.componentSchema[name];
      details._displayType = AUTH_TYPES[details.type];
      return {
        name,
        details
      }
    });

  }

  ngOnInit() {
    this.preinit();
  }

  updateInfo(info:string){
    this.acceptedInfo = info;
  }

  submitForm(value: any):void{
    this.updateInfo('Credential applied!');
    this.setStorage(btoa(value.user + ':' + value.password));
    this.resetForm();
  }
  getStorage(){
    return window.localStorage.getItem('auth');
  }
  setStorage(item:string){
    window.localStorage.setItem('auth', item);
  }
  clearCache(){
    window.localStorage.clear();
    this.updateInfo('');
    this.resetForm();
  }
  resetForm(){
    this.authForm.reset();
  }
}
