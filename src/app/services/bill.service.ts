import { Subject } from 'rxjs';
import { ItemBill } from '../models/ItemBill';
import { User } from '../models/User';
import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { UserPayment } from '../models/UserPayment';
import { Transfer } from '../models/Transfer';
import { PayRequest } from '../models/PayRequest';
import { PayDifference } from '../models/PayDifference';

@Injectable()
export class BillService {

    constructor(private userService: UserService) {

    }
    itemsSubject: Subject<ItemBill[]> = new Subject<ItemBill[]>();
    transfersSubject: Subject<Transfer[]> = new Subject<Transfer[]>();

    changeItemList(items: ItemBill[], users: User[]) {
        items.forEach(item => {
            if(item.users.length === 0) {
                
            }
            item.users = item.users.filter(u => users.findIndex(user => user.id == u.id) != -1);
        })
    }

    calculateTransfers(items: ItemBill[], payments: UserPayment[]){
        let payRequests: PayRequest[] = [];
        let transfers: Transfer[] = [];
        // Calculate pay request for each user;
        items.forEach(item => {
            item.users.forEach(user => {
                let index = payRequests.findIndex(request => request.user && request.user.id === user.id);
                let request = new PayRequest();
                request.user = user;
                if(index === -1) {
                    payRequests.push(request);
                }
                else {
                    request = payRequests[index];
                }
                request.amount += Math.ceil(item.price * item.quantity / item.users.length); 
            })
        });

        // Bill total
        let total = 0;
        payments.forEach(p => {total += p.amount});

        // Calculate transfer
        let payDifferences: PayDifference[] = [];
        payRequests.forEach(request => {
            let index = payments.findIndex(p => p.user.id === request.user.id);
            let payDiff = new PayDifference();
            payDiff.user = request.user;
            payDifferences.push(payDiff);
            if(index === -1) {
                payDiff.difference = -request.amount;   //Negative means need to pay
            }
            else {
                payDiff.difference = payments[index].amount - request.amount; //Positive means need payback from others
            }
        });

        let payBackUser = payDifferences.filter(d => d.difference < 0);
        let receivePayBackUser = payDifferences.filter(d => d.difference > 0);
        payBackUser.forEach(p => {
            receivePayBackUser.forEach(r => {
                let t = new Transfer();
                t.amount = Math.abs(r.difference / payBackUser.length);
                t.fromUser = p.user;
                t.toUser = r.user;
                transfers.push(t);
            })
        })
        this.transfersSubject.next(transfers);
    }


}