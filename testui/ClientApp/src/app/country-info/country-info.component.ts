import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient, HttpParams  } from '@angular/common/http';

@Component({
  selector: 'app-country-info',
  templateUrl: './country-info.component.html'
})
export class CountryInfoComponent {

  public countryInfo: CountryInfo;
  
  httpClient: HttpClient;
  apiUrl: string;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {

    this.httpClient = http;
    this.apiUrl = baseUrl + 'countryinfo';

    let qparams = new HttpParams().set('countryName', "Canada");

    this.httpClient.get<CountryInfo>(this.apiUrl, { params: qparams }).subscribe(result => {
      this.countryInfo = result;
    }, error => console.error(error));
  }

  getCountryInfo(country) {
    let qparams = new HttpParams().set('countryName', country);

    this.httpClient.get<CountryInfo>(this.apiUrl, { params: qparams }).subscribe(result => {
      this.countryInfo = result;
    }, error => console.error(error));
  }
}

interface CountryInfo {
  name: string;
  capital: number;
  population: number;
  area: string;
}
