import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserStore } from '../inMemoryDB';
import { User } from './dto/user.dto'; // TODO: use user entity

@Injectable()
export class UserService {
  create(createUserDto: CreateUserDto) {
    return UserStore.create(createUserDto);
  }

  findAll() {
    return UserStore.findAll();
  }

  findOne(id: string) {
    return UserStore.findOne(id);
  }

  update(updateUserDto: UpdateUserDto, selectedUser: User) {
    return UserStore.update(updateUserDto, selectedUser);
  }

  remove(id: string) {
    return UserStore.remove(id);
  }
}
