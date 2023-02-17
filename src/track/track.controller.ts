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
import { TrackService } from './track.service';
import { TrackDTO } from './dto/track.dto';

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createTrackDto: TrackDTO) {
    console.log('!!!', createTrackDto);
    return this.trackService.create(createTrackDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll() {
    return this.trackService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id') id: string) {
    if (!validate(id)) {
      throw new BadRequestException('bad request');
    }

    const selectedTrack = await this.trackService.findOne(id);

    if (!selectedTrack) {
      throw new NotFoundException('not found');
    }

    return selectedTrack;
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async update(@Param('id') id: string, @Body() updateTrackDto: TrackDTO) {
    if (!validate(id)) {
      throw new BadRequestException('bad request');
    }

    const selectedTrack = await this.trackService.findOne(id);

    if (!selectedTrack) {
      throw new NotFoundException('not found');
    }

    const updatedTrack= {
      ...selectedTrack,
      ...updateTrackDto
    };

    return this.trackService.update(id, updatedTrack);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    if (!validate(id)) {
      throw new BadRequestException('bad request');
    }

    const selectedTrack = await this.trackService.findOne(id);

    if (!selectedTrack) {
      throw new NotFoundException('not found');
    }

    return this.trackService.remove(id);
  }
}
