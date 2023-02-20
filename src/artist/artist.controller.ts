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
import { ArtistService } from './artist.service';
import { TrackService } from '../track/track.service';
import { Artist } from './entities/artist.entity';
import { ArtistDTO } from './dto/artist.dto';

@Controller('artist')
export class ArtistController {
  constructor(
    private readonly artistService: ArtistService,
    private readonly trackService: TrackService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createArtistDto: ArtistDTO): Promise<Artist> {
    return this.artistService.create(createArtistDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll() {
    return this.artistService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id') id: string) {
    if (!validate(id)) {
      throw new BadRequestException('bad request');
    }

    const selectedArtist = await this.artistService.findOne(id);

    if (!selectedArtist) {
      throw new NotFoundException('not found');
    }

    return selectedArtist;
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async update(@Param('id') id: string, @Body() artistDTO: ArtistDTO) {
    if (!validate(id)) {
      throw new BadRequestException('bad request');
    }

    if (!artistDTO.name || typeof artistDTO.name !== 'string') {
      // TODO: should work with DTO
      throw new BadRequestException('bad request');
    }

    const selectedArtist = await this.artistService.findOne(id);

    if (!selectedArtist) {
      throw new NotFoundException('not found');
    }

    const updatedArtist = {
      ...selectedArtist,
      ...artistDTO,
    };

    return this.artistService.update(id, updatedArtist);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    if (!validate(id)) {
      throw new BadRequestException('bad request');
    }

    const selectedArtist = await this.artistService.findOne(id);

    if (!selectedArtist) {
      throw new NotFoundException('not found');
    }

    // SMELLS: Need to use relations between tables
    const allTracks = await this.trackService.findAll();
    const allTracksWithId = allTracks.filter((track) => track.artistId === id);

    allTracksWithId.forEach(async (track) => {
      await this.trackService.update(track.id, { ...track, artistId: null });
    });

    return this.artistService.remove(id);
  }
}
