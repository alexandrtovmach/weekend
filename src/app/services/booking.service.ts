import { Booking } from './booking';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class BookingService {

  constructor(private db: AngularFireDatabase) { }
  getBookingDatesForSelectedHouse(houseId: string, year: any, weeknumber: any, day: any): any {
    // tslint:disable-next-line:max-line-length
    return this.db.object<Booking>('No5tha/BookingDatabases/' + houseId + '/' + year + '/' + weeknumber + '/' + day).valueChanges();
    }
    getBookingRequestByReqId(reqId: any) {
      return this.db.object('No5tha/BookingRequest/' + reqId).valueChanges();
    }
    makeid() {
      let text = 'req';
       let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
       for (let i = 0; i < 11; i++) {
         text += possible.charAt(Math.floor(Math.random() * possible.length));
       }

       return text;
     }
}
