import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailPageRoutingModule } from './detail-routing.module';

import { DetailPage } from './detail.page';
import { TranslocoModule } from '@ngneat/transloco';
import { BoolToWordPipeModule } from 'src/app/pipes/bool-to-word/bool-to-word.module';
import { LangToFlagPipeModule } from 'src/app/pipes/lang-to-flag/lang-to-flag.module';
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        DetailPageRoutingModule,
        TranslocoModule,
        BoolToWordPipeModule,
        LangToFlagPipeModule],
    declarations: [DetailPage]
})
export class DetailPageModule { }
