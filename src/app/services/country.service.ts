import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  constructor(private http: HttpClient) { }

  getCountries() {
    return this.http.get('https://restcountries.com/v3.1/lang/spanish').pipe(map((data: any) => {
      return data.map((country: any) => ({
        name: country.name.common,
        code: country.fifa
      }));
    }));
  }
}
