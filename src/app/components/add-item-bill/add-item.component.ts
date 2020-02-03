import { OnInit, Component } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { User } from 'src/app/models/User';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ItemBill } from 'src/app/models/ItemBill';
import { UserService } from 'src/app/services/user.service';
import { BillService } from 'src/app/services/bill.service';

@Component({
    selector:'app-add-item',
    templateUrl: './add-item.component.html',
    styleUrls: ['./add-item.component.scss']
})
export class AddItemComponent implements OnInit{

    users: User[] = [];
    usersCopy: User[] = [];
    item: ItemBill;
    form: FormGroup;
    itemShared = true;

    constructor(private modalController: ModalController,
                private navParams: NavParams,
                private userService: UserService,
                private billService: BillService) {

    }

    ngOnInit() {
        this.users = this.userService.getUsers();
        this.usersCopy = [...this.users];
        this.item = this.navParams.get('item');
        this.itemShared = this.item.itemType === 'share';
        this.initForm();
    }

    initForm() {
        this.form = new FormGroup({
            ItemName: new FormControl({ value: this.item.item.name, disabled: true}),
            ItemPrice: new FormControl(this.item.price, Validators.required),
            Quantity: new FormControl(this.item.quantity, Validators.required),
        });

    }

    dismissDialog(data = null) {
        this.modalController.dismiss(data);
    }

    setTypeShare() {
        this.itemShared = true;
        this.item.itemType = 'share';
    }

    setTypeSingle() {
        this.itemShared = false;
        this.item.itemType = 'single';
        this.users = [...this.usersCopy];
    }

    onRemoveUser(userIndex: number){
        this.users.splice(userIndex, 1);
    }

    resetUsers() {
        this.users = [...this.usersCopy];
    }

    onUserSelect(event) {
        let userId = event.detail.value;
        let user = this.users.find(u => u.id === userId);
        this.item.users = [user];
    }

    onSave() {
        if(this.form.get('ItemPrice').invalid || this.form.get('Quantity').invalid)
            return;
        if(this.item.users.length === 0)
            return;
        
        this.item.price = +this.form.value.ItemPrice;
        this.item.quantity = +this.form.value.Quantity;
        this.dismissDialog({
            updatedItem: this.item
        });
    }
}