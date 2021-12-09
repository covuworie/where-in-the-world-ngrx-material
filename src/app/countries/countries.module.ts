import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CountriesRoutingModule } from './countries-routing.module';
import { CountriesComponent } from './countries.component';
import { CountryDetailComponent } from './country-detail/country-detail.component';
import { SharedModule } from '../shared/shared.module';
import { CountrySearchComponent } from './country-search/country-search.component';
import { RegionFilterComponent } from './region-filter/region-filter.component';
import { MaterialModule } from '../material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [
    CountriesComponent,
    CountryDetailComponent,
    CountrySearchComponent,
    RegionFilterComponent,
  ],
  imports: [
    CommonModule,
    CountriesRoutingModule,
    MaterialModule,
    SharedModule,
    FlexLayoutModule,
  ],
})
export class CountriesModule {}
