import { Component, OnInit } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { HttpClient } from '@angular/common/http';

const GRAPH_ENDPOINT = 'https://graph.microsoft.com/v1.0/me';

@Component({
  selector: 'app-profile-component',
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {
  profile;
  msalService;
  httpClient;
  constructor(private authService: MsalService, private http: HttpClient) {
    this.msalService = authService;
    this.httpClient = http;
  }

  ngOnInit() {
    this.getProfile();
  }

  getProfile() {
    this.httpClient.get(GRAPH_ENDPOINT).subscribe(
      data => {
        this.profile = data;
      }
    )
  }

  logout() {
    this.msalService.logout();
  }
}
