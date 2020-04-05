# Angular SPA with MSAL and Azure Functions

Microsoft Authentication Library (MSAL) enables developers to acquire tokens from the Microsoft identity platform endpoint in order to access secured Web APIs. These Web APIs can be the Microsoft Graph, other Microsoft APIS, third-party Web APIs, or your own Web API. MSAL is available for .NET, JavaScript, Android, and iOS, which support many different application architectures and platforms. More details can be found under [Overview of Microsoft Authentication Library (MSAL)](https://docs.microsoft.com/en-us/azure/active-directory/develop/msal-overview)

### Basic Design
In case of troubles with generating MS Graph API access token follow the instructions under [Response type ‘token’ is not enabled for the application](https://community.dynamics.com/crm/b/akmscrmblog/posts/response-type-token-is-not-enabled-for-the-application)
1. Select the Configure tab of your application’s entry in the Azure Management Portal.
2. Using the Manage Manifest button in the drawer, download the manifest file for the application and save it to your computer.
3. Open the manifest file with a text editor. Search for the oauth2AllowImplicitFlow property. By default it is set to false; change it to true and save the file.

### Credits
The code for Azure Active Directory authentication follows the instructions given under [Sign in users and call the Microsoft Graph API from an Angular single-page application (SPA)](https://docs.microsoft.com/en-us/azure/active-directory/develop/tutorial-v2-angular)

I also have used the code from the sample application under (https://github.com/Azure-Samples/active-directory-javascript-singlepageapp-angular) This sample demonstrates how to use MSAL Angular to login, logout, protect a route, and acquire an access token for a protected resource such as Microsoft Graph.

For getting started with MSAL library for JavaScript you can browse github project under [MSAL Basics](https://github.com/AzureAD/microsoft-authentication-library-for-js/wiki/MSAL-basics)
