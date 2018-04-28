import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { ProfilePage } from './../pages/profile/profile';
import { RegisterPage } from './../pages/register/register';
import { LoginPage } from './../pages/login/login';
import { AccountPage } from './../pages/account/account';
import { TabsPage } from '../pages/tabs/tabs';
import { HomePage } from './../pages/home/home';
import { CreateProfilePage } from './../pages/create-profile/create-profile';
import { ProduceListPage } from './../pages/produce-list/produce-list';
import { LocationPage } from './../pages/location/location';
import { VendorDetailsPage } from './../pages/vendor-details/vendor-details';



import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { Geolocation } from '@ionic-native/geolocation';
import { FirebaseProvider } from '../providers/firebase/firebase';


const firebaseConfig = {
  apiKey: "AIzaSyDCyT9Hh2TA0vjU0PRbETv0JiarhktEWCE",
  authDomain: "green-market-c59ab.firebaseapp.com",
  databaseURL: "https://green-market-c59ab.firebaseio.com",
  projectId: "green-market-c59ab",
  storageBucket: "green-market-c59ab.appspot.com",
  messagingSenderId: "172312702632"
};

@NgModule({
  declarations: [
    MyApp,
    ProfilePage,
    LoginPage,
    RegisterPage,
    AccountPage,
    TabsPage,
    HomePage,
    CreateProfilePage,
    ProduceListPage,
    LocationPage,
    VendorDetailsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ProfilePage,
    LoginPage,
    RegisterPage,
    AccountPage,
    TabsPage,
    HomePage,
    CreateProfilePage,
    ProduceListPage,
    LocationPage,
    VendorDetailsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    FirebaseProvider,
  ]
})
export class AppModule {}
