import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class BillService {

  constructor(private http: Http) { }
InitilizeKnetRequest(billingData: any): any  {
  console.log(billingData);
  const total = billingData.totalPrice;
  const deposit = billingData.deposit;
  const gtotal = total + deposit;
  const headers = new Headers({'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' });
  const options = new RequestOptions({ headers: headers });
  const data = {trackid: billingData.receiptNumber, amount: gtotal, phone: billingData.phoneNumber, orderId: billingData.orderid};
  return this.http.post(window.location.origin + '/payment/buy.php', data, options)
  .map(response => {
  return response.json();

  })
  .catch(error => {
    return Observable.throw(error.message || error);
  });
}
}
