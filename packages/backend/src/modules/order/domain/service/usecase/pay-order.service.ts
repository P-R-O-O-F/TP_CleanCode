import { OrderStatusEnum } from '../../model/const/order-status.enum';
import Order from '../../model/entity/order.orm-entity';
import { OrderRepositoryInterface } from '../../port/db/order.repository.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PayOrderService {
    constructor(private readonly orderRepository: OrderRepository) {}

    async payOrder(Id: string): Promise<Order> {
        const order = await this.orderRepository.findById(Id);

        if (!order) {
            throw new Error(`Order with id ${Id} not found`);
        }

        if (order.isPaid()) {
            throw new Error(`Order with id ${Id} is already paid`);
        }

        order.status = OrderStatusEnum.Paid;

        return this.orderRepository.save(order);
    }
}
