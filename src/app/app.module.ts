import { UserService } from './services/user.service';
import { AuthService } from './services/auth.service';
import { AllhousesComponent } from './allhouses/allhouses.component';
import { firebaseConfig } from './../environments/firebase.config';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatCardModule, MatFormFieldModule, MatInputModule,
  MatCheckboxModule, MatSelectModule, MatButtonModule, MatProgressSpinnerModule,
  MatProgressBarModule, MatDialogModule, MatIconModule, MatPaginatorModule, MatTableModule,
  MatMenuModule, MatButtonToggleModule, MatExpansionModule} from '@angular/material';
  import {MatStepperModule} from '@angular/material/stepper';
  import {routerConfig } from './router.config';
  import { AngularFontAwesomeModule } from 'angular-font-awesome/angular-font-awesome';
  import { NgxCarouselModule } from 'ngx-carousel';
  import 'hammerjs';
  import { AgmCoreModule } from '@agm/core';
  import { Daterangepicker } from 'ng2-daterangepicker';
  import { PopoverModule } from 'ngx-popover';
import { GalleryComponent } from './house/gallery/gallery.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { HouseComponent } from './house/house.component';
import { HouseService } from './services/house.service';
import { BookingService } from './services/booking.service';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AuthMethods, AuthProvider, FirebaseUIAuthConfig, FirebaseUIModule, AuthProviderWithCustomConfig,
  CredentialHelper } from 'firebaseui-angular';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { PhoneconfirmComponent } from './login/phoneconfirm/phoneconfirm.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MyrequestComponent } from './dashboard/myrequest/myrequest.component';
import { PaymentsComponent } from './payments/payments.component';
import { InvoiceComponent } from './payments/invoice/invoice.component';
import { RequestedhousedtlComponent } from './dashboard/requestedhousedtl/requestedhousedtl.component';
import { SearchboxComponent } from './home/searchbox/searchbox.component';
import { MapviewComponent } from './allhouses/mapview/mapview.component';
import { SearchresultComponent } from './searchresult/searchresult.component';
import { MyfavhouseComponent } from './dashboard/myfavhouse/myfavhouse.component';
import { FavhousesdtlComponent } from './dashboard/favhousesdtl/favhousesdtl.component';
// tslint:disable-next-line:max-line-length
import { DialogOverviewExampleDialogComponent, ProfileComponent, DialogUploadPhotoIdComponent, DialogUploadGovernmentIdComponent, DialogUploadDrivingLicenseComponent } from './dashboard/profile/profile.component';
import { ImageUploadModule } from 'angular2-image-upload';
import {HttpClientModule, HttpClient} from '@angular/common/http';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { PaymentConfirmComponent } from './invoice/payment-confirm/payment-confirm.component';
import { LocalStorageModule } from 'angular-2-local-storage';
import { BillService } from './services/bill.service';
import { PaymentSuccessComponent } from './payments/payment-success/payment-success.component';
import { ReceiptComponent } from './receipt/receipt.component';
import { PaymentErrorComponent } from './payments/payment-error/payment-error.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

const phoneCustomConfig: AuthProviderWithCustomConfig = {
  provider: AuthProvider.Phone,
  customConfig: {
    defaultCountry: 'KW',
  }
};

const facebookCustomConfig: AuthProviderWithCustomConfig = {
  provider: AuthProvider.Facebook,
  customConfig: {
    scopes: [
      'public_profile',
      'email'
    ],
    customParameters: {
      // Forces password re-entry.
      auth_type: 'reauthenticate'
    }
  }
};

const firebaseUiAuthConfig: FirebaseUIAuthConfig = {
  providers: [
    AuthProvider.Google,
    facebookCustomConfig,
    AuthProvider.Twitter,
    AuthProvider.Password,
    phoneCustomConfig
  ],
  method: AuthMethods.Popup,
  credentialHelper: CredentialHelper.None
};

@NgModule({
  declarations: [
    AppComponent,
    AllhousesComponent,
    HouseComponent,
    GalleryComponent,
    LoginComponent,
    HomeComponent,
    PhoneconfirmComponent,
    DashboardComponent,
    MyrequestComponent,
    PaymentsComponent,
    InvoiceComponent,
    RequestedhousedtlComponent,
    SearchboxComponent,
    MapviewComponent,
    SearchresultComponent,
    MyfavhouseComponent,
    FavhousesdtlComponent,
    ProfileComponent,
    DialogOverviewExampleDialogComponent,
    DialogUploadPhotoIdComponent,
    DialogUploadGovernmentIdComponent,
    DialogUploadDrivingLicenseComponent,
    PaymentConfirmComponent,
    PaymentSuccessComponent,
    ReceiptComponent,
    PaymentErrorComponent,
  ],
  entryComponents: [GalleryComponent, LoginComponent, PhoneconfirmComponent, RequestedhousedtlComponent, SearchboxComponent,
  MapviewComponent, FavhousesdtlComponent, DialogOverviewExampleDialogComponent,
DialogUploadPhotoIdComponent, DialogUploadGovernmentIdComponent, DialogUploadDrivingLicenseComponent],
  imports: [
    BrowserModule, NgbModule.forRoot(), BrowserAnimationsModule, FormsModule, ReactiveFormsModule,
    MatFormFieldModule, MatInputModule, MatCardModule,
    MatCheckboxModule, MatSelectModule, MatButtonModule, MatProgressSpinnerModule,
    MatDialogModule, MatIconModule, MatPaginatorModule, MatTableModule, MatProgressBarModule,
    MatMenuModule, MatButtonToggleModule, MatExpansionModule,
    RouterModule.forRoot(routerConfig, {useHash: false}),
    AngularFontAwesomeModule,  NgxCarouselModule,
    AgmCoreModule.forRoot({
     apiKey: 'AIzaSyB0H7RQhY57kz1Xb-XdWM5EjUUKhMpk-Tw'
   }), Daterangepicker, PopoverModule, AngularFireModule.initializeApp(firebaseConfig),
   AngularFireDatabaseModule, AngularFireAuthModule, FirebaseUIModule.forRoot(firebaseUiAuthConfig),
   MatStepperModule, ImageUploadModule.forRoot(),
   HttpClientModule,
   TranslateModule.forRoot({
       loader: {
           provide: TranslateLoader,
           useFactory: HttpLoaderFactory,
           deps: [HttpClient]
       }
   }),
   LocalStorageModule.withConfig({
    prefix: 'weekendq8',
    storageType: 'localStorage'
})
  ],
  providers: [HouseService, BookingService, AuthService, UserService, BillService],
  bootstrap: [AppComponent]
})
export class AppModule { }
