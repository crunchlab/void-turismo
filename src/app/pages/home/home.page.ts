import { Component, OnInit, ViewChild } from '@angular/core';
import * as maplibregl from 'maplibre-gl';
import { get, get as _get, isNil, remove, uniq } from 'lodash';
import { Struttura } from '../../models/struttura/struttura';
import { FeatureToStrutturaService } from '../../services/transformer/feature-to-struttura.service';
import { Feature, FeatureCollection, Geometry } from 'geojson';
import SwiperCore, { Virtual } from 'swiper';
import { SwiperComponent } from 'swiper/angular';
import { environment } from '../../../environments/environment';
import COLOR_MAP from '../../../assets/map-styles/data-points-colors.json';
import { FilterServiceProvider } from 'src/app/services/filters/filter-service-provider.service';
import { FilterOperator } from 'src/app/enums/filterOperator.enum';
import { MapUtilsService } from 'src/app/services/utils/map-utils.service';
import { LngLatLike, MapboxEvent } from 'maplibre-gl';
import struttureGeoJson from '../../../assets/data/strutture.json';
import comuni from '../../../assets/data/comuni.json';
import { ModalController } from '@ionic/angular';
import { AdvancedSearchPage } from '../advanced-search/advanced-search.page';
SwiperCore.use([Virtual]);
@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
    @ViewChild('searchContainer') searchContainer: HTMLDivElement;
    @ViewChild('swiperStrutture', { static: false }) swiperStrutture: SwiperComponent;

    public homeMap: maplibregl.Map;
    public selectedFeature: any = { lngLat: [0, 0] };
    public mapStyle = environment.mapStyle;
    public get = _get;
    public struttureGeoJson: FeatureCollection = (struttureGeoJson as FeatureCollection);
    public comuneSelezionato: string = "";

    public strutture: Struttura[] = [];
    public comuni: string[] = [];
    public tipologie: string[] = [];
    public slidesVisible: boolean = false;
    public tipologieSelezionate: string[] = [];
    private marker: maplibregl.Marker = this.createMarker();

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
            ['all', ['boolean', ['feature-state', 'isMatch'], true], ['==', ['get', 'tipologia'], "ALTRA_RICETTIVITA"]],
            COLOR_MAP.tipologia.ALTRA_RICETTIVITA,
            ['all', ['boolean', ['feature-state', 'isMatch'], true], ['==', ['get', 'tipologia'], "ALBERGO"]],
            COLOR_MAP.tipologia.ALBERGO,
            ['all', ['boolean', ['feature-state', 'isMatch'], true], ['==', ['get', 'tipologia'], "APPARTAMENTO"]],
            COLOR_MAP.tipologia.APPARTAMENTO,
            ['all', ['boolean', ['feature-state', 'isMatch'], true], ['==', ['get', 'tipologia'], "AGRITURISMO"]],
            COLOR_MAP.tipologia.AGRITURISMO,
            ['all', ['boolean', ['feature-state', 'isMatch'], true], ['==', ['get', 'tipologia'], "BED AND BREAKFAST"]],
            COLOR_MAP.tipologia.BED_AND_BREAKFAST,
            ['all', ['boolean', ['feature-state', 'isMatch'], true], ['==', ['get', 'tipologia'], "CAMPEGGIO"]],
            COLOR_MAP.tipologia.CAMPEGGIO,
            ['all', ['boolean', ['feature-state', 'isMatch'], true], ['==', ['get', 'tipologia'], "AFFITTACAMERE"]],
            COLOR_MAP.tipologia.AFFITTACAMERE,
            ['all', ['boolean', ['feature-state', 'isMatch'], true], ['==', ['get', 'tipologia'], "COUNTRY HOUSE"]],
            COLOR_MAP.tipologia.COUNTRY_HOUSE,
            ['all', ['boolean', ['feature-state', 'isMatch'], true], ['==', ['get', 'tipologia'], "RESIDENCE"]],
            COLOR_MAP.tipologia.RESIDENCE,
            'transparent'
        ],
        'circle-stroke-color': 'transparent',
        'circle-stroke-width': 1,
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
                0.5
            ],
            "text-anchor": "top",
            "text-size": [
                'interpolate', ['linear'], ['zoom'],
                10, 10,
                30, 24
            ]
        };
    public labelPaint: maplibregl.SymbolPaint = {

        "text-opacity": [
            'case',
            ['boolean', ['feature-state', 'isMatch'], true],
            1,
            0
        ],
        "text-color": [
            'case',
            ['all', ['boolean', ['feature-state', 'isMatch'], true], ['==', ['get', 'tipologia'], "ALTRA_RICETTIVITA"]],
            COLOR_MAP.tipologia.ALTRA_RICETTIVITA,
            ['all', ['boolean', ['feature-state', 'isMatch'], true], ['==', ['get', 'tipologia'], "ALBERGO"]],
            COLOR_MAP.tipologia.ALBERGO,
            ['all', ['boolean', ['feature-state', 'isMatch'], true], ['==', ['get', 'tipologia'], "APPARTAMENTO"]],
            COLOR_MAP.tipologia.APPARTAMENTO,
            ['all', ['boolean', ['feature-state', 'isMatch'], true], ['==', ['get', 'tipologia'], "AGRITURISMO"]],
            COLOR_MAP.tipologia.AGRITURISMO,
            ['all', ['boolean', ['feature-state', 'isMatch'], true], ['==', ['get', 'tipologia'], "BED AND BREAKFAST"]],
            COLOR_MAP.tipologia.BED_AND_BREAKFAST,
            ['all', ['boolean', ['feature-state', 'isMatch'], true], ['==', ['get', 'tipologia'], "CAMPEGGIO"]],
            COLOR_MAP.tipologia.CAMPEGGIO,
            ['all', ['boolean', ['feature-state', 'isMatch'], true], ['==', ['get', 'tipologia'], "AFFITTACAMERE"]],
            COLOR_MAP.tipologia.AFFITTACAMERE,
            ['all', ['boolean', ['feature-state', 'isMatch'], true], ['==', ['get', 'tipologia'], "COUNTRY HOUSE"]],
            COLOR_MAP.tipologia.COUNTRY_HOUSE,
            ['all', ['boolean', ['feature-state', 'isMatch'], true], ['==', ['get', 'tipologia'], "RESIDENCE"]],
            COLOR_MAP.tipologia.RESIDENCE,
            COLOR_MAP.tipologia.ALTRA_RICETTIVITA,
        ]
    };



    ngOnInit(): void {
        //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
        //Add 'implements OnInit' to the class.
        let strutture = this.struttureGeoJson.features.map(feature => this.featureTransformer.featureToStruttura(feature as Feature));
        this.comuni = uniq(strutture.map((s: Struttura) => s.comune)).sort();
        this.tipologie = uniq(strutture.map((s: Struttura) => s.tipologia)).sort();
        this.tipologieSelezionate = [...this.tipologie];
    }
    constructor(private featureTransformer: FeatureToStrutturaService, private filterService: FilterServiceProvider, private mapUtils: MapUtilsService, public modalController: ModalController) {

    }

    public mapLoaded(event: any) {
        this.homeMap = event;
        this.homeMap.on('click', 'strutture-layer', (e: any) => {
            let clickedFeature = this.get(e, 'features[0]', null);
            if (!isNil(clickedFeature) && clickedFeature.state.isMatch) {
                this.handleLayerClick(clickedFeature);
            }
        });
        this.homeMap.on('click', 'strutture-label-layer', (e: any) => {
            let clickedFeature = this.get(e, 'features[0]', null);
            if (!isNil(clickedFeature) && clickedFeature.state.isMatch) {
                this.handleLayerClick(clickedFeature);
            }
        });
        event.resize();
        let filterCoordinates: LngLatLike[] = this.struttureGeoJson.features.map(f => (f.geometry as any).coordinates);
        this.fitResultsBBox(filterCoordinates);
    }


    public onDragEnd(evt: MapboxEvent<MouseEvent | TouchEvent | WheelEvent> & maplibregl.EventData) {
        let isHuman = get(evt, 'originalEvent.isTrusted', true);
        if (isHuman) {
            this.refreshSlides();
        }

    }
    public mapZoomEnd(evt: MapboxEvent<MouseEvent | TouchEvent | WheelEvent> & maplibregl.EventData) {
        let isHuman = get(evt, 'originalEvent.isTrusted', true);
        if (isHuman) {
            this.refreshSlides();
        }
    }
    private refreshSlides() {
        let renderedFeatures: maplibregl.MapboxGeoJSONFeature[] = this.homeMap.queryRenderedFeatures(null, { "layers": ["strutture-layer"] });
        // let filteredFeatures = this.filterService.applyFilters(this.struttureGeoJson.features, "properties");
        let filteredFeatures = this.filterService.applyFilters(renderedFeatures, "properties");
        let filterdIds: number[] = filteredFeatures.map(f => f.codiceIdentificativo);
        // let filterCoordinates: LngLatLike[] = this.struttureGeoJson.features.filter(f => filterdIds.includes(+f.properties.codiceIdentificativo)).map(f => (f.geometry as any).coordinates);
        renderedFeatures.map(f => {
            let isMatch = filterdIds.includes(f.properties.codiceIdentificativo);
            this.homeMap.setFeatureState({ source: 'strutture', id: f.properties.codiceIdentificativo }, { "isMatch": isMatch });
        });
        if (this.homeMap.getZoom() > 10) {
            this.strutture = filteredFeatures.map((feature: Feature) => this.featureTransformer.featureToStruttura(feature));
            this.strutture = this.strutture.sort((a: Struttura, b: Struttura) => {
                return (a.denominazione < b.denominazione) ? -1 : (a.denominazione > b.denominazione) ? 1 : 0;
            })
            this.swiperStrutture.swiperRef.virtual.removeAllSlides();
            this.swiperStrutture.swiperRef.updateSlides();
            this.swiperStrutture.swiperRef.virtual.update(true);
            if (this.strutture.length) {
                this.swiperStrutture.swiperRef.slideTo(0);
            }

        } else {
            this.strutture = [];
        }
    }


    private fitResultsBBox(filterCoordinates: maplibregl.LngLatLike[]) {
        let paddingObject = {
            top: (this.searchContainer as any).nativeElement.getBoundingClientRect().height + 100,
            left: 50,
            right: 50,
            bottom: (this.swiperStrutture as any).elementRef.nativeElement.getBoundingClientRect().height + 100
        };
        this.homeMap
            .fitBounds(this.mapUtils.getLatLngBounds(filterCoordinates), { padding: paddingObject });
    }

    private handleLayerClick(clickedFeature: Feature<Geometry, { [name: string]: any; }>) {
        let slideIdx = this.strutture.findIndex(s => s.codiceIdentificativo === clickedFeature.id);
        this.swiperStrutture.swiperRef.slideTo(slideIdx, 1200);
    }

    public searchComune(term: string = "", comune: string) {
        term = term.toLowerCase();
        return comune.toLowerCase().replace(' ', '').indexOf(term) > -1;

    }

    /**
     * zooms in map to selected city
     * @param searchTerm string: comune cercato
     */
    public onComuneChange(searchTerm: string = "") {
        let comune = comuni.find(c => c.name.toUpperCase() === searchTerm.toUpperCase());
        let filterCoordinates: LngLatLike = [comune.long, comune.lat];
        let easeOptions: any = {
            center: filterCoordinates,
            duration: 1200
        };
        if (this.homeMap.getZoom() < 13) {
            easeOptions.zoom = 13;
        }
        this.homeMap.easeTo(easeOptions);
    }

    public onChipClick(tipologia: string) {
        if (this.tipologieSelezionate.includes(tipologia)) {
            remove(this.tipologieSelezionate, t => t == tipologia);
            if (!this.tipologieSelezionate.length) {
                this.tipologieSelezionate = [...this.tipologie];
            }
        } else {
            this.tipologieSelezionate.push(tipologia);
        }
        this.filterService.addFilter({ property: 'tipologia', operator: FilterOperator.in, value: this.tipologieSelezionate });
        this.refreshSlides();
    }

    private createMarker(color: string = 'red'): maplibregl.Marker {
        const el = document.createElement('div');
        el.className = 'marker-container';
        const markerDiv = document.createElement('div');
        markerDiv.className = 'marker';
        el.appendChild(markerDiv);
        let marker: maplibregl.Marker = new maplibregl.Marker({ color: color });

        return marker;
    }

    public onUserLocationClick() {
        let geoSuccess = evt => {
            // console.log(evt);
            let lng = evt.coords.longitude;
            let lat = evt.coords.latitude;

            let easeOptions: any = {
                center: [lng, lat],
                duration: 1200
            };
            if (this.homeMap.getZoom() < 13) {
                easeOptions.zoom = 13;
            }
            this.homeMap.easeTo(easeOptions);
        };
        let geoError = err => console.error(err);
        navigator.geolocation.getCurrentPosition(geoSuccess, geoError);

    }

    public onSlideChange(event: any) {
        let index = event.activeIndex;
        let struttura = this.strutture[index];
        let geojsonPoint = this.struttureGeoJson.features.find(f => f.properties.codiceIdentificativo == struttura.codiceIdentificativo);
        const coordinates = this.get(geojsonPoint, 'geometry.coordinates', []).slice();
        this.marker.remove();
        let color: string = get(COLOR_MAP, `tipologia[${struttura.tipologia.replaceAll(' ', '_').toUpperCase()}]`, COLOR_MAP.tipologia.ALTRA_RICETTIVITA);
        this.marker = this.createMarker(color)
        this.marker.setLngLat(coordinates)
            .addTo(this.homeMap);
    }

    public onAdvancedSearchClick() {
        console.log('onAdvancedSearchClick');

    }

    async openIonModal() {
        const modal = await this.modalController.create({
            component: AdvancedSearchPage,
            cssClass: 'monithon-about-modal'
        });

        modal.onDidDismiss().then((modelData) => {
            if (modelData !== null) {
                console.log(modelData);
            }
        });

        return await modal.present();
    }

}

