import { BadRequestException } from '@nestjs/common';
import OrderRepository from '@src/modules/order/infrastructure/repository/order.repository';
import Order from '../../model/entity/order.orm-entity';

export class findOrdersByCustomerService {
    constructor(private readonly orderRepository: OrderRepository) {}

    async findOrdersByCustomer(customer: string) : Promise <Order[]>{
        const regex = /^[a-zA-Z ]+$/;

        if (customer.length < 6 || !regex.test(customer)) {
            throw new BadRequestException('Invalid customer name');
        }

        const orders = await this.orderRepository.findOrdersByCustomer(customer);
        
        return orders;
    }
}
