import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { OAuthService } from 'angular-oauth2-oidc';
import { AuthConfig } from 'angular-oauth2-oidc';

import { BehaviorSubject, Observable } from 'rxjs';

export const authConfig: AuthConfig = {
  issuer: 'http://localhost:8080', // URL of your Authorization Server
  redirectUri: window.location.origin + '/home',
  clientId: 'oidc-client',
  responseType: 'code',
  scope: 'openid', // Adjust the scope based on your requirements
  showDebugInformation: true,
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private tokenEndpoint = 'http://localhost:8080/oauth2/token'; // Your token endpoint
  isLogedIn: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private oauthService: OAuthService, private http: HttpClient) {}

  private configureOAuthService(): void {
    this.oauthService.configure(authConfig);
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
    this.isLogedIn.next(false)
  }

  login(): void {
    this.configureOAuthService();
    this.oauthService.initLoginFlow();
  }

  logout(): void {
    this.oauthService.logOut();
    this.isLogedIn.next(false)
  }

  getAccessToken(): string {

    return this.oauthService.getAccessToken();
  }

  exchangeCodeForToken(code: string, pkceVerifier: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: 'Basic ' + btoa('oidc-client:secret'), // Base64 encode client credentials
    });

    const { clientId = '', redirectUri = '' } = authConfig;

    console.log(clientId, redirectUri);

    const params = new HttpParams()
      .set('code', code)
      .set('client_id', clientId)
      .set('grant_type', 'authorization_code')
      .set('redirect_uri', redirectUri) // Your redirect URI
      .set('code_verifier', pkceVerifier);

    return this.http.post(this.tokenEndpoint, params.toString(), { headers });
  }

  hasValidAccessToken(){
    return this.oauthService.hasValidAccessToken()
  }

  hasValidIdToken(){
    return this.oauthService.hasValidIdToken()
  }

}
