import { Component } from '@angular/core';
import * as maplibregl from 'maplibre-gl';
import { get as _get } from 'lodash';
import { FeatureCollectionService } from '../services/api/feature-collection.service';
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
    // featureCollection: any;

    constructor(featureCollectionService: FeatureCollectionService) {
    }

    public maploaded(event: any) {
        this.homeMap = event;
        this.homeMap.on('click', 'strutture-layer', (e: any) => {
            // Copy coordinates array.
            const coordinates = this.get(e, 'features[0].geometry.coordinates', []).slice();
            const description = this.get(e, 'features[0].properties.denominazione');
            const htmlContent = `<h4 class="tooltip_title">${description}</h4>`;
            new maplibregl.Popup()
                .setLngLat(coordinates)
                .setHTML(htmlContent)
                .addTo(this.homeMap);
        });
        event.resize();
    }


}
