import { Component } from '@angular/core';

@Component({
  templateUrl: './contact.html',
  styleUrls: ['./contact.css']
})
export class ContactComponent {
  title: string = '2430 Camino Ramon, San Ramon, CA 94583';
  lat: number = 37.771744;
  lng: number = -121.964692;
  constructor() {}
}
