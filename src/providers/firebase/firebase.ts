import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database'

@Injectable()
export class FirebaseProvider {

  constructor(public afd: AngularFireDatabase) {
    console.log('Hello FirebaseProvider Provider');
  }


  getVendorList(){
    return this.afd.list('/vendor_profile/');
  }

  getVendor(uid){
    return this.afd.object(`/vendor_profile/${uid}`);
  }

  addVendor(uid, vendor){
    this.afd.object(`/vendor_profile/${uid}`).set(vendor);
  }

  getProduceList(uid) {
    return this.afd.object(`/vendor_profile/${uid}/produce`);
  }

  removeVendor(uid){
    this.afd.list('/vendor_profile/').remove(uid);
  }
  
}
