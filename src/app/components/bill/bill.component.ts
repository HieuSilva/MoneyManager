import { OnInit, Component } from '@angular/core';
import { Bill } from 'src/app/models/Bill';
import { User } from 'src/app/models/User';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserPayment } from 'src/app/models/UserPayment';
import { ModalController } from '@ionic/angular';

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

    }
}