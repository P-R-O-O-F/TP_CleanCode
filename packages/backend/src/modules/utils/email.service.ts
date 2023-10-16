class EmailController {

    async sendEmail(emailContent: string, emailSubject: string, emailTo: string): Promise<void> {
        const mailOptions {
            from: 'your-email@example.com',
            to: emailTo,
            subject: emailSubject,
            html: emailContent,
        };

        await this.sendMail(mailOptions);
    }
}

