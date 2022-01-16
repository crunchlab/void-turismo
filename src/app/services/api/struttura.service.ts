import { Injectable } from '@angular/core';
import { Struttura } from 'src/app/models/struttura/struttura';
import { find } from 'lodash';
import { FeatureToStrutturaService } from '../transformer/feature-to-struttura.service';

import strutture from '../../../assets/data/strutture.json';
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
}
