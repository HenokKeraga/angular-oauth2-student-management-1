import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { OAuthStorage, TokenResponse } from 'angular-oauth2-oidc';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private oauthStorage: OAuthStorage
  ) {}
  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      const code = params['code'];
      console.log(code);
      const pkceVerifier = this.oauthStorage.getItem('PKCE_verifier');

      if (code && pkceVerifier) {
        this.authService.exchangeCodeForToken(code, pkceVerifier).subscribe(
          (tokenResponse: TokenResponse) => {
            console.log('Access Token:', tokenResponse.access_token);
            console.log('token', tokenResponse);
            // Handle the access token as needed

            this.oauthStorage.setItem(
              'access_token',
              tokenResponse.access_token
            );
            this.oauthStorage.setItem('id_token', tokenResponse.id_token);

            this.authService.isLogedIn.next(true);

            this.router.navigate(['/students']);
          },
          (error) => {
            console.error('Error exchanging code for token:', error);
            // Handle error
          }
        );
      } else {
        this.authService.isLogedIn.next(false);
        this.router.navigate(['/login']);
      }
    });
  }
}
