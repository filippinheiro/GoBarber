interface IMessage {
  to: string;
  body: string;
}

export default interface IMailProvider {
  sendMail(message: IMessage): Promise<void>;
}
