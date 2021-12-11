import { NgModule } from '@angular/core';

import { WishListRoutingModule } from './wish-list-routing.module';
import { WishListComponent } from './wish-list.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [WishListComponent],
  imports: [WishListRoutingModule, SharedModule],
})
export class WishListModule {}
