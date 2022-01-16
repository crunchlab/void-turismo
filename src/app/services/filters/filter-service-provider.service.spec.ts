import { TestBed } from '@angular/core/testing';
import { isArray } from 'lodash';
import { Tipologia } from '../../enums/tipologia.enum';
import { FilterOperator } from '../../enums/filterOperator.enum';
import { AttributeFilter } from '../../interfaces/attributeFilter.interface';

import { FilterServiceProvider } from './filter-service-provider.service';

describe('FilterServiceProvider', () => {
    let service: FilterServiceProvider;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(FilterServiceProvider);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should mantain current filters state', () => {
        expect(isArray(service.getFilters())).toBeTruthy();
        let filterAttribute: AttributeFilter = {
            property: 'tipologia',
            operator: FilterOperator.eq,
            value: Tipologia.ALBERGO
        };
        service.addFilter(filterAttribute);
        expect(service.attributeFilters.findIndex(a => a.property == filterAttribute.property)).toBeGreaterThan(-1);
        filterAttribute.value = Tipologia.BED_AND_BREAKFAST
        service.addFilter(filterAttribute);
        expect(service.attributeFilters.findIndex(a => a.property == filterAttribute.property)).toBeGreaterThan(-1);


    });

});
