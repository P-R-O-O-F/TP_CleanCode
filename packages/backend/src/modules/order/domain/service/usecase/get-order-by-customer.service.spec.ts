import { Test } from '@nestjs/testing';
import OrderRepository from '@src/modules/order/infrastructure/repository/order.repository';
import { BadRequestException } from '@nestjs/common';
import orderController from '@src/modules/order/presentation/controller/order.controller';
import { findOrdersByCustomerService } from './get-order-by-customer.service';


describe('OrderController', () => {
    

    describe('getAllOrdersByCustomer', () => {
        it('should return all orders for a given customer', async () => {
            const OrderMock = [
                {
                  customer : 'JeanPierre',
                },
            ];

              const orderRepositoryMock = {
                findOrdersByCustomer: () => OrderMock,
              };

              const findOrderByCustomerService = new findOrdersByCustomerService(orderRepositoryMock);

              const returnValue = await findOrderByCustomerService.findOrdersByCustomer('JeanPierre');
          
              expect(returnValue).toEqual(OrderMock);

        });

        it('should throw BadRequestException if customerId is not provided', async () => {
            const OrderMock = [
                {
                  customer : undefined,
                },
            ];

              const orderRepositoryMock = {
                findOrdersByCustomer: () => OrderMock,
              };

              const getOrderByCustomerService = new findOrdersByCustomerService(orderRepositoryMock);

          
              await expect(getOrderByCustomerService.findOrdersByCustomer('DomIsFamily4Ever')).rejects.toThrow();
        });
    });
});
