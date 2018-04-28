import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

import { User } from '../../shared/models/user';
import { AngularFireAuth } from 'angularfire2/auth';
import { RegisterPage } from '../register/register';
import { HomePage } from './../home/home';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  user = {} as User;

  constructor(public alertCtl: AlertController, public afAuth: AngularFireAuth ,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }


  async login(user: User) {
    try {
      const result = await this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password);
      if (result) {
        this.navCtrl.setRoot(HomePage);
      }  
    }
    catch (e) {
      console.error(e);
      user.email = '';
      user.password = '';
      let alert = this.alertCtl.create({
        title: 'Login Error.',
        subTitle: 'Incorrect email or password',
        buttons: ['Dismiss']
      });
      alert.present();
    }
  }
 
  register(){
    this.navCtrl.setRoot(RegisterPage);
  }
  
}