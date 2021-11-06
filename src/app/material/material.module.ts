import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';

const material = [MatCardModule, MatListModule];

@NgModule({
  exports: [material],
})
export class MaterialModule {}
