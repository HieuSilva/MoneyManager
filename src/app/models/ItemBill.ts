import { User } from './User';
import { Bill } from './Bill';
import { Item } from './Item';

export class ItemBill {
    id: number;
    user: User;
    bill: Bill;
    item: Item;
    quantity: number;
    price: number;
}