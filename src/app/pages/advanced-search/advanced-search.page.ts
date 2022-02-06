import { Component, OnInit } from '@angular/core';
import { FilterServiceProvider } from '../../services/filters/filter-service-provider.service';
import { StrutturaService } from '../../services/api/struttura.service';
import { AttributeFilter } from '../../interfaces/attributeFilter.interface';
import { isNil, remove } from 'lodash';

@Component({
    selector: 'app-advanced-search',
    templateUrl: './advanced-search.page.html',
    styleUrls: ['./advanced-search.page.scss'],
})
export class AdvancedSearchPage implements OnInit {

    public filters: AttributeFilter[] = [];
    public selectedFilters: AttributeFilter[];
    constructor(private filterService: FilterServiceProvider, private strutturaService: StrutturaService) {
        this.filters = this.strutturaService.getFilterValues();
        this.selectedFilters = [];
    }

    ngOnInit() {
        console.dir(this.filterService.getFilters());
    }

    public onChipClick(filter: AttributeFilter, value: string) {
        let selectedFilter: AttributeFilter = this.getFilterByValue(filter, value);
        if (selectedFilter) {
            remove((selectedFilter.value as string[]), el => el===value);
        } else {
            let newFilter: AttributeFilter = {
                property: filter.property,
                operator: filter.operator,
                value: [value]
            }
            this.selectedFilters.push(newFilter);
        }
    }


    public getFilterByValue(filter: AttributeFilter, value: string): AttributeFilter {
        return this.selectedFilters.find((f: AttributeFilter) => f.property == filter.property && (f.value as string[]).includes(value));
    }

    public isFilterSet(filter: AttributeFilter, value: string): boolean {
        return !isNil(this.getFilterByValue(filter, value));
    }
}
