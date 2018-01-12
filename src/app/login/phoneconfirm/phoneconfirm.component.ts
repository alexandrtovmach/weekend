import { Http } from '@angular/http';
import { setTimeout } from 'timers';
import { UserService } from './../../services/user.service';

import { AuthService } from './../../services/auth.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { NgForm } from '@angular/forms/src/directives';
import { countrylist } from './../../countries';

import { Component, OnInit, Inject, AfterViewInit} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Router } from '@angular/router';
import * as firebase from 'firebase';


@Component({
  selector: 'app-phoneconfirm',
  templateUrl: './phoneconfirm.component.html',
  styleUrls: ['./phoneconfirm.component.css']
})
export class PhoneconfirmComponent implements OnInit, AfterViewInit {
  verificationId: string;
  errorResponse: string;
  windowRef: any;
  countries= countrylist;
ShowProgress= false;
showform= true;
phoneNumber: string;
phone: any;
countryCode: any;

currentUser = firebase.auth().currentUser;
showResend= false;
  constructor(public dialog: MatDialog, public dialogRef: MatDialogRef<PhoneconfirmComponent>,
    @Inject(MAT_DIALOG_DATA)  public data: any, private router: Router, private afAuth: AngularFireAuth,
    private authService: AuthService, private userService: UserService,
  private http: Http) {

      this.http.get('https://ipinfo.io')
      .map(response => response.json())
      .subscribe(response => {
       const output = this.countries.filter(pp => pp.code === response.country);
 this.countryCode = output[0]['dial_code'];
      });


     }

  ngOnInit() {
  }
  ngAfterViewInit() {
    this.windowRef = this.authService.WindowRef;
  }

phoneLoginProcess(form: NgForm) {
  this.ShowProgress = true;

  const countryCode = form.value.countryCode;
  this.countryCode = form.value.countryCode;
  const phoneNumber = form.value.number;
  this.phone = form.value.number;
  const finalNumber = countryCode + phoneNumber;
this.phoneNumber = finalNumber;

  const appVerifire  = new firebase.auth.RecaptchaVerifier('btn-code-verification', {size: 'invisible'});
  this.currentUser.linkWithPhoneNumber(this.phoneNumber, appVerifire)
  .then( finalResult => {
    this.windowRef.confirmationResult = finalResult;
    this.verificationId = finalResult.verificationId;
    this.ShowProgress = false;
    this.showform = false;
    this.run();
  })
 .catch(error => {
    this.errorResponse = error.message;
  });
      }
      tryAnother() {
this.showform = true;
this.verificationId = null;
this.showResend = false;
this.errorResponse = null;
      }
      verifyLoginCode(form: NgForm) {
        this.ShowProgress = true;
        const verificationCode = form.value.confirmationcode;
       this.windowRef.confirmationResult.confirm(verificationCode)
    .then(result => {
      this.userService.getUpdateLink(this.currentUser.uid).update({phoneNumber: this.phoneNumber});
      this.dialogRef.close();
      this.ShowProgress = false;

    }).catch(error => {
          this.errorResponse = error.message;
          this.afAuth.auth.signOut();
          this.ShowProgress = false;
        });
            }
            // onNoClick(): void {
            //   this.dialogRef.close();
            //  }

            public run() {
              let i = 0;
              let interval = setInterval(() => {
                  if (++i === 4) {
                      clearInterval(interval);
                  }else {
                      this.timer();
                  }
              }, 90000);
          }

          public timer() {
             this.showResend = true;
          }
          goToHome() {
            this.dialogRef.close();
            this.router.navigate(['/home']);
          }
}
