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
} from '@nestjs/common';
import { validate } from 'uuid';
import { AlbumService } from './album.service';
import { TrackService } from '../track/track.service';
import { AlbumDto } from './dto/album.dto';
import { Album } from './entities/album.entity';

@Controller('album')
export class AlbumController {
  constructor(
    private readonly albumService: AlbumService,
    private readonly trackService: TrackService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createAlbumDto: AlbumDto): Promise<Album> {
    return await this.albumService.create(createAlbumDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll() {
    return this.albumService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id') id: string) {
    if (!validate(id)) {
      throw new BadRequestException('bad request');
    }

    const selectedAlbum = await this.albumService.findOne(id);

    if (!selectedAlbum) {
      throw new NotFoundException('not found');
    }

    return this.albumService.findOne(id);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async update(@Param('id') id: string, @Body() updateAlbumDto: AlbumDto) {
    if (!validate(id)) {
      throw new BadRequestException('bad request');
    }

    const selectedAlbum = await this.albumService.findOne(id);

    if (!selectedAlbum) {
      throw new NotFoundException('not found');
    }

    const updatedAlbum = {
      ...selectedAlbum,
      ...updateAlbumDto,
    };

    await this.albumService.update(id, updatedAlbum);

    return updatedAlbum;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    if (!validate(id)) {
      throw new BadRequestException('bad request');
    }

    const selectedAlbum = await this.albumService.findOne(id);

    if (!selectedAlbum) {
      throw new NotFoundException('not found');
    }

    // SMELLS: Need to use relations between tables
    const allTracks = await this.trackService.findAll();
    const allTracksWithId = allTracks.filter((track) => track.albumId === id);

    allTracksWithId.forEach(async (track) => {
      await this.trackService.update(track.id, { ...track, albumId: null });
    });

    return this.albumService.remove(id);
  }
}
