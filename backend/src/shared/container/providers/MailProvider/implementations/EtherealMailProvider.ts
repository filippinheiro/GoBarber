import nodemailer, { Transporter } from 'nodemailer';

import IMailProvider, { IMessage } from '../models/IMailProvider';

export default class EtherealMailProvider implements IMailProvider {
  account: Promise<void | nodemailer.TestAccount>;

  client: Transporter;

  constructor() {
    this.account = nodemailer.createTestAccount().then((account) => {
      const transporter = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass,
        },
      });

      this.client = transporter;
    });
  }

  public async sendMail({ to, body }: IMessage): Promise<void> {
    const message = await this.client.sendMail({
      from: 'Equipe GoBarber <no-reply@example.com>',
      to,
      subject: 'Recuperação de senha',
      text: body,
    });

    console.log('Message sent: %s', message.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
  }
}
