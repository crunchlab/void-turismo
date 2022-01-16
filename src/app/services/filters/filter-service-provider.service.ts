import { Injectable } from '@angular/core';
import { set } from 'lodash';
import { AttributeFilter } from 'src/app/interfaces/attributeFilter.interface';

@Injectable({
    providedIn: 'root'
})
export class FilterServiceProvider {

    attributeFilters: AttributeFilter[] = [];
    /**
     * returns currentlty set filters
     */
    getFilters(): AttributeFilter[] {
        return this.attributeFilters;
    }

    /**
     * sets new filter in filters array
     * @param filterAttribute 
     */
    addFilter(filterAttribute: AttributeFilter) {
        let filterIndex: number = this.attributeFilters.findIndex((attr: AttributeFilter) => attr.property == filterAttribute.property);
        if (filterIndex > -1) {
            set(this.attributeFilters, `[${filterIndex}].value`, filterAttribute.value);
        } else {
            this.attributeFilters.push(filterAttribute);
        }
    }
    constructor() { }
}
