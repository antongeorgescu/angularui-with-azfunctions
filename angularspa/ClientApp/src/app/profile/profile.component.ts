import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { HttpClient } from '@angular/common/http';
import { MessagingService } from '../../app/messaging-service.service';
import { Subscription } from 'rxjs';

import { environment } from '../../environments/environment';

const GRAPH_ENDPOINT_ME = 'https://graph.microsoft.com/v1.0/me';
const GRAPH_ENDPOINT_GROUPS = 'https://graph.microsoft.com/v1.0/me/memberOf';

@Component({
  selector: 'app-profile-component',
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit, OnDestroy {
  profile;
  msalService;
  httpClient;
  appenvironment;
  azgroups;
  
  messages: any[] = [];
  subscription: Subscription;

  accessToken;
  
  constructor(
    private authService: MsalService,
    private http: HttpClient,
    private messageService: MessagingService) {
    this.msalService = authService;
    this.httpClient = http;
    this.appenvironment = environment;

    // subscribe to home component messages
    this.subscription = this.messageService.getMessage().subscribe(message => {
      if (message) {
        // assume that at this point the only message transacted is the one sent by AppComponent
        // containing the accessToken body
        this.messages.push(message);
      } else {
        // clear messages when empty message received
        this.messages = [];
      }
    });
  }
  
  ngOnInit() {
    this.getProfile();
    this.getMembership();

    this.accessToken = this.messages[this.messages.length - 1];
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
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
