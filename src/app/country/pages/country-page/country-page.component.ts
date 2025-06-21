import { Component, inject } from '@angular/core';
import { NotFoundComponent } from '../../../shared/components/not-found/not-found.component';
import { CountryInformationComponent } from './country-information/country-information.component';
import { ActivatedRoute } from '@angular/router';
import { rxResource } from '@angular/core/rxjs-interop';
import { CountryService } from '../../services/country.service';

@Component({
  selector: 'app-country-page',
  imports: [NotFoundComponent, CountryInformationComponent],
  templateUrl: './country-page.component.html',
  styleUrl: './country-page.component.css',
})
export class CountryPageComponent {
  countryCode = inject(ActivatedRoute).snapshot.params['code'];
  countryService = inject(CountryService);

  countryResource = rxResource({
    request: () => ({ code: this.countryCode }),
    loader: ({ request }) => {
      return this.countryService.searchCountryByAlphaCode(request.code);
    },
  });
}
