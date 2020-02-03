import { Subject } from 'rxjs';
import { ItemBill } from '../models/ItemBill';
import { User } from '../models/User';
import { Injectable } from '@angular/core';
import { UserService } from './user.service';

@Injectable()
export class BillService {

    constructor(private userService: UserService) {

    }
    itemsSubject: Subject<ItemBill[]> = new Subject<ItemBill[]>();

    changeItemList(items: ItemBill[], users: User[]) {
        items.forEach(item => {
            if(item.users.length === 0) {
                
            }
            item.users = item.users.filter(u => users.findIndex(user => user.id == u.id) != -1);
        })
    }

}