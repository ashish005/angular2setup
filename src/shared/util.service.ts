import { Injectable } from '@angular/core';

@Injectable()
export class UtilService {
    constructor() {}

    filter(data: string, props: Array<string>, originalList: Array<any>) {
        let filteredList: any[];
        if (data && props && originalList) {
            data = data.toLowerCase();
            let filtered = originalList.filter(item => {
                let match = false;
                for (let prop of props) {
                    if (item[prop] && item[prop].toString().toLowerCase().indexOf(data) > -1) {
                        match = true;
                        break;
                    }
                }
                return match;
            });
            filteredList = filtered;
        } else {
            filteredList = originalList;
        }

        return filteredList;
    }
    filterByObjectKey(data: string, Objkey:string, obj1Key:string,  originalList: Array<any>) {
        let filteredList: any[];
        if (data && Objkey && originalList) {
            data = data.toLowerCase();
            let filtered = originalList.filter(item => {
                let match = false;
                if (item[Objkey] && item[Objkey][obj1Key] && item[Objkey][obj1Key].toString().toLowerCase().indexOf(data) > -1) {
                    match = true;
                }
                return match;
            });
            filteredList = filtered;
        } else {
            filteredList = originalList;
        }
        return filteredList;
    }
}