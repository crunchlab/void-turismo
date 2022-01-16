import { Injectable } from '@angular/core';
import { set } from 'lodash';
import { AttributeFilter } from '../../interfaces/attributeFilter.interface';
import * as jq from "json-query";
import { FilterOperator } from '../../enums/filterOperator.enum';
@Injectable({
    providedIn: 'root'
})
export class FilterServiceProvider {
    setFilters(filters: AttributeFilter[]) {
        this.filters = filters;
    }

    filters: AttributeFilter[] = [];
    /**
     * returns currentlty set filters
     */
    getFilters(): AttributeFilter[] {
        return this.filters;
    }

    /**
     * sets new filter in filters array
     * @param filterAttribute 
     */
    addFilter(filterAttribute: AttributeFilter) {
        let filterIndex: number = this.filters.findIndex((attr: AttributeFilter) => attr.property == filterAttribute.property);
        if (filterIndex > -1) {
            set(this.filters, `[${filterIndex}].value`, filterAttribute.value);
        } else {
            this.filters.push(filterAttribute);
        }
    }

    applyFilters(features: any, path:string): any {
        let results: any = [];
        let filterString: string = `${path}[*`;
        this.filters.map((filter: AttributeFilter, idx: number) => {

            switch (filter.operator) {
                case FilterOperator.eq:
                    filterString += `${filter.property}=${filter.value}`;
                    break;
                case FilterOperator.gte:
                    filterString += `${filter.property}>${filter.value}`;
                    break;
                case FilterOperator.gteq:
                    filterString += `${filter.property}>=${filter.value}`;
                    break;
                case FilterOperator.lte:
                    filterString += `${filter.property}<${filter.value}`;
                    break;
                case FilterOperator.lteq:
                    filterString += `${filter.property}<=${filter.value}`;
                    break;
                case FilterOperator.like:
                    filterString += `${filter.property}~/.*${filter.value}.*/i`;
                    break
                default:
                    break;
            }
            if(idx < this.filters.length-1){
                filterString+=" & ";
            }
        });
        filterString += "]";
        console.log(filterString);
        results = jq.default(filterString, { data: features, allowRegexp: true }).value;
        return results;
    }
    constructor() { }
}
