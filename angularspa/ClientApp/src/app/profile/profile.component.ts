import { Component, OnInit } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

const GRAPH_ENDPOINT_ME = 'https://graph.microsoft.com/v1.0/me';
const GRAPH_ENDPOINT_GROUPS = 'https://graph.microsoft.com/v1.0/me/memberOf';

@Component({
  selector: 'app-profile-component',
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {
  profile;
  msalService;
  httpClient;
  appenvironment;
  azgroups;
  
  accessToken;
  
  constructor(private authService: MsalService,private http: HttpClient) {
    this.msalService = authService;
    this.httpClient = http;
    this.appenvironment = environment;
  }
  
  ngOnInit() {
    this.getProfile();
    this.getMembership();
    this.accessToken = this.authService.getAccount().idToken;
    
  }

  getProfile() {
    this.httpClient.get(GRAPH_ENDPOINT_ME).subscribe(
      data => {
        this.profile = data;
      }
    )
  }

  getMembership() {
    this.httpClient.get(GRAPH_ENDPOINT_GROUPS).subscribe(
      data => {
        this.azgroups = data.value[0].id;
      }
    )
  }

  refresh() {
    this.getProfile();
    this.getMembership();
  }

  logout() {
    this.msalService.logout();
  }
}
