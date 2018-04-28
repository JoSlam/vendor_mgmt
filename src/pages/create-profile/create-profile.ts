import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

import { Profile } from './../../shared/models/profile';
import { ProduceListPage } from './../produce-list/produce-list';
import { Validators, FormBuilder } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';

import 'rxjs/add/operator/take';

@IonicPage()
@Component({
  selector: 'page-create-profile',
  templateUrl: 'create-profile.html',
})
export class CreateProfilePage {
  profile = {} as Profile;
  userProfile;
  username;

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, public afAuth: AngularFireAuth, public alertCtrl: AlertController) {
    this.userProfile = formBuilder.group({
      full_name: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      company_name: ['', Validators.compose([Validators.maxLength(75), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      phone: ['', Validators.compose([Validators.maxLength(15), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      foodBadge: [''],
      image: ['']
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateProfilePage');
  }

  redirectProduce(){
    this.afAuth.authState.take(1).subscribe(user_data => {
      this.profile.uid = user_data.uid;
    })
    if(this.emptyCheck()){
      let alert = this.alertCtrl.create({
        title: 'Missing Values',
        subTitle: 'Please Fill All Fields.',
        buttons: ['OK']
      });
      alert.present();
    } else {
      this.navCtrl.push(ProduceListPage, { profile: this.profile });
    }
  }

  emptyCheck(){
    return this.profile.full_name === undefined || this.profile.company_name === undefined || this.profile.phone === undefined ||
     this.profile.full_name.length === 0 || this.profile.company_name.length === 0 || this.profile.phone.length === 0;
  }
}
