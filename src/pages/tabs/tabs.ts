import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { ProfilePage } from './../profile/profile';
import { AccountPage } from './../account/account';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = AccountPage;
  tab3Root = ProfilePage
  constructor() {

  }
}
