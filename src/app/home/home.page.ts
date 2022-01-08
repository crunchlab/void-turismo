import { Component } from '@angular/core';
import * as maplibregl from 'maplibre-gl';
import { get as _get, isNil, uniq } from 'lodash';
import { Struttura } from '../models/struttura/struttura';
import { FeatureToStrutturaService } from '../services/transformer/feature-to-struttura.service';
import { Feature, Geometry } from 'geojson';
import SwiperCore, { Pagination, Virtual } from 'swiper';

SwiperCore.use([Pagination, Virtual]);
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
    strutture: Struttura[] = [];
    comuni: string[] = [];
    comuniCandidati: string[] = [];

    constructor(featureTransformer: FeatureToStrutturaService) {
        this.featureTransformer = featureTransformer;
    }

    public mapLoaded(event: any) {
        this.homeMap = event;
        this.homeMap.on('sourcedata', e=>this.sectionSourceAddedCallback(e));
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
    sectionSourceAddedCallback(e: maplibregl.EventData): void {
        if (this.homeMap.getSource('strutture') &&
            this.homeMap.isSourceLoaded('strutture') &&
            e.isSourceLoaded) {
            this.strutture = this.homeMap.queryRenderedFeatures(null, { "layers": ["strutture-layer"] }).map((feature: Feature) => this.featureTransformer.featureToStruttura(feature));
            this.comuni = uniq(this.strutture.map((s: Struttura) => s.comune));

            this.homeMap.off('sourcedata', this.sectionSourceAddedCallback); //Unbind event here
        }
    }

    public mapZoomEnd(event: any) {
        this.strutture = this.homeMap.queryRenderedFeatures(null, { "layers": ["strutture-layer"] }).map((feature: Feature) => this.featureTransformer.featureToStruttura(feature));
    }
    private handleLayerClick(clickedFeature: Feature<Geometry, { [name: string]: any; }>) {
        let struttura: Struttura = this.featureTransformer.featureToStruttura(clickedFeature);
        const coordinates = this.get(clickedFeature, 'geometry.coordinates', []).slice();
        const description = this.get(clickedFeature, 'properties.denominazione');
        const htmlContent = `<h4 class="tooltip_title">${description}</h4>`;
        new maplibregl.Popup()
            .setLngLat(coordinates)
            .setHTML(htmlContent)
            .addTo(this.homeMap);
    }

    public onSearchItemChange(event: any) {
        let searchTerm: string = _get(event, 'detail.value', '');
        if (searchTerm) {
            this.comuniCandidati = this.comuni.filter(c => (c.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1));
        } else {
            this.comuniCandidati = [];
        }
    }

}
