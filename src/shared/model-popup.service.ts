import { Component, NgModule, ViewChild, OnInit, ViewContainerRef, Compiler, ReflectiveInjector, Injectable, Injector, ComponentRef} from "@angular/core";
import {Observable, ReplaySubject} from "rxjs/Rx";

// the modalservice
@Injectable()
export class ModalPopupService {
    private vcRef: ViewContainerRef;
    private injector: Injector;
    public activeInstances: number = 0;

    constructor(private compiler: Compiler) {
    }

    registerViewContainerRef(vcRef: ViewContainerRef): void {
        this.vcRef = vcRef;
    }

    registerInjector(injector: Injector): void {
        this.injector = injector;
    }

    create<T>(module: any, component: any, parameters?: Object): Observable<ComponentRef<T>> {
        let componentRef$ = new ReplaySubject();
        this.compiler.compileModuleAndAllComponentsAsync(module)
            .then(factory => {
                let _componentFactories = factory.componentFactories;
                let componentFactory = _componentFactories.filter(item => item.componentType === component)[0];
                const childInjector = ReflectiveInjector.resolveAndCreate([], this.injector);
                let componentRef = this.vcRef.createComponent(componentFactory, 0, childInjector);
                Object.assign(componentRef.instance, parameters); // pass the @Input parameters to the instance
                this.activeInstances ++;
                componentRef.instance["componentIndex"] = this.activeInstances;
                componentRef.instance["destroy"] = () => {
                    this.activeInstances --;
                    componentRef.destroy();
                };
                componentRef$.next(componentRef);
                componentRef$.complete();
            });
        return <Observable<ComponentRef<T>>> componentRef$.asObservable();
    }
}

// this is the modal-placeholder, it will container the created modals
@Component({
    selector: "modal-placeholder",
    template: `<div #modalplaceholder></div>`
})

export class ModalPlaceholderComponent implements OnInit {
    @ViewChild("modalplaceholder", {read: ViewContainerRef}) viewContainerRef;

    constructor(private modalPopupService: ModalPopupService, private injector: Injector){
    }
    ngOnInit(): void {
        this.modalPopupService.registerViewContainerRef(this.viewContainerRef);
        this.modalPopupService.registerInjector(this.injector);
    }
}

// These 2 items will make sure that you can annotate
// a modalcomponent with @Modal()
export class ModalPopupContainer {
    destroy: Function;
    componentIndex: number;
    closeModal(): void {
        this.destroy();
    }
}
export function ModalPopup() {
    return function (target) {
        Object.assign(target.prototype,  ModalPopupContainer.prototype);
    };
}

// module definition
@NgModule({
    declarations: [ModalPlaceholderComponent],
    exports: [ModalPlaceholderComponent],
    providers: [ModalPopupService]
})

export class ModalPopupModule {
}