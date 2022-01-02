import { Component } from '@angular/core';
import * as maplibregl from 'maplibre-gl';
import { get as _get, isNil } from 'lodash';
import { Struttura } from '../models/struttura/struttura';
import { FeatureToStrutturaService } from '../services/transformer/feature-to-struttura.service';
import { Feature, Geometry } from 'geojson';
import SwiperCore, { Pagination } from 'swiper';

SwiperCore.use([Pagination]);
@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage {
    homeMap: maplibregl.Map;
    selectedFeature: any = { lngLat: [0, 0] };
    public get = _get;

    public struttureLabelLayout: maplibregl.SymbolLayout =
        {
            "visibility": "visible",

            "text-field": ["get", "denominazione"
            ],
            "text-font": [
                "Open Sans Semibold",
                "Arial Unicode MS Bold"
            ],
            "text-offset": [
                0,
                1.25
            ],
            "text-anchor": "top"


        };
    featureTransformer: FeatureToStrutturaService;
    // featureCollection: any;

    constructor(featureTransformer: FeatureToStrutturaService) {
        this.featureTransformer = featureTransformer;
    }

    public mapLoaded(event: any) {
        this.homeMap = event;
        this.homeMap.on('click', 'strutture-layer', (e: any) => {
            let clickedFeature = this.get(e, 'features[0]', null);
            if (!isNil(clickedFeature)) {
                this.handleLayerClick(clickedFeature);
            }
        });
        this.homeMap.on('click', 'strutture-label-layer', (e: any) => {
            let clickedFeature = this.get(e, 'features[0]', null);
            if (!isNil(clickedFeature)) {
                this.handleLayerClick(clickedFeature);
            }
        });
        event.resize();
    }

    private handleLayerClick(clickedFeature: Feature<Geometry, { [name: string]: any; }>) {
        let struttura: Struttura = this.featureTransformer.featureToStruttura(clickedFeature);
        console.log(struttura);
        const coordinates = this.get(clickedFeature, 'geometry.coordinates', []).slice();
        const description = this.get(clickedFeature, 'properties.denominazione');
        const htmlContent = `<h4 class="tooltip_title">${description}</h4>`;
        new maplibregl.Popup()
            .setLngLat(coordinates)
            .setHTML(htmlContent)
            .addTo(this.homeMap);
    }


}
