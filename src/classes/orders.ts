import { Entity } from '@/interfaces/entity';
import { OrderItem } from './order_item';

export class Orders implements Entity {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    order_item: OrderItem[];

    constructor(id: number = 0, first_name: string = '', last_name: string = '', email: string = '', order_item: any[] = []) {
        this.id = id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.email = email;
        this.order_item = order_item;
    }
}