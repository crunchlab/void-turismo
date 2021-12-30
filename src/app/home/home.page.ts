import { Component, ViewChild } from '@angular/core';
import { FeatureCollection } from 'geojson';
import * as maplibregl from 'maplibre-gl';
import { MapboxEvent } from 'maplibre-gl';
import { FeatureCollectionService } from '../api/feature-collection.service';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
    @ViewChild('homeMap') homeMap: maplibregl.Map;
    featureCollection: any;

  constructor(featureCollectionService:FeatureCollectionService) {
      featureCollectionService.list().subscribe((featureCollection: FeatureCollection)=>{
          this.featureCollection = { 'type': 'geojson', data:featureCollection};
      });
  }

    public maploaded(event:any){
        event.resize();
    }
}
