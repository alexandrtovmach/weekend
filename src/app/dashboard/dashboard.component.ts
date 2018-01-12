import { PhoneconfirmComponent } from '../login/phoneconfirm/phoneconfirm.component';
import { NgForm } from '@angular/forms/src/directives';
import { AngularFireAuth } from 'angularfire2/auth';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { SweetAlertService } from 'ngx-sweetalert2';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [SweetAlertService]
})
export class DashboardComponent implements OnInit {
  uid: string;
  profile: any;
  displayName: string;
  email: string;
  phonenumber: any;
  photoUrl: string;
  constructor(private afAuth: AngularFireAuth, private userService: UserService,
    private router: Router, private _swal2: SweetAlertService, public dialog: MatDialog) {
    }

  ngOnInit() {
      this.afAuth.authState.subscribe(user => {
      if (user) {
        if (!user.phoneNumber) {
          let dialogRef = this.dialog.open(PhoneconfirmComponent, {
            width: '400px',
            disableClose: true
          });
          dialogRef.afterClosed().subscribe(result => {
          });
        }else {
      this.uid = user.uid;
      this.profile = this.userService.getMemberProfile(this.uid) ;
      this.profile.subscribe(key => {
        if ( key == null) {
          this.displayName = user.displayName;
          this.email = user.email;
          this.phonenumber = user.phoneNumber;
          this.photoUrl = user.photoURL;
        }else {
this.displayName = key.name;
this.email = key.email;
this.phonenumber = user.phoneNumber;
this.photoUrl = key.photourl;
        }
      });
    }
      }else {
        this.router.navigate(['/home']);
      }
      });
  }
  updateBasicProfile(formData: NgForm) {
    const inputData = formData.value;
    console.log(inputData);
    this.userService.getUpdateLink(this.uid).update(inputData)
    .then( (success) => {
      this._swal2.success({ title: 'You have successfully updated your basic profile' });
      // this.nameSuccessMsg = 'You have successfully changed your profile name';
      }).catch((error) => {
        this._swal2.error({ title: 'Error while updating your profile' });
       // this.nameErrorMsg = 'Unable to update your profile name';
      });


  }
}
