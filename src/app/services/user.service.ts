import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { Booking } from './booking';

@Injectable()
export class UserService {

  constructor(private db: AngularFireDatabase) { }
  getMemberProfile(uid: string) {
    return this.db.object('No5tha/userProfile/' + uid + '/').valueChanges();
      }
      getUpdateLink(uid: string): any {
        return this.db.object('No5tha/userProfile/' + uid + '/');
      }
      getBookingRequestIDs(uid: string): any {
        return this.db.list('No5tha/userProfile/' + uid + '/bookingRequest').valueChanges();
        }
        getBookingRequestInfoFromBookingID(bookingRequestId: string): any {
          return this.db.object('No5tha/BookingRequest/' + bookingRequestId).valueChanges();
        }
  getMemberProfileList(uid: string): any {
  return this.db.list('No5tha/userProfile/' + uid + '/bookingRequest');
      }
  getMemberLikeList(uid: string): any {
   return this.db.list('No5tha/userProfile/' + uid + '/liked');
   }
   getLikedHouseID(uid: string): any {
    return this.db.list('No5tha/userProfile/' + uid + '/liked').valueChanges();
  }
}
