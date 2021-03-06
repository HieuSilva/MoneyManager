import { User } from '../models/User';
import { Subject } from 'rxjs';

const userList = [
    {
        id: 1,
        name: 'hieu',
        nickname: '',
        password: null
    },
    {
        id: 2,
        name: 'binh',
        nickname: '',
        password: null
    },
    {
        id: 3,
        name: 'duc',
        nickname: '',
        password: null
    },
    {
        id: 4,
        name: 'phuc',
        nickname: '',
        password: null
    },
    {
        id: 5,
        name: 'trung',
        nickname: '',
        password: null
    }
]
export class UserService {

    // users: User[] = [];
    users: User[] = userList;
    usersSubject: Subject<User[]> = new Subject<User[]>();

    createUser(name: string) {
        let newUser = {
            id: 1,
            name: name,
            nickname: name,
            password: null
        };
        if(this.users.length > 0) {
            let newId = this.users.sort((u1, u2) => {
                return u1.id - u2.id;
            })[0].id + 1;
            newUser.id = newId;
        }
        this.users.push(newUser);
        this.usersSubject.next(this.getUsers());
    }

    removeUser(userIndex: number){
        this.users.splice(userIndex, 1);
        this.usersSubject.next(this.getUsers());
    }

    getUsers() {
        return this.users.slice();
    }
}