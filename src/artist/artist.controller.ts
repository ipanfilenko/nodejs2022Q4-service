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
import { ArtistService } from './artist.service';
import { Artist, ArtistDTO } from './dto/artist.dto';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createArtistDto: Artist) {
    return this.artistService.create(createArtistDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll() {
    return this.artistService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: string) {
    if (!validate(id)) {
      throw new BadRequestException('bad request');
    }

    const selectedArtist = this.artistService.findOne(id);

    if (!selectedArtist) {
      throw new NotFoundException('not found');
    }

    return selectedArtist;
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  update(@Param('id') id: string, @Body() ArtistDTO: Artist) {
    if (!validate(id)) {
      throw new BadRequestException('bad request');
    }

    if (!ArtistDTO.name || typeof ArtistDTO.name !== 'string') {
      // TODO: should work with DTO
      throw new BadRequestException('bad request');
    }

    const selectedArtist = this.artistService.findOne(id);

    if (!selectedArtist) {
      throw new NotFoundException('not found');
    }

    return this.artistService.update(selectedArtist, ArtistDTO);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    if (!validate(id)) {
      throw new BadRequestException('bad request');
    }

    const selectedArtist = this.artistService.findOne(id);

    if (!selectedArtist) {
      throw new NotFoundException('not found');
    }

    return this.artistService.remove(id);
  }
}
