import { Injectable } from '@angular/core';
import { Struttura } from 'src/app/models/struttura/struttura';
import { Feature, Geometry } from 'geojson';

import { find } from 'lodash';
import { FeatureToStrutturaService } from '../transformer/feature-to-struttura.service';
import { HttpClient } from '@angular/common/http';
@Injectable({
    providedIn: 'root'
})
export class StrutturaService {
    strutture: Struttura[] = [];

    constructor(private service: FeatureToStrutturaService, private httpClient: HttpClient) { }


    ngOnInit() {
        this.httpClient.get<any>("assets/data/strutture.json").subscribe((data) =>
            this.strutture = data.map(d => this.service.featureToStruttura(d))
        );
    }


    public getDetail(id: string | number): Struttura {
        let struttura: Struttura = find(this.strutture, { codiceIdentificativo: id }) as Struttura;
        return struttura;
    }
}
