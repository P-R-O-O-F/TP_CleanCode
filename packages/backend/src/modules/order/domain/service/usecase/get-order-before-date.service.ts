import Order from '../../model/entity/order.orm-entity';
import { OrderRepositoryInterface } from '../../port/db/order.repository.interface';
import { Injectable } from '@nestjs/common';


@Injectable()
export class findOrdersBeforeDateService {
    
    constructor(private readonly orderRepository: OrderRepositoryInterface) {}

    async findOrdersBeforeDate(date : string) : Promise<Order[]>{
        const formattedDate = new Date(date);
        return await this.orderRepository.findOrdersBeforeDate(formattedDate);
    }


}

