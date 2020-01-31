import { OnInit, Component } from '@angular/core';
import { Bill } from 'src/app/models/Bill';
import { User } from 'src/app/models/User';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserPayment } from 'src/app/models/UserPayment';
import { ModalController } from '@ionic/angular';
import { AddItemComponent } from '../add-item-bill/add-item.component';
import { ItemBill } from 'src/app/models/ItemBill';

@Component({
    selector:'app-bill',
    templateUrl: './bill.component.html',
    styleUrls: ['./bill.component.scss']
})
export class BillComponent implements OnInit{

    bill: Bill = null;
    users: User[] = [];
    form: FormGroup;
    isCreatingBill = false;
    userPayments: UserPayment[] = [];
    items: ItemBill[] = [];

    constructor(private modalController: ModalController) {
        
    }

    ngOnInit() {
        this.initForm();
    }

    onAddBill() {
        this.isCreatingBill = true;
    }

    initForm() {
        this.form = new FormGroup({
            Description: new FormControl('', Validators.required),
            Time: new FormControl('', Validators.required),
            UserName: new FormControl('')
        });
    }

    onCreateBill() {
        if(!this.form.valid)
            return;
        
        this.bill = new Bill();
        this.bill.description = this.form.value.Description;
        this.bill.dateCreated = this.form.value.Time;
        this.isCreatingBill = false;
    }

    onDeleteBill() {
        this.bill = null;
        this.isCreatingBill = false;
    }

    onAddUser() {
        let name = this.form.value.UserName;
        if(!!name || name.trim() != '') {
            let user = new User();
            user.name = name.trim();
            this.users.push(user);
            this.form.patchValue({
                UserName: ''
            });
        }
    }    

    onRemoveUser(userIndex: number){
        this.users.splice(userIndex, 1);
    }

    onAddItems() {
        this.openAddItemDialog()
    }

    async openAddItemDialog() {
        let dialog = await this.modalController.create({
            component: AddItemComponent,
            componentProps: {
                currentItemTotal: this.items.length,
                users: this.users,
            }
        });
        dialog.present();
    }
}