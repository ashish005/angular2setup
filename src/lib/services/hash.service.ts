'use strict';
import { Injectable } from '@angular/core';
import { PlatformLocation } from '@angular/common';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class Hash {
  hashPathId = "#/docViewer";
  public value = new BehaviorSubject<string | null>(null);
  private noEmit:boolean = false;
  constructor(private location: PlatformLocation) {
    this.bind();
  }

  getActualHash(hashItem:string){
    let changedHash = "";
    if(hashItem) {
      let item = hashItem.split(this.hashPathId);
      changedHash =  item[(item.length===1)?0:1];
    }
    if(changedHash[0]==='/'){
      changedHash = changedHash.substring(1);
    }
    return changedHash;
  }

  start() {
    this.value.next(this.hash);
  }

  get hash() {
    return this.getActualHash(this.location.hash);
    //return this.location.hash;
  }

  bind() {
    this.location.onHashChange(() => {
      if (this.noEmit) return;
      this.value.next(this.hash);
    });
  }

  update(hash: string|null) {
    if (hash == undefined) return;
    this.noEmit = true;
    window.location.hash = this.hashPathId+"/"+ this.getActualHash(hash);
    setTimeout(() => {
      this.noEmit = false;
    });
  }
}
