import AppError from '@shared/errors/AppError';

import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import UpdateProfileService from '../services/UpdateProfileService';
import IUsersRepository from '../repositories/IUsersRepository';

let fakeUsersRepository: IUsersRepository;
let fakeHashProvider: IHashProvider;

let updateProfile: UpdateProfileService;

describe('Update Profile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    updateProfile = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it(`should be able to update user's data`, async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123321',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'John Trololo',
      email: 'johntrololo@example.com',
    });

    expect(updatedUser.name).toBe('John Trololo');
    expect(updatedUser.email).toBe('johntrololo@example.com');
  });

  it(`should be not able to update the profile of a non existent user`, async () => {
    await expect(
      updateProfile.execute({
        user_id: 'user-id-do-not-exist',
        name: 'John Trololo',
        email: 'johntrololo@example.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to change email to one already registered', async () => {
    await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123321',
    });

    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe2@example.com',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'John Trololo',
        email: 'johndoe@example.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it(`should be able to update user's password`, async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123321',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'John Trololo',
      email: 'johntrololo@example.com',
      old_password: '123321',
      password: '123456',
    });

    expect(updatedUser.password).toBe('123456');
  });

  it(`should not be able to update user's password without providing the previous one`, async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123321',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'John Trololo',
        email: 'johntrololo@example.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it(`should not be able to update user's password with wrong old password`, async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123321',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'John Trololo',
        email: 'johntrololo@example.com',
        old_password: '123333322',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
