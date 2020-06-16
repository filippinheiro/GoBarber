import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';

import IUsersRepository from '../repositories/IUsersRepository';
import ShowProfileService from '../services/ShowProfileService';

let fakeUsersRepository: IUsersRepository;
let showProfile: ShowProfileService;

describe('Show Profile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    showProfile = new ShowProfileService(fakeUsersRepository);
  });

  it(`should be able to show the profile`, async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123321',
    });

    const profile = await showProfile.execute({
      user_id: user.id,
    });

    expect(profile.name).toBe('John Doe');
    expect(profile.email).toBe('johndoe@example.com');
  });

  it(`should be not able to show the profile of a non existent user`, async () => {
    await expect(
      showProfile.execute({
        user_id: 'user-id-do-not-exist',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
