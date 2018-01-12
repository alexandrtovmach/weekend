import { SearchboxComponent } from '../home/searchbox/searchbox.component';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { HouseService } from '../services/house.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { MapviewComponent } from '../allhouses/mapview/mapview.component';
import { NgxCarousel } from 'ngx-carousel';
import { AngularFireAuth } from 'angularfire2/auth';
import { SweetAlertService } from 'ngx-sweetalert2';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router/';
@Component({
  selector: 'app-searchresult',
  templateUrl: './searchresult.component.html',
  styleUrls: ['./searchresult.component.css'],
  providers: [SweetAlertService]
})
export class SearchresultComponent implements OnInit, AfterContentChecked {
searchParameters: any;
torent: string;
whichline: string;
housetype: string;
filtered: Array<any> = [];
showSpinner= true;
public carouselOne: NgxCarousel;
  constructor(private route: ActivatedRoute, private housesService: HouseService, public dialog: MatDialog,
    private afAuth: AngularFireAuth,
    private userService: UserService  , private _swal2: SweetAlertService, private router: Router) {
   }
ngAfterContentChecked() {

}
  ngOnInit() {
    this.searchParameters = this.route.snapshot.params;
    this.searchEngine();
  }
  searchEngine() {

    let finalData = [];
    if ( this.searchParameters['torent'] === 'all') {
      this.torent = '';
      }else {
      this.torent = this.searchParameters['torent'];
      }
      if (this.searchParameters['whichline'] === 'all') {
        this.whichline = '';
        }else {
        this.whichline = this.searchParameters['whichline'];
        }
        if (this.searchParameters['housetype'] === 'all') {
        this.housetype = '';
        }else {
        this.housetype = this.searchParameters['housetype'];
        }

        this.housesService.findAllHouses()
        .subscribe(snapshots => {
        snapshots.forEach(snapshot => {
          if (snapshot['Bool'] === 'true') {
          finalData.push(this.housesService.prepareFinalData(snapshot));
          }
        });
        this.filtered = finalData;
        if (this.searchParameters['where'] !== 'anywhere') {
        this.filtered = this.filtered.filter(pp => pp.location === this.searchParameters['where']);
        }
        if (this.searchParameters['swimmingpool'] !== '') {
        this.filtered = this.filtered.filter(pp => pp.privateSwimmingPool === this.searchParameters['swimmingpool']);
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
      this.searchParameters = result;
      this.searchEngine();
      console.log(result);
    });
  }
  mapview(allHouses: any): void {
    let dialogRef = this.dialog.open(MapviewComponent, {
      width: '100%',
      height: '100vh',
      data: {houses: allHouses}
    });
    dialogRef.afterClosed().subscribe(result => {
     console.log(result);
    });
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
