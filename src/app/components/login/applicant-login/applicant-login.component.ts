import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-applicant-login',
  templateUrl: './applicant-login.component.html',
  styleUrls: ['./applicant-login.component.css']
})
export class ApplicantLoginComponent implements OnInit {

  msgForm: FormGroup;
  constructor(public fb: FormBuilder,
    private loginService: LoginService,
    private router: Router,
    private snackBar: MatSnackBar) { }
  x: any;
  userType: any;
  ngOnInit() {
    this.msgForm = this.fb.group({
      'email': ['', [Validators.email, Validators.required]],
      'password': ['', Validators.required],
    });

  }
  onSubmit() {
    this.loginService.loginApplicant(this.msgForm.value)
      .subscribe(data => {
        this.x = data;
          sessionStorage.setItem("userType", "applicant");
          sessionStorage.setItem("username", this.x.data.name);
          sessionStorage.setItem("id",this.x.data.userId);
          this.router.navigateByUrl("/applicant");
      }, err => {
        this.snackBar.open(err.error.data,"Cancel",{
          duration: 3500,
          panelClass: "btn-danger"
        });
      })
    this.msgForm.reset();
  }

}
