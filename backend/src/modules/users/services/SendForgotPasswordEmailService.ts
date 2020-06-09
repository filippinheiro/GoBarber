import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';

import IUsersRepository from '../repositories/IUsersRepository';
import IUserTokensRepository from '../repositories/IUserTokensRepository';

interface RequestDTO {
  email: string;
}

@injectable()
export default class SendForgotPasswordEmailService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,

    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,
  ) {}

  public async execute({ email }: RequestDTO): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) throw new AppError('This account is not registered');

    await this.userTokensRepository.generate(user.id);

    await this.mailProvider.sendMail({
      to: email,
      body: 'Pedido de recuperação de senha recebido',
    });
  }
}
