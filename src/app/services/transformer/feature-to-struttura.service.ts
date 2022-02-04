import { Injectable } from '@angular/core';
import { Feature, Geometry } from 'geojson';
import { FieldMapping } from '../../interfaces/fieldMapping.interface';
import { environment } from '../../../environments/environment';
import { Struttura } from '../../models/struttura/struttura';
import { get, pick } from "lodash";
@Injectable({
    providedIn: 'root'
})
export class FeatureToStrutturaService {
    /** Object used to map feature properties to struttura fields */
    mappings: FieldMapping[] = environment.fieldMappings;

    /**
     * Maps the feature.properties elements to the field of a Struttura instance
     * @param feature: Feature
     */
    public featureToStruttura(feature: Feature<Geometry, { [name: string]: any; }>): Struttura {

        let struttura: Struttura = new Struttura();
        this.mappings.map((mapping: FieldMapping) => {
            if (Array.isArray(mapping.properties)) {
                struttura[mapping.field] = pick((feature.properties || feature), mapping.properties);
            } else {
                struttura[mapping.field] = get((feature.properties || feature), mapping.properties);
            }

            // must keep only true value if any
            // if(mapping.type == "bool"){
            //     let toKeep = Object.keys(struttura[mapping.field]).filter(k => get(struttura[mapping.field], k, false));
            //     struttura[mapping.field] = toKeep;
            // }
        });
        return struttura;
    }
    constructor() { }
}
