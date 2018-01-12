
import { AngularFireDatabase } from 'angularfire2/database';
import { NgForm } from '@angular/forms/src/directives';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { Component, OnInit, Input, Inject } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { SweetAlertService } from 'ngx-sweetalert2';
import { FileHolder } from 'angular2-image-upload';
import * as firebase from 'firebase/app';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

interface Image {
  path: string;
  filename: string;
  downloadURL?: string;
  $key?: string;
}
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [SweetAlertService]
})
export class ProfileComponent implements OnInit {


  uid: string;
  profile: any;
  photoUrl: string;
  photoIdUrl: string;
  governmentIdUrl: string;
  drivingLicenseUrl: string;
  block: any;
  floors: any;
  house: any;
  street: any;
  surub= '';
  unit: any;
  constructor(private afAuth: AngularFireAuth,  private userService: UserService, private router: Router,
    private _swal2: SweetAlertService, public af: AngularFireDatabase, public dialog: MatDialog) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
this.uid = user.uid;
this.profile = this.userService.getMemberProfile(this.uid) ;
this.profile.subscribe(key => {
  this.photoUrl = key.photourl;
  this.photoIdUrl = key.photoID;
  this.drivingLicenseUrl = key.drivingLicense;
  this.governmentIdUrl = key.governmentID;
  this.block = key.block;
  this.floors = key.floors;
  this.house = key.house;
  this.street = key.street;
  this.surub = key.surub;
  this.unit = key.unit;
        });
      }else {
this.router.navigate(['/home']);
      }
    });
  }

  ngOnInit() {
  }
  updateProfile(form: NgForm) {
    this.userService.getUpdateLink(this.uid).update(form.value)
    .then( () => {
      this._swal2.success({ title: 'Successfully Updated' });
    }).catch((error) => {
      this._swal2.error({ title: 'Unable To Updated' });
    });
      }


      changeProfilePicture(): void {
        let dialogRef = this.dialog.open(DialogOverviewExampleDialogComponent, {
          width: '250px'
        });
      }
      changePhotoId(): void {
        let dialogRef = this.dialog.open(DialogUploadPhotoIdComponent, {
          width: '250px'
        });
      }
      changeGovermentId(): void {
        let dialogRef = this.dialog.open(DialogUploadGovernmentIdComponent, {
          width: '250px'
        });
      }
      changeDrivingLicense(): void {
        let dialogRef = this.dialog.open(DialogUploadDrivingLicenseComponent, {
          width: '250px'
        });
      }
    }





/////////////////////////////////////////////////////////////////////
//////////////////// Dialog box for upload profile picture //////////
/////////////////////////////////////////////////////////////////////
@Component({
  selector: 'app-dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
})
export class DialogOverviewExampleDialogComponent  {
  @Input() folder = 'No5tha/profilePicture';
  filename: string;
  uploaded= 0;
  constructor(
    public dialogRef: MatDialogRef<ProfileComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private router: Router, public af: AngularFireDatabase) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
  onUploadFinished(file: FileHolder) {
    let storageRef = firebase.storage().ref();
    let success = false;
    const uid = firebase.auth().currentUser.uid;
    this.filename = file.file.name;
    let router = this.router;
    let folder = this.folder;
    let path = `/${this.folder}/${this.filename}`;
    let iRef = storageRef.child(path).put(file.file);
    iRef.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {
        this.uploaded = Math.floor(this.uploaded = (iRef.snapshot.bytesTransferred / iRef.snapshot.totalBytes) * 100);
      },
      (error) => {
        console.log(error);
      },
      () => {
        this.af.object('No5tha/userProfile/' + uid + '/').update({photourl: iRef.snapshot.downloadURL});
        if ( this.uploaded === 100) {
        this.dialogRef.close();
        }
      });
  }

}





/////////////////////////////////////////////////////////////////////
//////////////////// Dialog box for Photo ID //////////
/////////////////////////////////////////////////////////////////////

