import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Order from '@src/modules/order/domain/model/entity/order.orm-entity';
import OrderRepository from '@src/modules/order/infrastructure/repository/order.repository';
import OrderController from '@src/modules/order/presentation/controller/order.controller';
import { GetAllOrdersService } from './domain/service/usecase/get-all-order.service';
import { OrderRepositoryInterface } from './domain/port/db/order.repository.interface';
import { findOrdersAfterDateService } from './domain/service/usecase/get-order-after-date.service';
import { findOrdersBeforeDateService } from './domain/service/usecase/get-order-before-date.service';
import { findOrdersByCustomerService } from './domain/service/usecase/get-order-by-customer.service';
import { PayOrderService } from './domain/service/usecase/pay-order.service';
import { CancelOrderService } from './domain/service/usecase/cancel-order.service';
import { DeleteOrderService } from './domain/service/usecase/delete-order.service';
import { CreateOrderService } from './domain/service/usecase/create-order.service';

@Module({
  imports: [TypeOrmModule.forFeature([Order])],
  controllers: [OrderController],
  providers: [
    {
      provide: 'OrderRepositoryInterface',
      useClass: OrderRepository,
    },
    {
      provide: GetAllOrdersService,
      useFactory: (orderRepository: OrderRepositoryInterface) => {
        return new GetAllOrdersService(orderRepository);
      },
      inject: ['OrderRepositoryInterface'],
    },
    {
      provide: findOrdersAfterDateService,
      useFactory: (orderRepository: OrderRepositoryInterface) => {
        return new findOrdersAfterDateService(orderRepository);
      },
      inject: ['OrderRepositoryInterface'],
    },
    {
      provide: findOrdersBeforeDateService,
      useFactory: (orderRepository: OrderRepositoryInterface) => {
        return new findOrdersBeforeDateService(orderRepository);
      },
      inject: ['OrderRepositoryInterface'],
    },
    {
      provide: findOrdersByCustomerService,
      useFactory: (orderRepository: OrderRepositoryInterface) => {
        return new findOrdersByCustomerService(orderRepository);
      },
      inject: ['OrderRepositoryInterface'],
    },
    {
      provide: PayOrderService,
      useFactory: (orderRepository: OrderRepositoryInterface) => {
        return new PayOrderService(orderRepository);
      },
      inject: ['OrderRepositoryInterface'],
    },
    {
      provide: CancelOrderService,
      useFactory: (orderRepository: OrderRepositoryInterface) => {
        return new CancelOrderService(orderRepository);
      },
      inject: ['OrderRepositoryInterface'],
    },
    {
      provide: DeleteOrderService,
      useFactory: (orderRepository: OrderRepositoryInterface) => {
        return new DeleteOrderService(orderRepository);
      },
      inject: ['OrderRepositoryInterface'],
    },
    {
      provide: CreateOrderService,
      useFactory: (orderRepository: OrderRepositoryInterface) => {
        return new CreateOrderService(orderRepository);
      },
      inject: ['OrderRepositoryInterface'],
    },
  ],
})
export default class OrderModule {}
