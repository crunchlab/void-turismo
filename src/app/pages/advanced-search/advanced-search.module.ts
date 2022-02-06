import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdvancedSearchPageRoutingModule } from './advanced-search-routing.module';

import { AdvancedSearchPage } from './advanced-search.page';
import { CastToPipeModule } from 'src/app/pipes/cast-to/cast-to.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdvancedSearchPageRoutingModule,
    CastToPipeModule
  ],
  declarations: [AdvancedSearchPage]
})
export class AdvancedSearchPageModule {}
