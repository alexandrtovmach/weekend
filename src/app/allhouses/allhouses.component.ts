import { UserService } from './../services/user.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NgxCarousel } from 'ngx-carousel';
import { House } from '../services/house';
import { HouseService } from '../services/house.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { SearchboxComponent } from '../home/searchbox/searchbox.component';
import { MapviewComponent } from './mapview/mapview.component';
import { NgForm } from '@angular/forms/src/directives';
import { AngularFireAuth } from 'angularfire2/auth';
import { SweetAlertService } from 'ngx-sweetalert2';
@Component({
  selector: 'app-allhouses',
  templateUrl: './allhouses.component.html',
  styleUrls: ['./allhouses.component.css'],
  providers: [SweetAlertService]
})
export class AllhousesComponent implements OnInit {
  public carouselOne: NgxCarousel;
  allHouses: House[];
  showSpinner= true;
  filtered: Array<any> = [];
  swimmingpool: string;
  torent: string;
  whichline: string;
  housetype: string;
  toRentSelected= 'all';
  whichlineSelected= 'all';
  housetypeSelected= 'all';
  constructor(private housesService: HouseService,
    private router: Router, public dialog: MatDialog, private afAuth: AngularFireAuth,
  private userService: UserService, private _swal2: SweetAlertService) { }

  ngOnInit() {
     // Fetch house detail from firebase
     let finalData = [];
     this.housesService.findAllHouses()
     .subscribe(snapshots => {
     snapshots.forEach(snapshot => {
       if (snapshot['Bool'] === 'true') {
       finalData.push(this.housesService.prepareFinalData(snapshot));
       }
     });
     this.filtered = this.allHouses = finalData;
     this.showSpinner = false;
     });
     this.carouselOne = {
       grid: {xs: 1, sm: 1, md: 1, lg: 1, all: 0},
       slide: 1,
       speed: 400,
       interval: 4000,
       point: {
         visible: true
       },
       load: 2,
       touch: true,
       loop: false,
       custom: 'banner'
     };
  }
  goToHouseDetail(houseId) {
    this.router.navigate(['/house/' + houseId]);
    }
    search(): void {
      let dialogRef = this.dialog.open(SearchboxComponent, {
        width: '250px'
      });
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
      });
    }
    mapview(allHouses: any): void {
      let dialogRef = this.dialog.open(MapviewComponent, {
        width: '100%',
        height: '100vh',
        data: {houses: allHouses}
      });
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
      });
    }
    onSearch(form: NgForm) {
      this.showSpinner = true;
      const value = form.value;
      if (value.swimmingpool === '' || value.swimmingpool === false) {
      this.swimmingpool = 'false';
      }else {
        this.swimmingpool = 'true';
      }
      if (value.torent === 'all') {
      this.torent = '';
      }else {
      this.torent = value.torent;
      }
      if (value.whichline === 'all') {
      this.whichline = '';
      }else {
      this.whichline = value.whichline;
      }
      if (value.housetype === 'all') {
      this.housetype = '';
      }else {
      this.housetype = value.housetype;
      }
      let finalData = [];
      this.housesService.findAllHouses()
      .subscribe(snapshots => {
      snapshots.forEach(snapshot => {
        if (snapshot['Bool'] === 'true') {
        finalData.push(this.housesService.prepareFinalData(snapshot));
        }
      });
      this.filtered = finalData;
      if (value.place !== '') {
      this.filtered = this.filtered.filter(pp => pp.location === value.place);
      }
      if (value.swimmingpool !== '') {
      this.filtered = this.filtered.filter(pp => pp.privateSwimmingPool === this.swimmingpool);
      }
      if (this.torent !== '') {
      this.filtered = this.filtered.filter(pp => pp.typeOfPeopleAllowedToRent === this.torent);
      }
      if (this.whichline !== '') {
      this.filtered = this.filtered.filter(pp => pp.whichLine === this.whichline);
      }
      if (this.housetype !== '') {
      this.filtered = this.filtered.filter(pp => pp.houseType === this.housetype);
      }
      });
      setTimeout( () => {
        this.showSpinner = false;
              }, 1000);
        }
        addLike(houseId: string) {
          this.afAuth.authState.subscribe(user => {
            if (user) {
          this.userService.getMemberLikeList( user.uid)
          .push({houseId: houseId})
          .then( () => {
            this._swal2.success({ title: 'Saved successfully' });
          })
          .catch( (error) => {
            console.log(error);
          });
        } else {
          this._swal2.error({ title: 'Please login first' });
        }
        });
        }
}
