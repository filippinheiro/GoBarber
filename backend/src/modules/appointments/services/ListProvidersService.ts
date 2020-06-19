import { injectable, inject } from 'tsyringe';
import { classToClass } from 'class-transformer';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import User from '@modules/users/infra/typeorm/entities/User';

interface RequestDTO {
  user_id: string;
}

@injectable()
export default class ListProvidersService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ user_id }: RequestDTO): Promise<User[]> {
    let users = await this.cacheProvider.retrieve<User[]>(
      `providers_list:${user_id}`,
    );

    if (!users) {
      users = await this.usersRepository.findAllProviders({
        exceptsId: user_id,
      });

      await this.cacheProvider.save(
        `providers_list:${user_id}`,
        classToClass(users),
      );
    }

    return users;
  }
}
