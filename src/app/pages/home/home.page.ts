import { Component, ViewChild } from '@angular/core';
import * as maplibregl from 'maplibre-gl';
import { get, get as _get, isNil, uniq, uniqBy } from 'lodash';
import { Struttura } from '../../models/struttura/struttura';
import { FeatureToStrutturaService } from '../../services/transformer/feature-to-struttura.service';
import { Feature, FeatureCollection, Geometry } from 'geojson';
import SwiperCore, { Virtual } from 'swiper';
import { SwiperComponent } from 'swiper/angular';
import { environment } from '../../../environments/environment';
import COLOR_MAP from '../../../assets/map-styles/data-points-colors.json';
import { FilterServiceProvider } from 'src/app/services/filters/filter-service-provider.service';
import { FilterOperator } from 'src/app/enums/filterOperator.enum';
import struttureGeoJson from '../../../assets/data/strutture.json';
import { MapUtilsService } from 'src/app/services/utils/map-utils.service';
import { LngLatLike, MapboxEvent } from 'maplibre-gl';
SwiperCore.use([Virtual]);
@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage {
    homeMap: maplibregl.Map;
    selectedFeature: any = { lngLat: [0, 0] };
    public mapStyle = environment.mapStyle;
    public get = _get;
    public struttureGeoJson: FeatureCollection = (struttureGeoJson as FeatureCollection);
    public comuneSelezionato: string = "";

    public struttureCirclePaint: maplibregl.CirclePaint = {
        'circle-radius': {
            'base': 1.75,
            'stops': [
                [0, 0],
                [6, 1],
                [8, 2],
                [11, 4],
                [12, 5]
            ]
        },
        'circle-color': [
            'case',
            // ['!', ['boolean', ['feature-state', 'isHighlighted'], true]],
            // 'transparent',
            ['all', ['boolean', ['feature-state', 'isMatch'], true], ['!', ['boolean', ['feature-state', 'isWithinRange'], true]]],
            COLOR_MAP.tipologia.ALTRO,
            ['all', ['boolean', ['feature-state', 'isMatch'], true], ['==', ['get', 'tipologia'], "ALBERGO"]],
            COLOR_MAP.tipologia.ALBERGO,
            ['all', ['boolean', ['feature-state', 'isMatch'], true], ['==', ['get', 'tipologia'], "APPARTAMENTO"]],
            COLOR_MAP.tipologia.APPARTAMENTO,
            ['all', ['boolean', ['feature-state', 'isMatch'], true], ['==', ['get', 'tipologia'], "AGRITURISMO"]],
            COLOR_MAP.tipologia.AGRITURISMO,
            ['all', ['boolean', ['feature-state', 'isMatch'], true], ['==', ['get', 'tipologia'], "BED_AND_BREAKFAST"]],
            COLOR_MAP.tipologia.BED_AND_BREAKFAST,
            ['all', ['boolean', ['feature-state', 'isMatch'], true], ['==', ['get', 'tipologia'], "CAMPEGGIO"]],
            COLOR_MAP.tipologia.CAMPEGGIO,
            'transparent'
        ],
        'circle-stroke-color': [
            'case',
            ['any',
                // ['!', ['boolean', ['feature-state', 'isMatch'], true]],
                ['!', ['boolean', ['feature-state', 'isWithinRange'], true]]
            ],
            COLOR_MAP.tipologia.ALTRO,
            ['==', ['get', 'tipologia'], "ALBERGO"],
            COLOR_MAP.tipologia.ALBERGO,
            ['==', ['get', 'tipologia'], "APPARTAMENTO"],
            COLOR_MAP.tipologia.AGRITURISMO,
            ['==', ['get', 'tipologia'], "AGRITURISMO"],
            COLOR_MAP.tipologia.APPARTAMENTO,
            ['==', ['get', 'tipologia'], "BED_AND_BREAKFAST"],
            COLOR_MAP.tipologia.BED_AND_BREAKFAST,
            ['==', ['get', 'tipologia'], "CAMPEGGIO"],
            COLOR_MAP.tipologia.CAMPEGGIO,
            'transparent'
        ],
        'circle-stroke-width': 1,

        'circle-stroke-opacity': [
            'case',
            ['!', ['boolean', ['feature-state', 'isHighlighted'], true]],
            0.5,
            1
        ],
        'circle-opacity': [
            'case',
            ['!', ['boolean', ['feature-state', 'isHighlighted'], true]],
            0.5,
            1
        ]
    };
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
    public labelPaint: maplibregl.SymbolPaint = {

        "text-opacity": {
            "stops": [
                [{ "zoom": 6, "value": 0 }, 0],
                [{ "zoom": 10, "value": 1 }, 1]
            ]

        }
    };
    strutture: Struttura[] = [];
    comuni: string[] = [];
    slidesVisible: boolean = false;
    @ViewChild('swiperStrutture', { static: false }) swiperStrutture: SwiperComponent;

    constructor(private featureTransformer: FeatureToStrutturaService, private filterService: FilterServiceProvider, private mapUtils: MapUtilsService) {

    }

    public mapLoaded(event: any) {
        this.homeMap = event;
        this.homeMap.on('sourcedata', e => this.sectionSourceAddedCallback(e));
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
            e.isSourceLoaded && (!this.comuni.length)) {

            let strutture = this.struttureGeoJson.features.map(feature => this.featureTransformer.featureToStruttura(feature as Feature));
            this.comuni = uniq(strutture.map((s: Struttura) => s.comune)).sort();
            this.homeMap.off('sourcedata', this.sectionSourceAddedCallback); //Unbind event here
        }
    }

    public onDragEnd(evt: MapboxEvent<MouseEvent | TouchEvent | WheelEvent> & maplibregl.EventData) {
        let isHuman = get(evt, 'originalEvent.isTrusted', false);
        this.refreshSlides(!isHuman);

    }
    public mapZoomEnd(evt: MapboxEvent<MouseEvent | TouchEvent | WheelEvent> & maplibregl.EventData) {
        let isHuman = get(evt, 'originalEvent.isTrusted', false);
        this.refreshSlides(!isHuman);
    }
    private refreshSlides(fitToResults: boolean = false) {
        let renderedFeatures: maplibregl.MapboxGeoJSONFeature[] = this.homeMap.queryRenderedFeatures(null, { "layers": ["strutture-layer"] });
        let filteredFeatures = this.filterService.applyFilters(renderedFeatures, "properties");
        let filterdIds: number[] = filteredFeatures.map(f => f.codiceIdentificativo);
        let filterCoordinates: LngLatLike[] = this.struttureGeoJson.features.filter(f => filterdIds.includes(+f.properties.codiceIdentificativo)).map(f => (f.geometry as any).coordinates);
        renderedFeatures.map(f => {
            let isMatch = filterdIds.includes(f.properties.codiceIdentificativo);
            this.homeMap.setFeatureState({ source: 'strutture', id: f.properties.codiceIdentificativo }, { "isMatch": isMatch });
        });
        if (this.homeMap.getZoom() > 10) {
            this.strutture = filteredFeatures.map((feature: Feature) => this.featureTransformer.featureToStruttura(feature));
            this.swiperStrutture.swiperRef.virtual.removeAllSlides();
            this.swiperStrutture.swiperRef.updateSlides();
            this.swiperStrutture.swiperRef.virtual.update(true);
            if (this.strutture.length) {
                this.swiperStrutture.swiperRef.slideTo(0);
            }

        } else {
            this.strutture = [];
        }
        if (fitToResults && filterCoordinates.length) {
            this.homeMap.fitBounds(this.mapUtils.getLatLngBounds(filterCoordinates));
        }
    }

    private handleLayerClick(clickedFeature: Feature<Geometry, { [name: string]: any; }>) {
        const coordinates = this.get(clickedFeature, 'geometry.coordinates', []).slice();
        const description = this.get(clickedFeature, 'properties.denominazione');
        const htmlContent = `<h4 class="tooltip_title">${description}</h4>`;
        new maplibregl.Popup()
            .setLngLat(coordinates)
            .setHTML(htmlContent)
            .addTo(this.homeMap);
    }

    public searchComune(term: string = "", comune: string) {
        term = term.toLowerCase();
        return comune.toLowerCase().replace(' ', '').indexOf(term) > -1;

    }

    public onComuneChange(searchTerm: string = "") {

        this.filterService.addFilter({
            property: 'comune',
            operator: FilterOperator.like,
            value: searchTerm
        });
        this.refreshSlides(true);
    }
}
