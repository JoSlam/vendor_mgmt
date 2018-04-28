import { Observable } from 'rxjs/Observable';
import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { FirebaseProvider } from './../../providers/firebase/firebase';


import { Profile } from './../../shared/models/profile';
import { LoginPage } from '../login/login';
import { VendorDetailsPage } from '../vendor-details/vendor-details';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  profile_data: Observable<any>;
  profile_list: Observable<any>;
  profile_loaded: boolean = false;
  name: string;

  constructor(public afd: AngularFireDatabase, public afAuth: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams, public firebaseprovider: FirebaseProvider, public toastCtrl: ToastController) {
    
  }

  ionViewDidLoad() {
      this.afAuth.authState.subscribe(user_data => {
        if(user_data){
          this.profile_data = this.firebaseprovider.getVendor(user_data.uid).valueChanges();
          this.profile_loaded = true;
          this.profile_data.subscribe(data => {
            let toast = this.toastCtrl.create({
              message: 'Welcome ' + data.full_name,
                duration: 3000,
              position: 'bottom'
            });
            
            toast.onDidDismiss(() => {
              console.log('Dismissed toast');
            });

            toast.present();
          });
        } else {
          this.profile_loaded = false;
          this.profile_data = null;
        }
      });
      this.profile_list = this.firebaseprovider.getVendorList().valueChanges();
  }

  redirectLogin(){
    this.navCtrl.setRoot(LoginPage);
  }

  logout(){
    this.afAuth.auth.signOut();
    this.profile_data = null;
    this.profile_loaded = false;
  }

  loadDetails(profile: Profile){
    this.navCtrl.push(VendorDetailsPage, {vendor: profile});
  }
}
