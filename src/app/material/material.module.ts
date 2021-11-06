import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';

const material = [
  MatCardModule,
  MatIconModule,
  MatListModule,
  MatTooltipModule,
];

@NgModule({
  exports: [material],
})
export class MaterialModule {}
