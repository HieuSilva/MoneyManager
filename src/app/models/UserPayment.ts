import { Bill } from './Bill';
import { User } from './User';

export class UserPayment {
    id: number;
    bill: Bill;
    user: User;
    amount: number;
}