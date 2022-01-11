import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailPageRoutingModule } from './detail-routing.module';

import { DetailPage } from './detail.page';
import { TranslocoModule } from '@ngneat/transloco';
import { BoolToWordPipeModule } from 'src/app/pipes/bool-to-word/bool-to-word.module';
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        DetailPageRoutingModule,
        TranslocoModule,
        BoolToWordPipeModule],
    declarations: [DetailPage]
})
export class DetailPageModule { }
