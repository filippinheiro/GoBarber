import IMailProvider from '../models/IMailProvider';

interface IMessage {
  to: string;
  body: string;
}

export default class FakeMailProvider implements IMailProvider {
  private messages: IMessage[] = [];

  public async sendMail({ to, body }: IMessage): Promise<void> {
    this.messages.push({
      to,
      body,
    });
  }
}
