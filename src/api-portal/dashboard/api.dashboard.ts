import { Component } from '@angular/core';
import { ModalPopupService } from '../../shared/model-popup.service';
import { APIPortalModule } from '../index';
import { APICreateDocComponent } from './popup-components/create-doc.component';

@Component({
    templateUrl: './api.dashboard.html',
    styleUrls: ['./api.dashboard.scss']
})
export class APIDashboardComponent {
    private modalRef : any = null;
    constructor(private modalPopupService: ModalPopupService){}

    addDocument(){
        if(this.modalRef){
            this.modalRef.destroy();
        }
        let modal$ = this.modalPopupService.create(APIPortalModule, APICreateDocComponent, {
            ok: (snacks) => {
                alert('hi');
            }
        });
        modal$.subscribe((ref) => {
            this.modalRef = ref;
        })
    }
}
