import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { NgxMapLibreGLModule } from 'ngx-maplibre-gl';
// home.module.ts
import { SwiperModule } from 'swiper/angular';
import { TranslocoModule } from '@ngneat/transloco';
import { ScrollingModule } from '@angular/cdk/scrolling';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        HomePageRoutingModule,
        NgxMapLibreGLModule,
        SwiperModule,
        TranslocoModule,
        ScrollingModule
    ],
    declarations: [HomePage]
})
export class HomePageModule { }
