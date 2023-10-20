import { OrderStatusEnum } from '../../model/const/order-status.enum';
import Order from '../../model/entity/order.orm-entity';
import { OrderRepositoryInterface } from '../../port/db/order.repository.interface';
import OrderRepository from '@src/modules/order/infrastructure/repository/order.repository';


export class CreateOrderService {
    constructor(private readonly orderRepository: OrderRepository) {}

    async createOrder(): Promise<Order> {
        const order = new Order();
        order.status = OrderStatusEnum.InCart;
        return await this.orderRepository.save(order);
    }
}
