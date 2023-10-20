import email.sender.interface.ts;
export class EmailSenderService implements EmailSenderInterface {
    sendEmail(order: Order): void {
        if (order.user.name === 'Jean Pierre') {
            console.log('Sending email to Jean Pierre');
          }
        if (order.date().getDay() === 25) {
            console.log('Sending email to all customers');
          }
    }
  }