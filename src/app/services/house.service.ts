import { any } from 'codelyzer/util/function';
import { House } from './house';
import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class HouseService {


  constructor(public db: AngularFireDatabase) { }

  findIndHouseBookingDetail(houseId: string): any {
    return this.db.object<House>('No5tha/BookingDatabases/' + houseId + '/' + this.generateDateLink()).valueChanges();
    }


  findIndHouseDetail(houseId: string): any {
    return this.db.object('No5tha/housesData/public/' + houseId).valueChanges();
    }
  findAllHouses() {
   return this.db.list<House>('No5tha/housesData/public').valueChanges();
  }
  prepareFinalData(snapshot: any) {

    const internalData = [];
    const bookingData = [];
      internalData['Bool'] = snapshot['Bool'];
      internalData['HouseNumber'] = snapshot['HouseNumber'];
      internalData['Latitude'] = snapshot['Latitude'];
      internalData['Longitude'] = snapshot['Longitude'];
      internalData['basement'] = snapshot['basement'];
      internalData['descruption'] = snapshot['descruption'];
      internalData['featuers'] = snapshot['featuers'];
      internalData['floors'] = snapshot['floors'];
      internalData['houseId'] = snapshot['houseId'];
      internalData['houseName'] = snapshot['houseName'];
      internalData['houseType'] = snapshot['houseType'];
      internalData['location'] = snapshot['location'];
      internalData['masterRooms'] = snapshot['masterRooms'];
      internalData['photosGalaryURLs'] = snapshot['photosGalaryURLs'];
      internalData['privateSwimmingPool'] = snapshot['privateSwimmingPool'];
      internalData['rentrules'] = snapshot['rentrules'];
      internalData['rooms'] = snapshot['rooms'];
      internalData['salon'] = snapshot['salon'];
      internalData['toilets'] = snapshot['toilets'];
      internalData['typeOfPeopleAllowedToRent'] = snapshot['typeOfPeopleAllowedToRent'];
      internalData['whichLine'] = snapshot['whichLine'];
      this.db.object<House>('No5tha/BookingDatabases/' + snapshot['houseId'] + '/' + this.generateDateLink()).valueChanges()
      .subscribe( bookingsnapshots => {
        if (bookingsnapshots) {
          internalData['price'] = this.getOneNightPrice(bookingsnapshots);
        }else {
          internalData['price'] = 0;
        }

             });
          return internalData;

    }
    getOneNightPrice(bookingData: any) {
      let weekDaysPrice = 0;
      let weekEndPrice = 0;
           if (bookingData['weekdays'] === 'true') {
    weekDaysPrice = bookingData['weekdayPrice'];
           }else {
    weekDaysPrice = bookingData['oneWeekDayPrice'];
           }
           if (bookingData['weekends'] === 'true') {
             weekEndPrice = bookingData['weekendPrice'];
           }else {
    weekEndPrice = bookingData['oneWeekendDayPrice'];
           }
           if (weekDaysPrice < weekEndPrice) {
    return weekDaysPrice;
    }else {
    return  weekEndPrice;
    }
    }

    generateDateLink() {
      let finalLink = '';
    const curDate = new Date();
        const year = curDate.getFullYear();
        const currentMonth = curDate.getMonth();
        const curDay = curDate.getDate();
        const totalDaysInMonth = {1: 31, 2 : 28 , 3: 31, 4: 30, 5: 31, 6: 30, 7: 31, 8: 31, 9: 30, 10: 31, 11: 30, 12: 31};
        let totalDays = curDay;
        for (let i = 1; i <= currentMonth; i++) {
    totalDays = totalDays + totalDaysInMonth[i];
        }
    const numberOfWeek = Math.ceil(totalDays / 7);
    finalLink = year + '/' + numberOfWeek;
    return finalLink;
    }

    IndividualHouseDtlForProfile(houseId: string): any {
      return this.db.object('No5tha/housesData/public/' + houseId).valueChanges();
    }
}
