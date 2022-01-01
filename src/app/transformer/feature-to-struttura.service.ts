import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class FeatureToStrutturaService {
    /** Object used to map feature properties to struttura fields */
    mappings: any = environment.fieldMappings;

    constructor() { }
}
