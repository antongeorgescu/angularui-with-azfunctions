import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-financial',
  templateUrl: './financial.component.html',
  styleUrls: ['./financial.component.css']
})
export class FinancialComponent implements OnInit {
  
  apiUrl: string;
  
  public bitcoinrecords: BitcoinRate[];

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
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

    this.http.get<BitcoinRate[]>(this.apiUrl + '/bitcoin/all').subscribe(
      data => {
        this.bitcoinrecords = data;
      }, error => console.error(error));
  }
}

interface BitcoinRate {
  buy: number;
  currency: string;
  sell: number;
  symbol: string;
}

