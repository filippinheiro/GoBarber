import IMessageDTO from '../dtos/IMessageDTO';

export default interface IMailProvider {
  sendMail(message: IMessageDTO): Promise<void>;
}
