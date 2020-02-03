import { User } from './User';
import { Bill } from './Bill';
import { Item } from './Item';

export class ItemBill {
    id: number;
    users: User[];
    bill: Bill;
    item: Item;
    quantity: number;
    itemType: string; //'single' or 'share'
    price: number;
}
