import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
} from '@angular/forms';
import { YearsService } from 'src/app/countries/shared/years.service';
import { ErrorStateMatcher } from '@angular/material/core';

export class MaxDurationMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    _: FormGroupDirective | NgForm | null
  ): boolean {
    const controlTouched = !!(control && (control.dirty || control.touched));
    const controlInvalid = !!(control && control.invalid);
    const parentInvalid = !!(
      control &&
      control.parent &&
      control.parent.hasError('forbiddenMaxDuration')
    );

    return controlTouched && (controlInvalid || parentInvalid);
  }
}

@Component({
  selector: 'app-country-visit',
  templateUrl: './country-visit.component.html',
  styleUrls: ['./country-visit.component.scss'],
})
export class CountryVisitComponent {
  // public properties
  countriesAutoComplete: string[] = [];
  @Output() delete = new EventEmitter<void>();
  maxDurationMatcher = new MaxDurationMatcher();
  @Output() formChange = new EventEmitter<void>();
  @Input() validCountryNames: string[] = [];
  @Input() visit = new FormGroup({});

  // public methods
  constructor() {}

  get currentYear() {
    return YearsService.currentYear;
  }

  getMaxDuration(year: number) {
    return YearsService.maxDays(year);
  }

  get minYear() {
    return YearsService.minYear;
  }

  onCountrySearch(partialName: string) {
    if (this.validCountryNames.includes(partialName)) {
      this.countriesAutoComplete = [];
      return;
    }

    this.countriesAutoComplete = this.validCountryNames.filter((name) =>
      name.toLowerCase().includes(partialName.toLowerCase())
    );
  }

  onCountrySelect(name: string) {
    this.visit.setValue({ ...this.visit.value, country: name });
    this.formChange.emit();
    this.countriesAutoComplete = [];
  }
}
