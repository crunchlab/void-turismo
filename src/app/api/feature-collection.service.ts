import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import struttureRicettive from '../../data/struttureRicettive';
@Injectable({
    providedIn: 'root'
})
export class FeatureCollectionService {

    constructor() { }

    public list(): Observable<any> {
        let list: any[] = struttureRicettive.features.map(struttura => ({ geometry: struttura.geometry, type: struttura.type }));
        return of({ features: list});
    }
}
