'use strict';
import { Input, HostBinding, Component, OnInit, ChangeDetectionStrategy, ElementRef } from '@angular/core';
import JsonPointer from '../../utils/JsonPointer';
import { BaseComponent, SpecManager } from '../base';
import { OptionsService, SchemaHelper, MenuService, CommunicatorService } from '../../services/index';
import { TryoutService } from '../../services/tryout.service';

interface MethodInfo {
  verb: string;
  path: string;
  info: {
    tags: string[];
    description: string;
  };
  bodyParam: any;
  summary: any;
  anchor: any;
  externalDocs: {
    url: string;
    description?: string;
  },
  apiUrl:string
}

@Component({
  selector: 'method',
  templateUrl: './method.html',
  styleUrls: ['./method.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Method extends BaseComponent implements OnInit {
  @Input() pointer :string;
  @Input() parentTagId :string;
  sentActive: boolean = false;

  @HostBinding('attr.operation-id') operationId;

    method: MethodInfo;
    isEditable: boolean = false;

  constructor(
    specMgr:SpecManager,
    private optionsService: OptionsService,
    private menu: MenuService,
    private cs: CommunicatorService,
    private tryoutService: TryoutService) {
    super(specMgr);
  }

  init() {
    this.operationId = this.componentSchema.operationId;

    this.method = {
      verb: JsonPointer.baseName(this.pointer),
      path: JsonPointer.baseName(this.pointer, 2),
      info: {
        description: this.componentSchema.description,
        tags: this.filterMainTags(this.componentSchema.tags)
      },
      bodyParam: this.findBodyParam(),
      summary: SchemaHelper.methodSummary(this.componentSchema),
      anchor: this.buildAnchor(),
      externalDocs: this.componentSchema.externalDocs,
      apiUrl:this.getBaseUrl()
    };
  }

    getBaseUrl(): string {
        if (this.optionsService.options.hideHostname) {
            return this.specMgr.basePath;
        } else {
            return this.specMgr.apiUrl;
        }
    }

  buildAnchor() {
    this.menu.hashFor(this.pointer,
      { type: 'method', operationId: this.operationId, pointer: this.pointer },
      this.parentTagId );
  }

  filterMainTags(tags) {
    var tagsMap = this.specMgr.getTagsMap();
    if (!tags) return [];
    return tags.filter(tag => tagsMap[tag] && tagsMap[tag]['x-traitTag']);
  }

  findBodyParam() {
    let pathParams = this.specMgr.getMethodParams(this.pointer);
    let bodyParam = pathParams.find(param => param.in === 'body');
    return bodyParam;
  }

    ngOnInit() {
        this.preinit();
    }

    sendData(current) {
        this.cs.setError(null);
        let data = [], urlParams = [], self = this;
        let url = this.method.apiUrl + this.method.path;
        let schemaParams = this.componentSchema.parameters;
        let schemaParamsData = this.specMgr._schema.parameters;

        schemaParams.forEach(function (item, index) {
            let ref = item.$ref;
            if(ref){
                let _option = ref.split('#/parameters/')[1];
                let itemInfo = schemaParamsData[_option];
                if (itemInfo['in'] === "path") {
                    url = url.replace(new RegExp("{" + itemInfo['name'] + "}"), itemInfo['value']);
                } else if (itemInfo['in'] === "query") {
                    urlParams.push(_option + '=' + itemInfo['value']);
                }
            } else if (item['in'] === "body") {
                self.fetchBodyInfo(data);
            }
        });
        let queryPath = "";
        if (urlParams && urlParams.length > 0) {
            queryPath = urlParams.join('&');
        }
       
       this.tryoutService[this.method.verb](url, queryPath, data).subscribe((resp) => {
            this.sentActive = false;
            this.cs.setAPIResponse(resp);
        }, (err)=> { 
         debugger;
            self.catchError(err); 
        });
    }

    fetchBodyInfo(data){
        this.cs.getBodyParams().forEach(function (itemArr, index) {
             let dataObj = {};
            itemArr.forEach(function (itemData, index) {
                dataObj[itemData['name']] = itemData['value'];
            });
            data.push(dataObj);
        });
    }

    catchError(err) {
        this.sentActive = false;
        this.cs.setError(err);
    }
}
