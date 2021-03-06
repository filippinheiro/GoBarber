import IMailProvider from '../models/IMailProvider';
import IMessageDTO from '../dtos/IMessageDTO';

export default class FakeMailProvider implements IMailProvider {
  private messages: IMessageDTO[] = [];

  public async sendMail(message: IMessageDTO): Promise<void> {
    this.messages.push(message);
  }
}
