import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  msgForm: FormGroup;
  constructor( public fb: FormBuilder,
    private loginService: LoginService,
    private router: Router,
    private snackBar: MatSnackBar
    ) {}
x: any;
  ngOnInit(){
    this.msgForm = this.fb.group({
      'email': ['', [Validators.email,Validators.required]],
      'password': ['', Validators.required],
    });

  }
  onSubmit() {
    this.loginService.loginAdmin(this.msgForm.value)
    .subscribe(data=>{
      this.x = data;
        sessionStorage.setItem("userType",this.x.data.userType);
        sessionStorage.setItem("username",this.x.data.name);
        sessionStorage.setItem("id",this.x.data.userId);
        sessionStorage.setItem("email", this.x.data.email);
        sessionStorage.setItem("contactNo", this.x.data.contactNo);
        this.router.navigateByUrl("/admin");
    },err=>{
      this.snackBar.open(err.error.data,"Cancel",{
        duration: 3500,
        panelClass: "btn-danger"
      });
    })
    this.msgForm.reset();
  }
}
