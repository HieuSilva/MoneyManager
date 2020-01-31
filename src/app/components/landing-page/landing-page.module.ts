import { NgModule } from '@angular/core';
import { LandingPageRoutingModule } from './landing-page-routing.module';
import { CommonModule } from '@angular/common';
import { BillComponent } from '../bill/bill.component';
import { LandingPageComponent } from './landing-page.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddItemComponent } from '../add-item-bill/add-item.component';

@NgModule({
    imports: [
        LandingPageRoutingModule,
        CommonModule,
        IonicModule,
        FormsModule,
        ReactiveFormsModule
    ],
    exports: [

    ],
    declarations: [
        LandingPageComponent,
        BillComponent,
        AddItemComponent
    ]
})
export class LandingPageModule {

}