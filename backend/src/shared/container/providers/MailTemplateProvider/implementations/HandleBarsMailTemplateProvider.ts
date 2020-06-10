import handlebars from 'handlebars';

import IMailTemplateProvider from '../models/IMailTemplateProvider';
import IParseMailTemplateDTO from '../dtos/IParseMailTemplateDTO';

export default class HandleBarsMailTemplateProvider
  implements IMailTemplateProvider {
  public async parseTemplate({
    template,
    variables,
  }: IParseMailTemplateDTO): Promise<string> {
    const parse = handlebars.compile(template);

    return parse(variables);
  }
}
