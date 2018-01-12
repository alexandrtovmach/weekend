import { FavhousesdtlComponent } from './../favhousesdtl/favhousesdtl.component';
import { MatDialog } from '@angular/material';
import { HouseService } from './../../services/house.service';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-myfavhouse',
  templateUrl: './myfavhouse.component.html',
  styleUrls: ['./myfavhouse.component.css']
})
export class MyfavhouseComponent implements OnInit {
  uid: any;
  housedetail= [];
  constructor(private afAuth: AngularFireAuth, private router: Router, private userService: UserService,
    private housesService: HouseService, public dialog: MatDialog) { }

  ngOnInit() {
    this.afAuth.authState.subscribe(user => {
      if (user) {
this.uid = user.uid;
this.userService.getLikedHouseID(this.uid)
.subscribe(usersnapshots => {
usersnapshots.forEach(houseids => {
  let houseId = houseids['houseId'];

  this.housesService.IndividualHouseDtlForProfile(houseId)
  .subscribe(houseDtls => {
    this.housedetail.push(houseDtls);
  });
});
});

      }else {
        this.router.navigate(['/home']);
      }
      });
  }
  houseDtl(houseDtl: any): void {
    let dialogRef = this.dialog.open(FavhousesdtlComponent, {
      width: '400px',
      data: { houseDetail: houseDtl}
    });

  }
}
