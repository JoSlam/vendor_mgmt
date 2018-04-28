import { LocationPage } from './../location/location';
import { Profile } from './../../shared/models/profile';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';



@IonicPage()
@Component({
  selector: 'page-produce-list',
  templateUrl: 'produce-list.html',
})
export class ProduceListPage {
  profile = {} as Profile;
  newProduct = {
    name: ''
  }
  produce: string[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProduceListPage');
    this.profile = this.navParams.get('profile');
    console.log(this.profile);
  }

  addNewProduct(){
    if(this.newProduct.name === ''){
      let alert = this.alertCtrl.create({
        title: 'Missing Entry',
        subTitle: 'Please fill all fields',
        buttons: ['OK']
      });
      alert.present();
    } else {
      this.produce.push(this.newProduct.name);
      this.newProduct.name = '';
    }
  }


  removeItem(product){
    this.produce.splice(this.produce.findIndex(n => n === product), 1);
    console.log(this.produce);
  }

  redirectLocation(){
    this.profile.produce = this.produce;
    this.navCtrl.push(LocationPage, {profile: this.profile});
  }

}
