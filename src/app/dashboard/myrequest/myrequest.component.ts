import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { UserService } from '../../services/user.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { RequestedhousedtlComponent } from '../requestedhousedtl/requestedhousedtl.component';
@Component({
  selector: 'app-myrequest',
  templateUrl: './myrequest.component.html',
  styleUrls: ['./myrequest.component.css']
})
export class MyrequestComponent implements OnInit {
  uid: any;
  housedetail= [];
  constructor(private afAuth: AngularFireAuth, private userService: UserService,  private router: Router,
    public dialog: MatDialog) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
this.uid = user.uid;
this.userService.getBookingRequestIDs(this.uid)

.subscribe(usersnapshots => {
  if (usersnapshots) {
  usersnapshots.forEach(usersnapshot => {

   let tmpBookingDetl=[];
   let bookingRequestID = usersnapshot.requestId;
    tmpBookingDetl['bookingRequestId'] = bookingRequestID;
    this.userService.getBookingRequestInfoFromBookingID(bookingRequestID)
   .subscribe(bookingSnapshots => {
    this.housedetail.push(bookingSnapshots);


   });

  console.log(this.housedetail);
   });
}
});

      }else {
        this.router.navigate(['/login']);
      }
      });
  }

  ngOnInit() {
  }
  houseDtl(houseDtl: any): void {
    let dialogRef = this.dialog.open(RequestedhousedtlComponent, {
      width: '400px',
      data: { houseDetail: houseDtl}
    });

  }
}
