'use strict';
import { Component, Input, ChangeDetectionStrategy, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { BaseComponent, SpecManager } from '../base';
import { SchemaHelper, AppStateService, OptionsService, CommunicatorService } from '../../services/index';
import { JsonPointer, statusCodeType } from '../../utils/index';

function safePush(obj, prop, item) {
    if (!obj[prop]) obj[prop] = [];
    obj[prop].push(item);
}
function isNumeric(n) {
    return (!isNaN(parseFloat(n)) && isFinite(n));
}

@Component({
    selector: 'try-operation',
    templateUrl: './try-operation.html',
    styleUrls: ['./try-operation.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class TryOperation extends BaseComponent implements OnInit, OnDestroy {
    @Input() pointer:string;

    params: Array<any>;
    empty: boolean;
    bodyParam: any;
    
    responses: Array<any>;
    options: any;
    serviceResp:any;

    constructor(specMgr:SpecManager,
                optionsMgr:OptionsService,
                app: AppStateService,
                private cdr: ChangeDetectorRef,
                private cs:CommunicatorService) {
        super(specMgr);
        this.options = optionsMgr.options;
    }

    init() {
        this.params = [];
        let paramsList = this.specMgr.getMethodParams(this.pointer);

        paramsList = paramsList.map(paramSchema => {
            let propPointer = paramSchema._pointer;
            if (paramSchema.in === 'body') return paramSchema;
            return SchemaHelper.preprocess(paramSchema, propPointer, this.pointer);
        });

        let paramsMap = this.orderParams(paramsList);

        if (paramsMap.body && paramsMap.body.length) {
            let bodyParam = paramsMap.body[0];
            this.bodyParam = bodyParam;
            paramsMap.body = undefined;
        }

        this.empty = !(Object.keys(paramsMap).length || this.bodyParam);

        let paramsPlaces = ['path', 'query', 'formData', 'header', 'body'];
        let placeHint = {
            path: `Used together with Path Templating, where the parameter value is actually part
        of the operation's URL. This does not include the host or base path of the API.
        For example, in /items/{itemId}, the path parameter is itemId`,
            query: `Parameters that are appended to the URL.
        For example, in /items?id=###, the query parameter is id`,
            formData: `Parameters that are submitted through a form.
        application/x-www-form-urlencoded, multipart/form-data or both are usually
        used as the content type of the request`,
            header: 'Custom headers that are expected as part of the request'
        };
        let params = [];
        paramsPlaces.forEach(place => {
            if (paramsMap[place] && paramsMap[place].length) {
                params.push({place: place, placeHint: placeHint[place], params: paramsMap[place]});
            }
        });
        this.params = params;
    }

    orderParams(params):any {
        let res = {};
        params.forEach((param) => safePush(res, param.in, param));
        return res;
    }

    ngOnInit() {
        this.preinit();
        this.cs.getError().subscribe((errorData:any) => {
            this.serviceResp = {};
            if(!errorData) return;
            let respErr = errorData._body;
            this.serviceResp = JSON.parse(respErr);
            this.cdr.markForCheck();
            //this.cdr.detectChanges();
        });

        this.cs.getAPIResponse().subscribe((resp:any) => {
            this.serviceResp = resp;
            this.cdr.markForCheck();
        });
    };

    ngOnDestroy(){
        //this.cdr = null;
    }

    trackByCode(_, el) {
        return el.code;
    }
}
