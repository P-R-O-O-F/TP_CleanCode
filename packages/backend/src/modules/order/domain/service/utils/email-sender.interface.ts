export interface EmailSenderInterface {
    sendEmail(order: Order): void;
  }