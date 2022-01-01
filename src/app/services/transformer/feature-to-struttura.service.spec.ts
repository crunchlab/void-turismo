import { TestBed } from '@angular/core/testing';
import { Feature } from 'geojson';
import { Struttura } from 'src/app/models/struttura/struttura';

import { FeatureToStrutturaService } from './feature-to-struttura.service';

describe('FeatureToStrutturaService', () => {
    let transformer: FeatureToStrutturaService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        transformer = TestBed.inject(FeatureToStrutturaService);
    });

    it('should be created', () => {
        expect(transformer).toBeTruthy();
    });

    it('should have a mapping object', () => {
        expect(transformer.mappings).toBeDefined();

    });

    it('should transform a geojson feature to an object of type Struttura', () => {
        let feature: Feature = {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [
                    12.6053846,
                    45.4905415
                ]
            },
            "id": "316af9f8-32e0-40a2-9539-44847abd16b6",
            "properties": {
                "cap": 30016,
                "fax": "6624.27.00",
                "lago": "0",
                "mare": "1",

                "zona": "jesolo-eraclea",
                "email": "info@hotel-international.it",
                "sauna": "0",
                "comune": "JESOLO",
                "stelle": "2 **",
                "fitness": "0",
                "inglese": "1",
                "interno": "",
                "piscina": "0",
                "tedesco": "1",
                "termale": "0",
                "francese": "1",
                "localita": "LIDO DI JESOLO",
                "www": "www.hotel-international.it",
                "solarium": "0",
                "spagnolo": "1",
                "telefono": "6609.47.00",
                "toponimo": "VIA MONTEVERDI,5,Jesolo,VENEZIA",
                "aeroporto": "0",
                "categoria": null,
                "collinare": "0",
                "indirizzo": "VIA MONTEVERDI",
                "periferia": "0",
                "provincia": "VENEZIA",
                "tipologia": "ALBERGO",
                "autostrada": "0",
                "parcheggio": "1",
                "ristorante": "1",
                "zonaFiera": "0",
                "stazioneFs": "0",
                "giochiBimbi": "0",
                "altriServizi": "tv sat; wi-fi",
                "denominazione": "INTERNATIONAL",
                "numeroCivico": "5",
                "centroStorico": "0",
                "animaliAmmessi": "1",
                "piscinaCoperta": "0",
                "salaConferenze": "0",
                "ariaCondizionata": "0",
                "impiantiRisalita": "0",
                "accessoDisabili": "0",
                "chiusuraTemporanea": "0",
                "dataUltimaModifica": "02/11/2017",
                "tipologiaSecondaria": "Albergo",
                "codiceIdentificativo": 42409,
                "nuovaClassificazioneLR11": "2 **"
            }
        };
        let struttura: Struttura = transformer.featureToStruttura(feature);
        expect(struttura).toBeDefined();
    });
});
