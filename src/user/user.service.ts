import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { inMemoryDB } from '../inMemoryDB';
import { User } from './dto/user.dto'; // TODO: use user entity

@Injectable()
export class UserService {
  create(createUserDto: CreateUserDto) {
    return inMemoryDB.create(createUserDto);
  }

  findAll() {
    return inMemoryDB.findAll();
  }

  findOne(id: string) {
    return inMemoryDB.findOne(id);
  }

  update(updateUserDto: UpdateUserDto, selectedUser: User) {
    return inMemoryDB.update(updateUserDto, selectedUser);
  }

  remove(id: string) {
    return inMemoryDB.remove(id);
  }
}
