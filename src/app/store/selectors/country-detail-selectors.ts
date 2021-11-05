import { createSelector } from '@ngrx/store';
import CountryDetailViewModel from 'src/app/countries/country-detail/country-detail-view.model';
import * as CountrySelectors from './country.selectors';

export const selectCountryDetailViewModel = (commonName: string) =>
  createSelector(
    CountrySelectors.selectAllCountries,
    CountrySelectors.selectAlphaCodesToCountryNames,
    (countries, alpha3CodesToCountryNames) => {
      // find country
      const country = countries.find(({ name }) => name.common === commonName);
      if (country === undefined) {
        return undefined;
      }

      // currencies
      const currencyNamesAndSymbols: string[] = [];
      if (country.currencies) {
        Object.values(country.currencies).forEach((currency) => {
          currencyNamesAndSymbols.push(`${currency.name} (${currency.symbol})`);
        });
      }

      // borders
      const borderingCountries: { name: string; flagUrl: string }[] = [];
      country.borders?.forEach((alpha3Code) => {
        const borders = alpha3CodesToCountryNames[alpha3Code];
        borderingCountries.push(borders);
      });

      const countryDetail: CountryDetailViewModel = {
        flagUrl: country.flags.svg,
        name: country.name.common,
        nativeName: country.languages
          ? country.name.nativeName[Object.keys(country.languages)[0]].common
          : '',
        population: country.population,
        region: country.region,
        subRegion: country.subregion,
        capital: country.capital ? country.capital[0] : '',
        languageNames: country.languages
          ? Object.values(country.languages)
          : [],
        currencyNamesAndSymbols,
        callingCode: country.idd.root,
        alpha3Code: country.cca3,
        topLevelDomain: country.tld ? country.tld[0] : '',
        borderingCountries,
      };
      return countryDetail;
    }
  );
