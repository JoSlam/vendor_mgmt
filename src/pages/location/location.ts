import { MyApp } from './../../app/app.component';
import { Component, ViewChild, ElementRef, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

import { AngularFireAuth } from 'angularfire2/auth';
import { Geolocation } from '@ionic-native/geolocation';
import 'rxjs/add/operator/take'


import { FirebaseProvider } from './../../providers/firebase/firebase';
import { Profile } from './../../shared/models/profile';
import { HomePage } from './../home/home';


declare var google;

@IonicPage()
@Component({
  selector: 'page-location',
  templateUrl: 'location.html',
})
export class LocationPage {
  profile = {} as Profile;
  location: any;
  marker: any;
  map: any;
  GoogleAutocomplete;
  autocomplete;
  autocompleteItems;
  geocoder;

  @ViewChild('map') mapElement: ElementRef;
 

  constructor(public alertCtrl: AlertController, public zone: NgZone, public navCtrl: NavController, public navParams: NavParams, public geolocation: Geolocation, public afAuth: AngularFireAuth, public firebaseprovider: FirebaseProvider) {
    this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
    this.autocomplete = { input: '' };
    this.autocompleteItems = [];
    this.geocoder = new google.maps.Geocoder;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LocationPage');

    // Loadmap
    this.loadMap();

    // Fetch profile params
    this.profile = this.navParams.get('profile');
    console.log(this.profile);
  }

  updateSearchResults() {
    if (this.autocomplete.input == '') {
      this.autocompleteItems = [];
      return;
    }
    this.GoogleAutocomplete.getPlacePredictions({ input: this.autocomplete.input },
      (predictions, status) => {
        this.autocompleteItems = [];
        this.zone.run(() => {
          predictions.forEach((prediction) => {
            this.autocompleteItems.push(prediction);
          });
        });
      });
  }

  selectSearchResult(item){
    this.geocoder.geocode({'placeId': item.place_id}, (results, status) => {
      if(status === 'OK' && results[0]){
        console.log(results);
        let selectLoc = new google.maps.LatLng(results[0].geometry.location.lat(), results[0].geometry.location.lng())
        console.log('Selected Location: ' + selectLoc.lat() + ',' + selectLoc.lng());
        this.map.panTo(selectLoc);
        this.addMarker(selectLoc);
      }
    });


    // clear search bar and options
    this.autocomplete.input = '';
    this.autocompleteItems = [];
  }


  addMarker(latLng) {
    this.marker.setMap(null);
    this.marker = null;
    this.marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: latLng
    });
    this.location = latLng;  //move location everytime marker moves
    this.map.panTo(latLng);
    console.log('Marker Location: ' + this.location.lat() + ',' + this.location.lng());
  }


  loadMap() {
    this.geolocation.getCurrentPosition().then((position) => {
      let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

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
      this.location = latLng;

      google.maps.event.addListener(this.map, 'click', (event) => {
        console.log(this.location.lat(), this.location.lng());
        this.addMarker(event.latLng);
      });
    }, (err) => {
      console.log(err);
    });
  }


  createProfile(){
    this.profile.location = {
      lat: this.location.lat(),
      lng: this.location.lng()
    };
    console.log(this.profile);
    this.afAuth.authState.take(1).subscribe(user => {
      this.firebaseprovider.addVendor(user.uid, this.profile)
      let alert = this.alertCtrl.create({
        title: 'Profile',
        subTitle: 'Profile Created',
        buttons: ['OK']
      })
      alert.present();
      this.navCtrl.setRoot(HomePage);
    })
  }
}