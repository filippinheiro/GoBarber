import IMailTemplateProvider from '../models/IMailTemplateProvider';
import IParseMailTemplateDTO from '../dtos/IParseMailTemplateDTO';

export default class FakeMailTemplateProvider implements IMailTemplateProvider {
  public async parseTemplate({
    template,
  }: IParseMailTemplateDTO): Promise<string> {
    return template;
  }
}
