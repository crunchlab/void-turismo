import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import struttureRicettive from '../../data/struttureRicettive';
@Injectable({
    providedIn: 'root'
})
export class FeatureCollectionService {

    constructor() { }

    public list(): Observable<any> {
        return of(struttureRicettive);
    }
}