@Component({
  selector: 'app-upload-photoid',
  templateUrl: 'uploadphotoid.html',
})
export class DialogUploadPhotoIdComponent  {
  @Input() folder = 'No5tha/IDPhotos';
  filename: string;
  uploaded= 0;
  constructor(
    public dialogRef: MatDialogRef<DialogUploadPhotoIdComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private router: Router, public af: AngularFireDatabase) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
  onUploadFinished(file: FileHolder) {
    let storageRef = firebase.storage().ref();
    let success = false;
    const uid = firebase.auth().currentUser.uid;
    this.filename = file.file.name;
    let router = this.router;
    let folder = this.folder;
    let path = `/${this.folder}/${this.filename}`;
    let iRef = storageRef.child(path).put(file.file);
    iRef.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {
        this.uploaded =  this.uploaded = (iRef.snapshot.bytesTransferred / iRef.snapshot.totalBytes) * 100;
      },
      (error) => {
        console.log(error);
      },
      () => {
        this.af.object('No5tha/userProfile/' + uid + '/').update({photoID: iRef.snapshot.downloadURL});
        if ( this.uploaded === 100) {
          this.dialogRef.close();
          }
      });
  }

}


/////////////////////////////////////////////////////////////////////
//////////////////// Dialog box for Upload Government Id //////////
/////////////////////////////////////////////////////////////////////

@Component({
  selector: 'app-upload-governmantid',
  templateUrl: 'uploadgovernmentid.html',
})
export class DialogUploadGovernmentIdComponent  {
  @Input() folder = 'No5tha/IDPhotos';
  filename: string;
  uploaded= 0;
  constructor(
    public dialogRef: MatDialogRef<DialogUploadGovernmentIdComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private router: Router, public af: AngularFireDatabase) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
  onUploadFinished(file: FileHolder) {
    let storageRef = firebase.storage().ref();
    let success = false;
    const uid = firebase.auth().currentUser.uid;
    this.filename = file.file.name;
    let router = this.router;
    let folder = this.folder;
    let path = `/${this.folder}/${this.filename}`;
    let iRef = storageRef.child(path).put(file.file);
    iRef.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {
        this.uploaded =  this.uploaded = (iRef.snapshot.bytesTransferred / iRef.snapshot.totalBytes) * 100;
      },
      (error) => {
        console.log(error);
      },
      () => {
        this.af.object('No5tha/userProfile/' + uid + '/').update({governmentID: iRef.snapshot.downloadURL});
        if ( this.uploaded === 100) {
          this.dialogRef.close();
          }
      });
  }

}

/////////////////////////////////////////////////////////////////////
//////////////////// Dialog box for Upload Driving License //////////
/////////////////////////////////////////////////////////////////////

@Component({
  selector: 'app-upload-drivinglicense',
  templateUrl: 'uploaddrivinglicense.html',
})
export class DialogUploadDrivingLicenseComponent  {
  @Input() folder = 'No5tha/IDPhotos';
  filename: string;
  uploaded= 0;
  constructor(
    public dialogRef: MatDialogRef<DialogUploadDrivingLicenseComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private router: Router, public af: AngularFireDatabase) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
  onUploadFinished(file: FileHolder) {
    let storageRef = firebase.storage().ref();
    let success = false;
    const uid = firebase.auth().currentUser.uid;
    this.filename = file.file.name;
    let router = this.router;
    let folder = this.folder;
    let path = `/${this.folder}/${this.filename}`;
    let iRef = storageRef.child(path).put(file.file);
    iRef.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {
        this.uploaded =  this.uploaded = (iRef.snapshot.bytesTransferred / iRef.snapshot.totalBytes) * 100;
      },
      (error) => {
        console.log(error);
      },
      () => {
        this.af.object('No5tha/userProfile/' + uid + '/').update({drivingLicense: iRef.snapshot.downloadURL});
        if ( this.uploaded === 100) {
          this.dialogRef.close();
          }
      });
  }

}

