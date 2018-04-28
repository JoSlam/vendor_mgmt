
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

import { LoginPage } from './../login/login';
import { RegisterPage } from './../register/register';
import { Profile } from '../../shared/models/profile';
import { FirebaseProvider } from './../../providers/firebase/firebase';
import { CreateProfilePage } from '../create-profile/create-profile';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  profile: Profile;
  profile_data: Observable<any>;
  produceList: any[];
  products: Observable<{}>;
  produceObservable: AngularFireObject<{}>;
  newItem = {
    name: ''
  };
  profile_loaded: boolean = false;

  constructor(public alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams, public afAuth: AngularFireAuth, public afd: AngularFireDatabase, public firebaseprovider: FirebaseProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
    this.afAuth.authState.subscribe(use_data => {
      if(use_data){
        this.profile_data = this.firebaseprovider.getVendor(use_data.uid).valueChanges();
        this.produceObservable = this.firebaseprovider.getVendor(use_data.uid);
        this.products = this.firebaseprovider.getProduceList(use_data.uid).valueChanges();
        this.profile_loaded = true;

        this.produceObservable.snapshotChanges().subscribe(data => {
          if(data.payload.val() !== null){
            this.produceList = data.payload.val().produce;
          }
        });
      } else {
        this.profile_data = null;
        this.produceObservable = null;
        this.products = null;
        this.profile_loaded = false;
      }
    });
  }


  addItem() {
    if(this.newItem.name !== ''){
      this.produceList.push(this.newItem.name);
      this.produceObservable.update({ produce: this.produceList });
      this.newItem.name = '';
    }else{
      let alert = this.alertCtrl.create({
        title: 'Value Error',
        subTitle: 'Please Enter Item',
        buttons: ['OK']
      });
      alert.present();
    }
  }

  removeItem(item){
    this.produceList.splice(this.produceList.findIndex(n => n === item), 1);
    this.produceObservable.update({ produce: this.produceList });
    console.log(this.produceList);
  }

  redirectLogin() {
    this.navCtrl.push(LoginPage);
  }

  redirectRegister() {
    this.navCtrl.push(RegisterPage);
  }

  redirectCreateProfile(){
    this.navCtrl.push(CreateProfilePage);
  }
}
