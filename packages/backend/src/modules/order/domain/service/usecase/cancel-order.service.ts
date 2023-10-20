import { OrderRepositoryInterface } from '../../port/db/order.repository.interface';
import Order from '../../model/entity/order.orm-entity';
import { Injectable } from '@nestjs/common';
import OrderRepository from '@src/modules/order/infrastructure/repository/order.repository';

@Injectable()
export class CancelOrderService {
    constructor(private readonly orderRepository: OrderRepository) {}

    async cancelOrder(orderId: string): Promise<Order> {
        const order = await this.orderRepository.findById(orderId);
        if (!order) {
            throw new Error(`Order with id ${orderId} not found`);
        }
        if (order.status === 'cancelled') {
            throw new Error(`Order with id ${orderId} has already been cancelled`);
        }
        order.status = 'Cancelled';
        return this.orderRepository.save(order);
    }
}
