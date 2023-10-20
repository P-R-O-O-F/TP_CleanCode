import { DataSource, Repository } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';
import Order from '@src/modules/order/domain/model/entity/order.orm-entity';
import { OrderRepositoryInterface } from '../../domain/port/db/order.repository.interface';
import { OrmEntityToDomainEntityMapper } from '@src/modules/shared/infrastructure/db/ormEntityToDomainEntityMapper.service';
import { Inject } from '@nestjs/common';

export default class OrderRepository extends Repository<Order> implements OrderRepositoryInterface {

  constructor(
    @InjectDataSource()
    private readonly datasource: DataSource,

    @Inject(OrmEntityToDomainEntityMapper)
    private readonly ormEntityToDomainEntityMapper: OrmEntityToDomainEntityMapper,
  ) {
    super(Order, datasource.createEntityManager());
  }

  
  async findOrdersAfterDate(date: Date) {
    const query = this.createQueryBuilder('order');

    query.where('order.createdAt > :date', { date: date });
    const OrderOrm = await query.getMany();

    return this.mapOrdersOrmToOrders(OrderOrm);
  }

  
  async findOrdersBeforeDate(date: Date) {
    const query = this.createQueryBuilder('order');

    query.where('order.createdAt < :date', { date: date });
    const OrderOrm = await query.getMany();

    return this.mapOrdersOrmToOrders(OrderOrm);
  }

  async findAllOrders(): Promise<Order[]> {
    const query = this.createQueryBuilder('Order');

    const OrderOrm = await query.getMany();

    return this.mapOrdersOrmToOrders(OrderOrm);
  }

  async findOrdersByCustomer(customer: string): Promise<Order[]> {

    const query = this.createQueryBuilder('order');

    query.where('order.customer = :customer', { customer });
    const OrderOrm = await query.getMany();

    return this.mapOrdersOrmToOrders(OrderOrm);
  }

  async payOrder(id: string): Promise<Order> {
    const query = this.createQueryBuilder('order');
    query.where('order.id = :id', { id });
    const orderOrm = await query.getOne();
    orderOrm.payOrder();

    return this.save(orderOrm);
  }
  async cancelOrder(id: string): Promise<Order> {
    const query = this.createQueryBuilder('order');
    query.where('order.id = :id', { id });
    const orderOrm = await query.getOne();
    orderOrm.cancelOrder();

    return this.save(orderOrm);
  }
  async deleteOrder(id: string): Promise<Order> {
    const query = this.createQueryBuilder('order');
    query.where('order.id = :id', { id });
    const orderOrm = await query.getOne();
    orderOrm.deleteOrder();

    return this.save(orderOrm);
  }

  async findById(id: string): Promise<Order> {
    const query = this.createQueryBuilder('order');
    query.where('order.id = :id', { id });
    const orderOrm = await query.getOne();

    return this.mapOrderOrmToOrder(orderOrm);
  }

  async createOrder(order: Order): Promise<Order> {
    const orderOrm = this.mapOrderToOrderOrm(order);

    return this.save(orderOrm);
  }
  
  private mapOrderOrmToOrder(orderOrm: Order): Order {
    const order = this.ormEntityToDomainEntityMapper.mapOrmEntityToDomainEntity<Order>(orderOrm, new Order());

    return order;
  }
  private mapOrdersOrmToOrders(orderOrm: Order[]): Order[] {
    return orderOrm.map((orderOrm) => this.mapOrderOrmToOrder(orderOrm));
  }
}
