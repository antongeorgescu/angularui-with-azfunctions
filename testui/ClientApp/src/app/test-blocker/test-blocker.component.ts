import { Component, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GlobalVariable } from '../global';

const httpOptions = {
  headers: new HttpHeaders({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'
  })
};

@Component({
  selector: 'app-test-blocker',
  templateUrl: './test-blocker.component.html'
})
export class TestBlockerComponent {
  public sysDate: string;
  public sysStatus: string;

  private httpClient: HttpClient;
  private healthCheckUrl: string;
  
  constructor(http: HttpClient) {
    this.httpClient = http;
    this.healthCheckUrl = GlobalVariable.HEALTHCHECK_URL; //baseUrl + 'healthcheck';
    
    http.get<SystemStatus>(this.healthCheckUrl).subscribe(result => {
      this.sysStatus = result.mainframeStatus;
      this.sysDate = result.date;
      console.log(`call to ${this.healthCheckUrl} returned status ${this.sysStatus}`);
    }, error => console.error(error));
  }

  public checkSystemHealth() {
    
    this.httpClient.get<SystemStatus>(this.healthCheckUrl).subscribe(result => {
      this.sysStatus = result.mainframeStatus;
      this.sysDate = result.date;
      console.log(`call to ${this.healthCheckUrl} returned status ${this.sysStatus}`);
    }, error => console.error(error));
  }
}

interface SystemStatus {
  date: string;
  mainframeStatus: string;
}
