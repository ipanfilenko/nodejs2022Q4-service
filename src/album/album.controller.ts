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
import { AlbumService } from './album.service';
import { Album } from './dto/album.dto';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createAlbumDto: Album) {
    return this.albumService.create(createAlbumDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll() {
    return this.albumService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: string) {
    if (!validate(id)) {
      throw new BadRequestException('bad request');
    }

    const selectedAlbum = this.albumService.findOne(id);

    if (!selectedAlbum) {
      throw new NotFoundException('not found');
    }

    return this.albumService.findOne(id);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  update(@Param('id') id: string, @Body() updateAlbumDto: Album) {
    if (!validate(id)) {
      throw new BadRequestException('bad request');
    }

    if (!updateAlbumDto.year || typeof updateAlbumDto.year !== 'number') {
      // TODO: should work with DTO
      throw new BadRequestException('bad request');
    }

    const selectedAlbum = this.albumService.findOne(id);

    if (!selectedAlbum) {
      throw new NotFoundException('not found');
    }

    const updatedAlbum = this.albumService.update(selectedAlbum, updateAlbumDto);
    return updatedAlbum;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    if (!validate(id)) {
      throw new BadRequestException('bad request');
    }

    const selectedAlbum = this.albumService.findOne(id);

    if (!selectedAlbum) {
      throw new NotFoundException('not found');
    }

    return this.albumService.remove(id);
  }
}
