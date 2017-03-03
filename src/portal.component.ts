import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'portal',
  template: `<router-outlet></router-outlet>`
})

export class PortalComponent implements OnInit{
  constructor() {}

  ngOnInit() {
  }
}
