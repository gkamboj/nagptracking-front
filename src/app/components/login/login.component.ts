import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private route: Router
    ) { }

  ngOnInit() {
    if(sessionStorage.getItem('userType')==='admin'){
      this.route.navigateByUrl("/admin");
    } else if(sessionStorage.getItem('userType')==='applicant'){
      this.route.navigateByUrl("/applicant");
    }
  }

}
