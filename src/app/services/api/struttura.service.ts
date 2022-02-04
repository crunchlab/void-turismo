import { Injectable } from '@angular/core';
import { Struttura } from 'src/app/models/struttura/struttura';
import { find, get, pick, uniq } from 'lodash';
import { FeatureToStrutturaService } from '../transformer/feature-to-struttura.service';

import strutture from '../../../assets/data/strutture.json';
import { AttributeFilter } from '../../interfaces/attributeFilter.interface';
import { FieldMapping } from '../../interfaces/fieldMapping.interface';
import { FilterOperator } from '../../enums/filterOperator.enum';
@Injectable({
    providedIn: 'root'
})
export class StrutturaService {
    strutture: Struttura[] = [];

    constructor(private transformer: FeatureToStrutturaService) {
        this.strutture = strutture.features.map((f: any) => this.transformer.featureToStruttura(f));
    }


    public getDetail(id: string | number): Struttura {
        let struttura: Struttura = find(this.strutture, (s: Struttura) => s.codiceIdentificativo == (id as number)) as Struttura;
        return struttura;
    }

    /**
     *  Loops over all the strutture and returns distinct values for mapped properties
     * @param fieldMappings 
     * @returns 
     */
    public getFilterValues(fieldMappings: FieldMapping[]): AttributeFilter[] {
        let filters: AttributeFilter[] = []
        filters = fieldMappings.map((mapping: FieldMapping) => {
            let filter: AttributeFilter = { property: '', value: '', operator: FilterOperator.in };
            let values: any = this.strutture.map((s: Struttura) => {
                if (Array.isArray(mapping.properties)) {
                    return pick(s, mapping.properties);
                } else {
                    return get(s, mapping.properties)
                }
            }
            );

            filter.value = uniq(values);
            filter.property = mapping.field;
            return filter;
        });
        return filters;
    }
}
