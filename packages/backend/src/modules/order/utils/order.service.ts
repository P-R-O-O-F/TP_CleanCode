export class OrderService {
    constructor(
      private readonly productRepository: ProductRepository,
      private readonly orderRepository: OrderRepository
    ) {}
  
    async getOrder(orderId: number): Promise<Order> {
      const orderFromDb = await this.orderRepository.find({ id: orderId });
      if (!orderFromDb) {
        throw new Exception("Order not found");
      }
      return orderFromDb;
    }
    async getProduct(productId: number): Promise<Product> {
        const productFromDb = await this.productRepository.find({ id: productId });
        if (!productFromDb) {
            throw new Exception("Product not found");
        }
        return productFromDb;
        }
  
    async saveProductInOrder(productFromDb: Product, productQuantity: number, orderFromDb: Order): Promise<Order> {
      productFromDb.quantityMax -= productQuantity;
      orderFromDb.products.push(productFromDb);
      await this.orderRepository.save(orderFromDb);
    }
  }
  