import { OnInit, Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { BillService } from 'src/app/services/bill.service';
import { User } from 'src/app/models/User';
import { ItemBill } from 'src/app/models/ItemBill';
import { UserPayment } from 'src/app/models/UserPayment';
import { NavParams, ModalController } from '@ionic/angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Bill } from 'src/app/models/Bill';
import { Transfer } from 'src/app/models/Transfer';

@Component({
    selector: 'app-payment',
    templateUrl: './payment.component.html',
    styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

    bill: Bill;
    users: User[] = [];
    items: ItemBill[] = [];
    payments: UserPayment[] = [];
    form: FormGroup;
    transfers: Transfer[] = [];
    total: number = 0;

    constructor(private userService: UserService,
                private navParams: NavParams,
                private billService: BillService,
                private modalController: ModalController)
    {

    }

    ngOnInit() {
        this.items = this.navParams.get('items');
        this.users = this.userService.getUsers();
        this.bill = this.navParams.get('bill');
        this.form = new FormGroup({
            UserId: new FormControl('', Validators.required),
            Amount: new FormControl('0', Validators.required)
        });
        this.billService.transfersSubject.subscribe(transfers => {
            this.transfers = transfers;
        })
    }

    onAddPayment() {
        if(this.form.invalid)
            return;
        let payment = new UserPayment();
        payment.amount = +this.form.value.Amount;
        payment.user = this.users.find(u => u.id === +this.form.value.UserId);
        this.payments.push(payment);
        this.form.patchValue({
            Amount: '0',
            UserId: ''
        });
        this.calculateTotal();
    }

    onUserSelect($event) {

    }

    onRemovePayment(index: number) {
        this.payments.splice(index, 1);
        this.calculateTotal();
    }

    dismissDialog(data = null) {
        this.modalController.dismiss(data);
    }

    calculateBill() {
        this.billService.calculateTransfers(this.items, this.payments);
    }

    calculateTotal() {
        this.total = 0;
        this.payments.forEach(p => {this.total += p.amount});
    }

}