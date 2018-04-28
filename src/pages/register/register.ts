import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';


import { User } from '../../shared/models/user';
import { AngularFireAuth } from 'angularfire2/auth';
import { LoginPage } from './../login/login';
import { CreateProfilePage } from '../create-profile/create-profile';

@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  user = {} as User;

  constructor(public alertCtl: AlertController, public afAuth: AngularFireAuth ,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');    
  }

  async register(user: User){
    try {
      const result = await this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password);
      if(result){
        let alert = this.alertCtl.create({
          title: 'Account',
          subTitle: 'User successfully created',
          buttons: ['Dismiss']
        });
        alert.present();
        this.navCtrl.setRoot(CreateProfilePage);
      }
    }
    catch(e){
      console.error(e);
    }
  }

  redirectLogin(){
    this.navCtrl.setRoot(LoginPage);
  }
}
