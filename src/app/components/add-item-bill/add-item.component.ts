import { OnInit, Component } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { User } from 'src/app/models/User';

@Component({
    selector:'app-add-item',
    templateUrl: './add-item.component.html',
    styleUrls: ['./add-item.component.scss']
})
export class AddItemComponent implements OnInit{

    users: User[] = [];

    constructor(private modalController: ModalController,
                private navParams: NavParams) {

    }

    ngOnInit() {
        this.users = this.navParams.get('users');
        debugger;
    }

    dismissDialog() {
        this.modalController.dismiss().then();
    }
}