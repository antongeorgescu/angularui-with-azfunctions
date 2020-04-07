import { Component, OnInit  } from '@angular/core';
import { MsalService, BroadcastService } from '@azure/msal-angular';
import { Logger, CryptoUtils } from 'msal';
import { MessagingService } from '../app/messaging-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  title = 'MSAL Angular - Sample App';
  isIframe = false;
  loggedIn = false;
  sharedGlobals;
  static MessageService: MessagingService;

  constructor(
    private broadcastService: BroadcastService,
    private authService: MsalService,
    private messageService: MessagingService)
  {

  }

  ngOnInit() {
    this.isIframe = window !== window.parent && !window.opener;

    AppComponent.MessageService = this.messageService;

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
        //if (!AppComponent.checkUserInRole(idToken))
        //  throw new Error("User is not granted the role to use this application");

        // update the consumers with user app roles
        AppComponent.MessageService.sendMessage(idToken);
        console.log(idToken);
      }).catch(function (error) {
        //login failure
        console.log(error);
      });
    }
  }

  static checkUserInRole(token) {
    if (token.claims.roles == undefined)
      return false;
    let inRole = token.claims.roles[0];
    if (!(inRole == "AtheromFan"))
      return false;
    return true;
  }

  logout() {
    this.authService.logout();
  }
}
