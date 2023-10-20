import { OrderRepositoryInterface } from '../../port/db/order.repository.interface';
import OrderRepository from '@src/modules/order/infrastructure/repository/order.repository';

export class DeleteOrderService {
    constructor(private readonly orderRepository: OrderRepository) {}

    async deleteOrder(orderId: string): Promise<void> { 
        const order = await this.orderRepository.findById(orderId);
        if (!order) {
            throw new Error(`Order with id ${orderId} not found`);
        }
        await this.orderRepository.delete(order);
    }
}
