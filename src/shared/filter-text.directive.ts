import { Component, EventEmitter, Output, Input, OnInit } from '@angular/core';

@Component({
    selector: 'filter-text',
    template: `<form><input id="filterText" type="text" class="form-control" [placeholder]="placeholder" [(ngModel)]="filter" (keyup)="filterChanged($event)" name="filterText"></form>`
})

export class FilterTextComponent implements OnInit {
    @Input() placeholder: string;
    @Output() changed: EventEmitter<string>;
    filter: string;
    constructor() {
        this.changed = new EventEmitter<string>();
    }
    clear() {
        this.filter = '';
    }
    filterChanged(event: any) {
        event.preventDefault();
        this.changed.emit(this.filter);
    }
    ngOnInit() {
        this.placeholder = this.placeholder ? this.placeholder : 'Search';
    }
}