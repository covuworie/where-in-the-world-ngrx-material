import { Component, Input } from '@angular/core';
import CountrySummaryViewModel from './country-summary-view.model';
import * as WishListActions from '../../store/actions/wish-list.actions';
import { CountrySummaryFacadeService } from 'src/app/store/facades/country-summary-facade.service';

@Component({
  selector: 'app-country-summary',
  templateUrl: './country-summary.component.html',
  styleUrls: ['./country-summary.component.scss'],
})
export class CountrySummaryComponent {
  // public properties
  @Input() country: CountrySummaryViewModel = {
    name: '',
    flagUrl: '',
    population: 0,
    region: '',
    capital: '',
    onWishList: false,
  };

  // public methods
  constructor(private countrySummaryFacade: CountrySummaryFacadeService) {}

  onToggleWishList(name: string) {
    if (this.country.onWishList) {
      this.countrySummaryFacade.dispatch(WishListActions.remove({ name }));
      this.country.onWishList = false;
      return;
    }

    this.countrySummaryFacade.dispatch(WishListActions.add({ name }));
    this.country.onWishList = true;
  }
}
