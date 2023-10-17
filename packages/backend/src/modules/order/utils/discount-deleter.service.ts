export class DiscountDeleterService implements DiscountDeleterInterface {
    deleteDiscount(order) {
        order.discount = 0;
    }
}