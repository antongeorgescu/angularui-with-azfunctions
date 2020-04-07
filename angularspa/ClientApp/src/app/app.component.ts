import { Component, OnInit  } from '@angular/core';
import { MsalService, BroadcastService } from '@azure/msal-angular';
import { Logger, CryptoUtils } from 'msal';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  title = 'MSAL Angular - Sample App';
  isIframe = false;
  loggedIn = false;
  
  constructor(
    private broadcastService: BroadcastService,
    private authService: MsalService)
  { }

  ngOnInit() {
    this.isIframe = window !== window.parent && !window.opener;

    this.checkAccount();

    this.broadcastService.subscribe('msal:loginSuccess', () => {
      this.checkAccount();
    });

    this.authService.handleRedirectCallback((authError, response) => {
      if (authError) {
        console.error('Redirect Error: ', authError.errorMessage);
        return;
      }

      console.log('Redirect Success: ', response.accessToken);
    });

    this.authService.setLogger(new Logger((logLevel, message, piiEnabled) => {
      console.log('MSAL Logging: ', message);
    }, {
      correlationId: CryptoUtils.createNewGuid(),
      piiLoggingEnabled: false
    }));
  }

  checkAccount() {
    this.loggedIn = !!this.authService.getAccount();
  }

  login() {
    const isIE = window.navigator.userAgent.indexOf('MSIE ') > -1 || window.navigator.userAgent.indexOf('Trident/') > -1;
    
    if (isIE) {
      this.authService.loginRedirect();
    } else {
      
      this.authService.loginPopup().then(function (loginResponse) {
        //login success
        let idToken = loginResponse.idToken;
        console.log(idToken);
      }).catch(function (error) {
        //login failure
        console.log(error);
      });
    }
  }

  logout() {
    this.authService.logout();
  }
}
