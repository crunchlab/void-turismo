import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { TranslocoRootModule } from './transloco-root.module';
import { StrutturaService } from './services/api/struttura.service';
import { BoolToWordPipe } from './bool-to-word.pipe';

@NgModule({
    declarations: [AppComponent, BoolToWordPipe],
    entryComponents: [],
    imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule, TranslocoRootModule],
    providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, StrutturaService, BoolToWordPipe],
    bootstrap: [AppComponent],
})
export class AppModule { }
