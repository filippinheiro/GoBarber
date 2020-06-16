import IMessageDTO from '../IMessageDTO';

export default interface IMailProvider {
  sendMail(message: IMessageDTO): Promise<void>;
}
