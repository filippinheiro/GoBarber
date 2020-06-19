import { injectable, inject } from 'tsyringe';
import { differenceInHours } from 'date-fns';

import AppError from '@shared/errors/AppError';

import IUsersRepository from '../repositories/IUsersRepository';
import IUserTokensRepository from '../repositories/IUserTokensRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface RequestDTO {
  token: string;
  password: string;
}

@injectable()
export default class ResetPasswordService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,

    @inject('HashProvider')
    private HashProvider: IHashProvider,
  ) {}

  public async execute({ token, password }: RequestDTO): Promise<void> {
    const userToken = await this.userTokensRepository.decode(token);

    if (!userToken) throw new AppError('Missing authentication token');

    const user = await this.usersRepository.findById(userToken.user_id);

    if (user) {
      const tokenCreatedat = userToken.created_at;

      if (differenceInHours(Date.now(), tokenCreatedat) > 2) {
        throw new AppError('Token expired');
      }

      user.password = await this.HashProvider.generateHash(password);

      this.usersRepository.save(user);
      return;
    }

    throw new AppError('User does not exist');
  }
}
