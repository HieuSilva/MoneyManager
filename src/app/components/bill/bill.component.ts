import { OnInit, Component } from '@angular/core';
import { Bill } from 'src/app/models/Bill';
import { User } from 'src/app/models/User';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserPayment } from 'src/app/models/UserPayment';
import { ModalController } from '@ionic/angular';
import { AddItemComponent } from '../add-item-bill/add-item.component';
import { ItemBill } from 'src/app/models/ItemBill';
import { Item } from 'src/app/models/Item';
import { UserService } from 'src/app/services/user.service';
import { BillService } from 'src/app/services/bill.service';
import { PaymentComponent } from '../payment/payment.component';



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
    total = 0;

    constructor(private modalController: ModalController,
                private userService: UserService,
                private billService: BillService) {
        
    }

    ngOnInit() {
        this.initForm();
        this.users = this.userService.getUsers();
        this.userService.usersSubject.subscribe(users => {
            this.users = users;
            this.billService.changeItemList(this.items, this.users);
            this.calculateTotal();
        })

    }

    onAddBill() {
        this.isCreatingBill = true;
    }

    initForm() {
        this.form = new FormGroup({
            Description: new FormControl('', Validators.required),
            Time: new FormControl('', Validators.required),
            UserName: new FormControl(''),
            ItemName: new FormControl('Item 1', Validators.required),
            ItemPrice: new FormControl('0', Validators.required)
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
            this.userService.createUser(name.trim());
            this.users = this.userService.getUsers();
            this.form.patchValue({
                UserName: ''
            });
        }
    }    

    onRemoveUser(userIndex: number){
        this.userService.removeUser(userIndex);
    }

    // onAddItems() {
    //     this.openAddItemDialog()
    // }

    onAddItem() {
        if(this.form.get('ItemName').invalid || this.form.get('ItemPrice').invalid)
            return;
        
        // Create new item
        let item = new Item();
        item.name = this.form.value.ItemName.trim();
        item.price = +this.form.value.ItemPrice;
        
        // Create bill item
        let itemBill: ItemBill = new ItemBill();
        itemBill.quantity = 1;
        itemBill.price = item.price;
        itemBill.item = item;
        itemBill.itemType = 'share';
        itemBill.users = this.users;
        this.items.push(itemBill);
        this.calculateTotal();
        this.form.patchValue({
            ItemName: 'Item ' + (this.items.length + 1),
            ItemPrice: '0'
        })
    }

    async openAddItemDialog(item: ItemBill, index: number) {
        let dialog = await this.modalController.create({
            component: AddItemComponent,
            componentProps: {
                currentItemTotal: this.items.length,
                item: item,
                itemIndex: index
            }
        });
        dialog.present();
        return dialog;
    }

    async openPaymentDialog() {
        let dialog = await this.modalController.create({
            component: PaymentComponent,
            componentProps: {
                items: this.items,
                bill: this.bill
            }
        });
        dialog.present();
        return dialog;
    }

    onRemoveItem(index: number) {
        this.items.splice(index, 1);
        this.calculateTotal();
    }

    async onEditItem(index: number) {
        let dialog = await this.openAddItemDialog(this.items[index], index);
        let data = await dialog.onWillDismiss();
        if(data.data) {
            let updatedItem = data.data.updatedItem;
            this.items.splice(index, updatedItem);
            this.calculateTotal();
        }
        
        console.log(data);
    }

    calculateTotal() {
        this.total = 0;
        this.items.forEach(item => {
            this.total += item.price * item.quantity;
        })
    }
}