import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';

describe('CreateUser', () => {
  it('should be able to create a new user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const createUser = new CreateUserService(fakeUsersRepository);

    const appointment = await createUser.execute({
      name: 'Renato Lôbo',
      email: "renato@rennato.com",
      password: "123456",
    });

    expect(appointment).toHaveProperty('id');
  });

  it('should not be able to create a new user with same email from another', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const createUser = new CreateUserService(fakeUsersRepository);

    const appointment = await createUser.execute({
      name: 'Renato Lôbo',
      email: "renato@rennato.com",
      password: "123456",
    });

    expect(createUser.execute({
      name: 'Renato Lôbo',
      email: "renato@rennato.com",
      password: "123456",
    }),
    ).rejects.toBeInstanceOf(AppError);
  });
})
