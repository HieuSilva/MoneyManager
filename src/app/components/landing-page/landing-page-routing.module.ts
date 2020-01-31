import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page.component';
import { BillComponent } from '../bill/bill.component';

const routes: Routes = [
    {path: '', component: LandingPageComponent, children: [
        {path: 'bill', component: BillComponent}
    ]},
    
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class LandingPageRoutingModule {

}