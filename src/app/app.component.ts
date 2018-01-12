import { Observable } from 'rxjs/Rx';
import { UserService } from './services/user.service';
import { Router } from '@angular/router';
import { House } from './services/house';
import { Component } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  photoUrl: string;
  profile: any;
  loginstatus: boolean;
  profileName: string;
  constructor(public afAuth: AngularFireAuth, private router: Router, private userService: UserService,
    private translate: TranslateService) {
      translate.addLangs(['en', 'ar']);
      translate.setDefaultLang('ar');
      translate.use('ar');

    this.afAuth.authState.subscribe(user => {
      if (user) {

      this.profile = this.userService.getMemberProfile(user.uid) ;
      this.profile.subscribe(key => {
if (key != null) {
this.photoUrl = key.photourl;
this.loginstatus = true;
this.profileName = user.displayName;
}else {
  this.photoUrl = user.photoURL;
  this.loginstatus = true;
  this.profileName = user.displayName;
}

      });
    } else {
      this.loginstatus = false;
    }
      });
  }
  // openLogin(): void {
  //   this.afAuth.authState.subscribe(user => {
  //     if (user) {
  //    // this.router.navigate(['/dashboard']);
  //     }else {
  //       let dialogRef = this.dialog.open(LoginComponent, {
  //         width: '400px'
  //       });
  //       dialogRef.afterClosed().subscribe(result => {
  //         this.afAuth.authState.subscribe(user1 => {
  //           if (user1) {
  //             this.loginstatus = true;
  //           }else {
  //             this.loginstatus = false;
  //           }
  //         });
  //       });
  //     }
  //     });
  // }
  logout() {
 this.afAuth.auth.signOut();
 this.router.navigate(['/home']);

      }
}
