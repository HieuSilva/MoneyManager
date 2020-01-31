import { ItemBill } from './ItemBill';
import { UserPayment } from './UserPayment';

export class Bill {
    id: number;
    total: number;
    dateCreated: Date;
    description? : string;
    items: ItemBill[];
    userPayments: UserPayment[];
}