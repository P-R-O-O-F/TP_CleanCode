import { Injectable } from '@nestjs/common';
import Order from '../../model/entity/order.orm-entity';
import { OrderRepositoryInterface } from '../../port/db/order.repository.interface';


@Injectable()
export class GetAllOrdersService {
  
  constructor(private readonly orderRepository: OrderRepositoryInterface) {}

  async findAllOrders(): Promise<Order[]> {
    return await this.orderRepository.findAllOrders();    
  }
}