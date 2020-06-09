import { uuid } from 'uuidv4';

import IUserRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import User from '../../infra/typeorm/entities/User';

export default class UsersRepository implements IUserRepository {
  private users: User[] = [];

  public async findById(id: string): Promise<User | undefined> {
    const findUser = this.users.find((item) => {
      return item.id === id;
    });

    return findUser;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const findUser = this.users.find((item) => {
      return item.email === email;
    });

    return findUser;
  }

  public async create(userData: ICreateUserDTO): Promise<User> {
    const newUser = new User();

    Object.assign(
      newUser,
      {
        id: uuid(),
      },
      userData,
    );

    this.users.push(newUser);

    return newUser;
  }

  public async save(user: User): Promise<User> {
    const findIndex = this.users.findIndex((item) => {
      return item.id === user.id;
    });

    this.users[findIndex] = user;

    return user;
  }
}
