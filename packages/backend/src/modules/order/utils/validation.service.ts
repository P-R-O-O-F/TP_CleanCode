export class ValidationService {
    private maxProductInOrder = 10;
    
    validateProductQuantity(productQuantity: number): void {
      if (productQuantity > this.maxProductInOrder) {
        throw new Exception(
          `Product quantity too high, can't be more than ${this.maxProductInOrder}`
        );
      }
    }
    
    validateProductStock(productFromDb: Product, productQuantity: number): void {
      if (productFromDb.quantityMax < productQuantity) {
        throw new Exception("Not enough products in stock");
      }
    }
  }