import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-region-filter',
  templateUrl: './region-filter.component.html',
  styleUrls: ['./region-filter.component.scss'],
})
export class RegionFilterComponent {
  // public properties
  @Output() regionChange = new EventEmitter<string>();
  selectedRegion = 'all-regions';
  regions = ['africa', 'americas', 'antarctic', 'asia', 'europe', 'oceania'];
}
