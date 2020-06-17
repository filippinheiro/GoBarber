import IParseMailDTO from '../../MailTemplateProvider/dtos/IParseMailTemplateDTO';

interface IMailContact {
  name: string;
  email: string;
}

export default interface IMessage {
  to: IMailContact;
  from?: IMailContact;
  subject: string;
  templateData: IParseMailDTO;
}
