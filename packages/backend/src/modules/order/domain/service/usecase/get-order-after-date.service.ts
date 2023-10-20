import { Inject, Injectable } from '@nestjs/common';
import OrderRepository from '@src/modules/order/infrastructure/repository/order.repository';
import { OrderRepositoryInterface } from '../../port/db/order.repository.interface';
import Order from '../../model/entity/order.orm-entity';



@Injectable()
export class findOrdersAfterDateService {
    
    constructor(private readonly orderRepository: OrderRepositoryInterface) {}

    async findOrdersAfterDate(date : string) : Promise<Order[]>{
        const formattedDate = new Date(date);
        return await this.orderRepository.findOrdersAfterDate(formattedDate);
    }


}

