import { Injectable } from '@angular/core';
import { Feature, Geometry } from 'geojson';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class FeatureToStrutturaService {
    featureToStruttura(feature: Feature<Geometry, { [name: string]: any; }>): import("../../models/struttura/struttura").Struttura {
        throw new Error('Method not implemented.');
    }
    /** Object used to map feature properties to struttura fields */
    mappings: any = environment.fieldMappings;

    constructor() { }
}
