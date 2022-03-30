import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { UserEntity } from 'src/domain/user/entities/user.entity';
import { USER_REPOSITORY } from '../repositories/user/constants';
import { UserController } from './user.controller';

describe('AppController', () => {
  let controller: UserController;
  const USER_PROPS = {
    createdAt: new Date('2022-03-30T12:44:01.140Z'),
    followersCount: 0,
    followingCount: 0,
    id: '1',
    postsCount: 0,
    username: 'MockUsername',
  };

  const mockUserRepository = {
    findOneById: jest.fn().mockReturnValue(new UserEntity(USER_PROPS)),
  };
  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: USER_REPOSITORY,
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    controller = app.get<UserController>(UserController);
  });

  describe('users', () => {
    it('should return user data when the user is found', async () => {
      const user = await controller.findOne('1');
      expect(user).toEqual({
        ...USER_PROPS,
        createdAt: '2022-03-30T12:44:01.140Z',
      });
    });

    it('should throw exception when user is not found', () => {
      mockUserRepository.findOneById.mockReturnValueOnce(undefined);
      expect(controller.findOne('1')).rejects.toBeInstanceOf(NotFoundException);
    });
  });
});
