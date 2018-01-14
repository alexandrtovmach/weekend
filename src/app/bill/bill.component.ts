import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { EmailValidator } from '@angular/forms/src/directives/validators';
import { Observable } from 'rxjs/Observable';
import { Http, Headers, RequestOptions } from '@angular/http';
import { LocalStorageService } from 'angular-2-local-storage';

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.scss']
})
export class BillComponent implements OnInit {
  billInfo: any;
  currentDate: Date = new Date();
  email: EmailValidator;
  constructor(private af: AngularFireDatabase,
              private route: ActivatedRoute,
              private translate: TranslateService,
              private http: Http,
              private localstorage: LocalStorageService) {

    const billid = this.route.snapshot.params.billid;
    this.af.object('/No5tha/Receipts/' + billid).valueChanges()
      .subscribe( billdata => {
        this.billInfo = billdata;
        this.localstorage.set('cacheBillItem', billdata);
        console.log(billdata);
      });
   }

  ngOnInit() {
  }

  payReq() {
    this.InitilizeKnetRequest()
      .subscribe( result => {
        // console.log(result);
        window.location.href = result.location + '?paymentID=' + result.paymentID;
      });
  }

  InitilizeKnetRequest(): any  {
    const headers = new Headers({'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    const data = {
      trackid: this.billInfo.ID,
      amount: this.billInfo.total + this.billInfo.items[1].price,
      phone: localStorage.getItem('phoneNumber'),
      orderId: this.billInfo.ID
    };
    return this.http.post(window.location.origin + '/billpayment/buy.php', data, options)
      .map(response => {
        return response.json();
      })
      .catch(error => {
        return Observable.throw(error.message || error);
      });
  }
}
