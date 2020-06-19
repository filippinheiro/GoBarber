import { container } from 'tsyringe';

import IMailTemplateProvider from './models/IMailTemplateProvider';
import HandleBarsTemplateProvider from './implementations/HandleBarsMailTemplateProvider';

const providers = {
  handlebars: HandleBarsTemplateProvider,
};

container.registerSingleton<IMailTemplateProvider>(
  'MailTemplateProvider',
  providers.handlebars,
);
