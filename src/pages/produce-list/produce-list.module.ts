import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProduceListPage } from './produce-list';

@NgModule({
  declarations: [
    ProduceListPage,
  ],
  imports: [
    IonicPageModule.forChild(ProduceListPage),
  ],
})
export class ProduceListPageModule {}
