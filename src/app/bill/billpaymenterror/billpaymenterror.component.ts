import { AngularFireDatabase } from 'angularfire2/database';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-billpayment-error',
  templateUrl: './billpaymenterror.component.html',
  styleUrls: ['./billpaymenterror.component.scss']
})
export class BillPaymentErrorComponent implements OnInit {
  paymentResponse: any;
  orderId: string;
  items: any;
  currentDate: Date = new Date();
  constructor(private route: ActivatedRoute,
    private af: AngularFireDatabase,
    public translate: TranslateService,
    private router: Router
  ) {
    this.paymentResponse = this.route.snapshot.params;
    this.currentDate = new Date(+this.paymentResponse.trackid);
    const savedData = {
      'trackId': this.paymentResponse.trackid,
      'result' : this.paymentResponse.result,
      'id' : this.paymentResponse.trackid,
      'auth' : this.paymentResponse.auth,
      'paymentId' : this.paymentResponse.paymentid,
      'transictionId' : this.paymentResponse.transid,
      'referenceId' : this.paymentResponse.refno,
      'amount' : this.paymentResponse.paymentid,
      'date' : this.paymentResponse.postdate,
      'time' : Math.round((new Date()).getTime() * 1000),
    };
    this.af.object('/No5tha/receiptResponse/' + this.paymentResponse.refno).update(savedData)
      .catch((error) => {
        console.error(error);
      });

    this.af.object('/No5tha/Receipts/' + this.paymentResponse.trackid).valueChanges()
      .subscribe( billdata => {
        this.items = billdata['items'];
      });
  }

  ngOnInit() {}

}
