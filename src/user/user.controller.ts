import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  NotFoundException,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { validate } from 'uuid';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createUserDto: CreateUserDto) {
    if (!createUserDto.login || !createUserDto.password) {
      throw new BadRequestException('bad request');
    }

    return this.userService.create(createUserDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id') id: string) {
    if (!validate(id)) {
      throw new BadRequestException('bad request');
    }

    const selectedUser = await this.userService.findOne(id);

    if (!selectedUser) {
      throw new NotFoundException('not found');
    }

    return selectedUser;
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    if (!validate(id)) {
      throw new BadRequestException('bad request');
    }

    if (!updateUserDto.oldPassword || !updateUserDto.newPassword) {
      throw new BadRequestException('bad request');
    }

    const selectedUser = await this.userService.findOne(id);

    if (!selectedUser) {
      throw new NotFoundException('not found');
    }

    try {
      const updatedUser = await this.userService.update(id, updateUserDto);
      return updatedUser;
    } catch (e) {
      if (e === 'Incorrect password') {
        throw new ForbiddenException('Incorrect password');
      }
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    if (!validate(id)) {
      throw new BadRequestException('bad request');
    }

    const selectedUser = await this.userService.findOne(id);

    if (!selectedUser) {
      throw new NotFoundException('not found');
    }

    return this.userService.remove(id);
  }
}
