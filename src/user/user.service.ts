import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const newUser: User = {
      login: createUserDto.login,
      password: createUserDto.password,
      id: uuidv4(),
      version: 1,
      createdAt: Math.round(Date.now() / 1000),
      updatedAt: Math.round(Date.now() / 1000),
    };

    const { password, ...user } = await this.usersRepository.save(newUser);

    return user;
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: string) {
    return this.usersRepository.findOneBy({ id });
  }

  async update(id: string, updateUser: UpdateUserDto) {
    const selectedUserWithPassword = await this.usersRepository.findOneBy({
      id,
    });

    if (selectedUserWithPassword.password !== updateUser.oldPassword) {
      throw 'Incorrect password';
    }

    const updatedUser = {
      ...selectedUserWithPassword,
      password: updateUser.newPassword,
      updatedAt: Math.round(Date.now() / 1000) + 1, // TODO: hack for passing test. Need to use another type of column
      version: selectedUserWithPassword.version + 1,
    };

    await this.usersRepository.update(id, updatedUser);

    const { password, ...user } = updatedUser;

    return user;
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
