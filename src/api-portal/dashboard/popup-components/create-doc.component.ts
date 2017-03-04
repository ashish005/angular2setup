import {Component} from "@angular/core";
import { ModalPopup } from '../../../shared/model-popup.service';

@Component({
  templateUrl: './create-doc.html'
})

@ModalPopup()
export class APICreateDocComponent {
  ok: Function; destroy: Function; closeModal: Function;

  constructor(){
   
  }

  onCancel(): void{
    this.closeModal();
    this.destroy();
  }

  onOk(): void{
    this.closeModal();
    this.destroy();
    this.ok(null);
  }
}
