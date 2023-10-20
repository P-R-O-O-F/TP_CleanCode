import { RepositoryInterface } from '@src/modules/shared/domain/port/db/repository.interface';
import Order from '../../model/entity/order.orm-entity';

export interface OrderRepositoryInterface extends RepositoryInterface { 

    findAllOrders(): Promise<Order[]> ;
    findOrdersBeforeDate(date: Date): Promise<Order[]> ;
    findOrdersAfterDate(date: Date): Promise<Order[]> ;
    findOrdersByCustomer(customer: string): Promise<Order[]> ;
    payOrder(id: string): Promise<Order> ;
    cancelOrder(id: string): Promise<Order> ;
    deleteOrder(id: string): Promise<void> ;
    createOrder(): Promise<Order> ;
}