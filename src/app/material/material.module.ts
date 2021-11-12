import { NgModule } from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';

const material = [
  MatBadgeModule,
  MatButtonModule,
  MatCardModule,
  MatIconModule,
  MatListModule,
  MatSelectModule,
  MatTooltipModule,
];

@NgModule({
  exports: [material],
})
export class MaterialModule {}
