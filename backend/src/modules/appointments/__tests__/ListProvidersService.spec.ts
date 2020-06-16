import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ListProvidersService from '../services/ListProvidersService';

let fakeUsersRepository: IUsersRepository;
let listProviders: ListProvidersService;

describe('List Providers', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    listProviders = new ListProvidersService(fakeUsersRepository);
  });

  it('should be able to list the providers', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123321',
    });

    const user1 = await fakeUsersRepository.create({
      name: 'John La',
      email: 'johnla@example.com',
      password: '123321',
    });

    const user2 = await fakeUsersRepository.create({
      name: 'John co',
      email: 'johnco@example.com',
      password: '123321',
    });

    const loggedUser = await fakeUsersRepository.create({
      name: 'John li',
      email: 'johnli@example.com',
      password: '123321',
    });

    const providers = await listProviders.execute({
      user_id: loggedUser.id,
    });

    expect(providers).toEqual([user, user1, user2]);
    expect(providers).not.toContainEqual(loggedUser);
  });
});
