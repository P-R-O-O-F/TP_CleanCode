import { Controller, Delete, Get, Param, Patch} from '@nestjs/common';
import Order from '../../domain/model/entity/order.orm-entity';
import { GetAllOrdersService } from '../../domain/service/usecase/get-all-order.service';
import { findOrdersBeforeDateService } from '../../domain/service/usecase/get-order-before-date.service';
import { findOrdersAfterDateService } from '../../domain/service/usecase/get-order-after-date.service';
import { findOrdersByCustomerService } from '../../domain/service/usecase/get-order-by-customer.service';
import { PayOrderService } from '../../domain/service/usecase/pay-order.service';


@Controller('/orders')
export default class OrderController {

    constructor(
        private readonly getAllOrdersService: GetAllOrdersService,
        private readonly findOrdersBeforeDateService: findOrdersBeforeDateService,
        private readonly findOrdersAfterDateService: findOrdersAfterDateService,
        private readonly findOrdersByCustomerService: findOrdersByCustomerService,
    ) {}
    

    @Get('/all')
    async getAllOrders(): Promise<Order[]> {
      return await this.getAllOrdersService.findAllOrders();
    }

    @Get('/before-date/:date')
    async getOrdersBeforeDate(@Param('date') date : string): Promise<Order[]> {
      return await this.findOrdersBeforeDateService.findOrdersBeforeDate(date);
    }
   
    @Get('/after-date/:date')
    async getOrdersAfterDate(@Param('date') date : string): Promise<Order[]> {
      return await this.findOrdersAfterDateService.findOrdersAfterDate(date);
    }

    @Get('/order-by-customer/:customer')
    async getOrdersByCustomer(@Param('customer') customer : string): Promise<Order[]> {
      return await this.findOrdersByCustomerService.findOrdersByCustomer(customer);
    }
    
    @Patch('/:id/paid')
  async payOrder(@Param('id') id: string): Promise<OrderPresenter> {
    const paidOrder = await this.PayOrderService.payOrder(id);

    return new OrderPresenter(paidOrder);
  }

  @Patch('/:id/cancel')
  async cancelOrder(@Param('id') id: string): Promise<OrderPresenter> {
    const cancelledOrder = await this.CancelOrderService.cancelOrder(id);

    return new OrderPresenter(cancelledOrder);
  }

  @Delete('/:id/delete')
  async deleteOrder(@Param('id') id: string): Promise<OrderPresenter> {
    const deletedOrder = await this.DeleteOrderService.deleteOrder(id);

    return new OrderPresenter(deletedOrder);
  }

}

