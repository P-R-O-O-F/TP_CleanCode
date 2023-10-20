export class ValidorderService {

    constructor(
        private readonly orderRepository: OrderRepository,
       // private readonly discountCalculatorByLoyaltyService: DiscountCalculatorByLoyaltyService,
        //private readonly discountCalculatorByCustomerJeanPierreService: DiscountCalculatorByCustomerJeanPierreService,
        private readonly discountCalculatorServices: DiscountCalculatorServicesInterface[]
    ) {}

    valideOrder'orderId : number) : Order {

        const order = this.orderRepository.findOne(orderId);
        let total = 0;

        order.products.foreach((product) => {
            total += product.price;
        });

        //total = this.discountCalculatorByLoyaltyService.calculateDiscount(order, total);

        this.discountCalculatorServices.foreach((discountCalculatorService) => {
            total = discountCalculatorService.calculate(order, total);
        });

        order.total = total;
        order.status = 'Completed';

        return order;
    }
}