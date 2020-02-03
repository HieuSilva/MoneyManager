import { NgModule } from '@angular/core';
import { LandingPageRoutingModule } from './landing-page-routing.module';
import { CommonModule } from '@angular/common';
import { BillComponent } from '../bill/bill.component';
import { LandingPageComponent } from './landing-page.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddItemComponent } from '../add-item-bill/add-item.component';
import { UserService } from 'src/app/services/user.service';
import { BillService } from 'src/app/services/bill.service';
import { PaymentComponent } from '../payment/payment.component';

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
        AddItemComponent,
        PaymentComponent
    ],
    entryComponents: [
        AddItemComponent,
        PaymentComponent
    ],
    providers: [
        UserService,
        BillService
    ]
})
export class LandingPageModule {

}