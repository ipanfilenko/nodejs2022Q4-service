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
import { TrackService } from './track.service';
import { Track } from './dto/track.dto';

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createTrackDto: Track) {
    return this.trackService.create(createTrackDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll() {
    return this.trackService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: string) {
    if (!validate(id)) {
      throw new BadRequestException('bad request');
    }

    const selectedTrack = this.trackService.findOne(id);

    if (!selectedTrack) {
      throw new NotFoundException('not found');
    }

    return selectedTrack;
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  update(@Param('id') id: string, @Body() updateTrackDto: Track) {
    if (!validate(id)) {
      throw new BadRequestException('bad request');
    }


    if (!updateTrackDto.name || typeof updateTrackDto.name !== 'string') {
      // TODO: should work with DTO
      throw new BadRequestException('bad request');
    }

    const selectedTrack = this.trackService.findOne(id);

    if (!selectedTrack) {
      throw new NotFoundException('not found');
    }

    const updatedAlbum = this.trackService.update(selectedTrack, updateTrackDto);
    return updatedAlbum;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    if (!validate(id)) {
      throw new BadRequestException('bad request');
    }

    const selectedTrack = this.trackService.findOne(id);

    if (!selectedTrack) {
      throw new NotFoundException('not found');
    }

    return this.trackService.remove(id);
  }
}
