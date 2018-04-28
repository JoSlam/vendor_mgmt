import { Geolocation } from '@ionic-native/geolocation';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


import { Profile } from './../../shared/models/profile';

declare var google;

@IonicPage()
@Component({
  selector: 'page-vendor-details',
  templateUrl: 'vendor-details.html',
})
export class VendorDetailsPage {

  // map stuff
  map: any;
  marker: any;
  @ViewChild('map') mapElement: ElementRef;
  

  // vendor stuff
  vendor = {} as Profile;
  location;

  constructor(public navCtrl: NavController, public navParams: NavParams, public geolocation: Geolocation) {
    this.vendor = this.navParams.get('vendor');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VendorDetailsPage');
    // load map
    this.loadMap();
  }


  loadMap(){
    let latLng = new google.maps.LatLng(this.vendor.location.lat, this.vendor.location.lng);
    let mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

    this.marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: latLng
    });
  }
}
