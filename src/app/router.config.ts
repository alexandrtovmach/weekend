import { PaymentErrorComponent } from './payments/payment-error/payment-error.component';
import { LoginComponent } from './login/login.component';
import { PaymentSuccessComponent } from './payments/payment-success/payment-success.component';
import { PaymentConfirmComponent } from './invoice/payment-confirm/payment-confirm.component';
import { ProfileComponent } from './dashboard/profile/profile.component';
import { MyfavhouseComponent } from './dashboard/myfavhouse/myfavhouse.component';
import { SearchboxComponent } from './home/searchbox/searchbox.component';
import { SearchresultComponent } from './searchresult/searchresult.component';
import { InvoiceComponent } from './payments/invoice/invoice.component';
import { PaymentsComponent } from './payments/payments.component';
import { MyrequestComponent } from './dashboard/myrequest/myrequest.component';
import { HouseComponent } from './house/house.component';
import { Route } from '@angular/router';
import { HomeComponent } from '../app/home/home.component';
import { AllhousesComponent } from './allhouses/allhouses.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ReceiptComponent } from './receipt/receipt.component';
import { BillComponent } from './bill/bill.component';
import { BillPaymentSuccessComponent } from './bill/billpaymentsuccess/billpaymentsuccess.component';
import { BillPaymentErrorComponent } from './bill/billpaymenterror/billpaymenterror.component';


export const routerConfig: Route[] = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'allhouses',
    component: AllhousesComponent
  },
  {
  path: 'house',
    children: [{
        path: ':houseId',
        component: HouseComponent
    }]
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'booking-requests',
    component: MyrequestComponent
  },
  {
    path: 'payments',
    children: [{
        path: ':houseId',
        children: [{
            path: ':checkin',
            children: [{
                path: ':checkout',
                component: PaymentsComponent
            }]
        }]
    }]
  },
  {
    path: 'invoice',
    children: [{
        path: ':reuestId',
        component: InvoiceComponent
    }]
  },
  {
    path: 'search',
    children: [{
        path: ':where',
        children: [{
            path: ':swimmingpool',
            children: [{
                path: ':torent',
                children: [{
                    path: ':whichline',
                    children: [{
                        path: ':housetype',
                        component: SearchresultComponent
                    }]
                }]
            }]
        }]
    }]
  },
  {
    path: 'paymentsuccess',
    children: [{
        path: ':paymentid',
        children: [{
            path: ':postdate',
            children: [{
                path: ':result',
                children: [{
                    path: ':transid',
                    children: [{
                        path: ':auth',
                        children: [{
                            path: ':trackid',
                            children: [{
                                path: ':refno',
                                children: [{
                                    path: ':contact',
                                    children: [{
                                        path: ':orderid',
                                        children: [{
                                            path: ':amount',
                                            component: PaymentSuccessComponent
                                        }]
                                    }]
                                }]
                            }]
                        }]
                    }]
                }]
            }]
        }]
    }]
  },
  {
    path: 'paymenterror',
    children: [{
        path: ':paymentid',
        children: [{
            path: ':postdate',
            children: [{
                path: ':result',
                children: [{
                    path: ':transid',
                    children: [{
                        path: ':auth',
                        children: [{
                            path: ':trackid',
                            children: [{
                                path: ':refno',
                                children: [{
                                    path: ':contact',
                                    children: [{
                                        path: ':orderid',
                                        children: [{
                                            path: ':amount',
                                            component: PaymentErrorComponent
                                        }]
                                    }]
                                }]
                            }]
                        }]
                    }]
                }]
            }]
        }]
    }]
  },
  {
    path: 'billpaymentsuccess',
    children: [{
        path: ':paymentid',
        children: [{
            path: ':result',
            children: [{
                path: ':postdate',
                children: [{
                    path: ':transid',
                    children: [{
                        path: ':auth',
                        children: [{
                            path: ':refno',
                            children: [{
                                path: ':trackid',
                                children: [{
                                    path: ':contact',
                                    children: [{
                                        path: ':orderid',
                                        children: [{
                                            path: ':amount',
                                            component: BillPaymentSuccessComponent
                                        }]
                                    }]
                                }]
                            }]
                        }]
                    }]
                }]
            }]
        }]
    }]
  },
  {
    path: 'billpaymenterror',
    children: [{
        path: ':paymentid',
        children: [{
            path: ':result',
            children: [{
                path: ':postdate',
                children: [{
                    path: ':transid',
                    children: [{
                        path: ':auth',
                        children: [{
                            path: ':trackid',
                            children: [{
                                path: ':refno',
                                children: [{
                                    path: ':contact',
                                    children: [{
                                        path: ':orderid',
                                        children: [{
                                            path: ':amount',
                                            component: BillPaymentErrorComponent
                                        }]
                                    }]
                                }]
                            }]
                        }]
                    }]
                }]
            }]
        }]
    }]
  },
  {
    path: 'favhouses',
    component: MyfavhouseComponent
  },
  {
    path: 'profile',
    component: ProfileComponent
  },
  {
    path: 'confirm-payment',
    component: PaymentConfirmComponent
  },
  {
    path: 'payment-success',
    component: PaymentSuccessComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'receipt',
    children: [{
        path: ':receiptid',
        component: ReceiptComponent
    }]
  },
  {
    path: 'bill',
    children: [{
        path: ':billid',
        component: BillComponent
    }]
  }
];
