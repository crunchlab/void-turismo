import { Component, ViewChild } from '@angular/core';
import * as maplibregl from 'maplibre-gl';
import { MapboxEvent } from 'maplibre-gl';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
    @ViewChild('homeMap') homeMap: maplibregl.Map;

  constructor() {}

    public maploaded(event:any){
        event.resize();
    }
}
