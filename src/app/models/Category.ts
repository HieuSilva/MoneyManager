import { Item } from './Item';

export class Category {
    id: number;
    name: string;
    items: Item[];
    description?: string;
}