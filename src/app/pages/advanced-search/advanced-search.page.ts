import { Component, OnInit } from '@angular/core';
import { FilterServiceProvider } from '../../services/filters/filter-service-provider.service';
import { StrutturaService } from '../../services/api/struttura.service';
import { AttributeFilter } from '../../interfaces/attributeFilter.interface';

@Component({
    selector: 'app-advanced-search',
    templateUrl: './advanced-search.page.html',
    styleUrls: ['./advanced-search.page.scss'],
})
export class AdvancedSearchPage implements OnInit {

    public filters: AttributeFilter[] = [];
    constructor(private filterService: FilterServiceProvider, private strutturaService: StrutturaService) {
        this.filters = this.strutturaService.getFilterValues();
    }

    ngOnInit() {
        console.dir(this.filterService.getFilters());
    }

    public onChipClick(filter: AttributeFilter) {
        console.log(filter);
    }

}
