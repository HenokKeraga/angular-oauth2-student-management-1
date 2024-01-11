import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent  implements OnInit{
  isLogedIn: boolean = true;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.isLogedIn.subscribe((res) => {
      console.log(res);
      this.isLogedIn = res;
    });
  }
  login() {
    console.log('login ...... ');
    this.authService.login();
    console.log(this.isLogedIn);
  }
}
