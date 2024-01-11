import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {


  constructor(private authService:AuthService){

  }


  ngOnInit(): void {

    console.log('validate .... ')
    
    console.log(this.authService.hasValidAccessToken())
    console.log(this.authService.hasValidIdToken())
  }

}
