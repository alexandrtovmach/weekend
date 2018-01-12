import { PhoneconfirmComponent } from './phoneconfirm/phoneconfirm.component';
import { Component, OnInit, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { FirebaseUISignInSuccess } from 'firebaseui';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public dialog: MatDialog, private router: Router, public afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.router.navigate(['/dashboard']);
      }
    });
  }

  ngOnInit() {
  }

  successCallback(signInSuccessData: FirebaseUISignInSuccess) {
    if (!firebase.auth().currentUser.phoneNumber) {
    // this.router.navigate(['/member']);
    let dialogRef = this.dialog.open(PhoneconfirmComponent, {
      width: '400px',
      disableClose: true
    });

  }else {
    this.router.navigate(['/dashboard']);
  }
}

}
