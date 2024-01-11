import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isLogedIn: boolean = true;
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.isLogedIn.subscribe((res) => {
      console.log(res);
      this.isLogedIn = res;
    });
  }
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
    console.log(this.isLogedIn);
  }
}
