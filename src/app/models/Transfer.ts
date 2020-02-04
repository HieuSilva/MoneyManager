import { User } from "./User";

export class Transfer {
    fromUser: User;
    toUser: User;
    amount: number = 0;
}