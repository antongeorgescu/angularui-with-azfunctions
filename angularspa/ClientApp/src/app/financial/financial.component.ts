import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-financial',
  templateUrl: './financial.component.html',
  styleUrls: ['./financial.component.css']
})
export class FinancialComponent implements OnInit {
  bitcoinalldata;
  apiUrl: string;
  httpClient: HttpClient;

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.httpClient = http;
    this.apiUrl = baseUrl + 'api/financials';
  }

  ngOnInit() {
    this.getAllBitcoinRates();
  }

  getAllBitcoinRates() {
    //fetch(BITCOINALL_ENDPOINT)
    //  .then(
    //    data => {
    //      this.bitcoinalldata = data;
    //    });

    this.http.get(this.apiUrl + '/bitcoin/all').subscribe(
      data => {
        this.bitcoinalldata = data;
      });
  }
}
