import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-country-search',
  templateUrl: './country-search.component.html',
  styleUrls: ['./country-search.component.scss'],
})
export class CountrySearchComponent {
  // public properties
  @Output() countrySearchChange = new EventEmitter<string>();

  // public methods
  constructor() {}
}
