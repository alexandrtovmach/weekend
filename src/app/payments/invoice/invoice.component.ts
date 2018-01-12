import { BookingService } from './../../services/booking.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {
  bookingRequestKey: string;
  bookingInfo: any;
  checkin: any;
  checkout: any;
  selectedNights: number;
  checkinDateReadable: string;
  checkOutDateReadable: string;
  constructor(private route: ActivatedRoute, private bookingService: BookingService) {
    this.bookingRequestKey = this.route.snapshot.params['reuestId'];
   }

  ngOnInit() {
    this.bookingService.getBookingRequestByReqId(this.bookingRequestKey)
    .subscribe((result) => {
      this.bookingInfo = result;
      this.checkin = result['dates']['checkInDate'];
      this.checkout = result['dates']['checkOutDate'];
      const checkInDateValue = new Date(this.checkin);
      const checkOutDateValue = new Date(this.checkout);
      const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
      ];
// tslint:disable-next-line:max-line-length
this.checkinDateReadable = monthNames[checkInDateValue.getMonth()] + ' ' + checkInDateValue.getDate() + ', ' + checkInDateValue.getFullYear();
this.checkOutDateReadable = monthNames[checkOutDateValue.getMonth()] + ' ' + checkOutDateValue.getDate() + ', ' + checkOutDateValue.getFullYear();

const oneDay = 24 * 60 * 60 * 1000; // one day in millisecond
this.selectedNights = Math.round(Math.abs((checkInDateValue.getTime() - checkOutDateValue.getTime()) / (oneDay)));
});
  }

}
