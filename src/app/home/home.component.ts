import { NgForm } from '@angular/forms/src/directives';
import { SearchboxComponent } from './searchbox/searchbox.component';
import { Router } from '@angular/router';
import { HouseService } from './../services/house.service';
import { House } from './../services/house';
import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import {MatDialog} from '@angular/material';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
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
    private router: Router, public dialog: MatDialog) { }

  ngOnInit() {
    let finalData = [];
    this.housesService.findAllHouses().subscribe(houses => {
      houses.forEach(houseInfo => {
        if (houseInfo['Bool'] === 'true') {

                finalData.push(this.housesService.prepareFinalData(houseInfo));
                }
      });
      this.filtered = this.allHouses = finalData;
      this.showSpinner = false;
    });
  }
  goToHouseDetail(houseId) {
    this.router.navigate(['/house/' + houseId]);
    }
    search(): void {
      let dialogRef = this.dialog.open(SearchboxComponent, {
        width: '250px'
      });
      dialogRef.afterClosed().subscribe(result => {
console.log(result);
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
}
