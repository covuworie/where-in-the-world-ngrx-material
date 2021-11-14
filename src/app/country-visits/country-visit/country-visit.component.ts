import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
} from '@angular/forms';
import { YearsService } from 'src/app/countries/shared/years.service';
import { ErrorStateMatcher } from '@angular/material/core';
import { Observable, of } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

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
export class CountryVisitComponent implements OnInit {
  // public properties
  @Output() delete = new EventEmitter<void>();
  filteredCountries: Observable<string[]> = of([]);
  @Output() formChange = new EventEmitter<void>();
  maxDurationMatcher = new MaxDurationMatcher();
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

  ngOnInit() {
    this.filteredCountries = this.visit.get('country')!.valueChanges.pipe(
      startWith(''),
      map((partialName: string) => {
        return this.validCountryNames.filter((name) =>
          name.toLowerCase().includes(partialName.toLowerCase())
        );
      })
    );
  }

  setCountryAndEmit(countryInput: HTMLInputElement) {
    // Flicker when a country is selected without hitting a key is not a bug in my code.
    // Investigation shows it's due to this issue. It looks to be fixed now. Not sure what
    // version of Angular the fix will appear in:
    // https://github.com/angular/components/issues/18313
    this.visit.setValue({ ...this.visit.value, country: countryInput.value });
    this.formChange.emit();
    countryInput.blur(); // force loss of focus once value is selected
  }
}
