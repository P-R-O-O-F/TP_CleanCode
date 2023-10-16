import { Controller, Post } from "@nestjs/common";

@Controller("/order")
export default class ProductToCartAdder {
  constructor(
    private readonly validationService: ValidationService,
    private readonly emailService: EmailService,
    private readonly orderService: OrderService
  ) {}

  @Post()
  async addProductToCart(request: Request): Promise<Order> {
    const { productId, productQuantity, orderId } = request.body;

    this.validationService.validateProductQuantity(productQuantity);

    const orderFromDb = await this.orderService.getOrder(orderId);
    const productFromDb = await this.orderService.getProduct({ id: productId });

    this.validationService.validateProductStock(productFromDb, productQuantity);

    const order = await this.orderService.saveProductInOrder(productFromDb, productQuantity, orderFromDb);

    await this.emailService.sendEmail(emailContent, emailSubject, emailTo);

    return order;
  }
}