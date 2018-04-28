import { AngularFireAuth } from 'angularfire2/auth';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { LoginPage } from './../login/login';
import { RegisterPage } from './../register/register';

@IonicPage()
@Component({
  selector: 'page-account',
  templateUrl: 'account.html',
})
export class AccountPage {

  showButton: any = true;

  constructor(public afAuth: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams) {
    afAuth.authState.subscribe(user => {
      if (user) {
        this.showButton = false;
        return;
      }
      this.showButton = true;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AccountPage');
  }

  redirectLogin(){
    this.navCtrl.push(LoginPage);
  }
  
  redirectRegister(){
    this.navCtrl.push(RegisterPage);
  }

  logout() {
    this.afAuth.auth.signOut();
  }
}
