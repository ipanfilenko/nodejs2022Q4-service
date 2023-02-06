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
  BadRequestException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { validate } from 'uuid';
import { FavoritesService } from './favorites.service';
import { AlbumService} from '../album/album.service';
import { TrackService } from '../track/track.service';
import { ArtistService } from '../artist/artist.service';

@Controller('favs')
export class FavoritesController {
  constructor(
    private readonly favoritesService: FavoritesService,
    private readonly albumService: AlbumService,
    private readonly trackService: TrackService,
    private readonly artistService: ArtistService,
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll() {
    return this.favoritesService.findAll();
  }

  /*------------- Track --------------------*/

  @Post('/track/:id')
  @HttpCode(HttpStatus.CREATED)
  createTrack(@Param('id') id: string) {
    if (!validate(id)) {
      throw new BadRequestException('bad request');
    }

    const selectedTrack = this.trackService.findOne(id);

    if (!selectedTrack) {
      throw new UnprocessableEntityException('not found');
    }

    return this.favoritesService.create('tracks', selectedTrack);
  }


  @Get('/track/:id')
  @HttpCode(HttpStatus.OK)
  findOneTrack(@Param('id') id: string) {
    if (!validate(id)) {
      throw new BadRequestException('bad request');
    }

    const selectedTrack = this.trackService.findOne(id);

    if (!selectedTrack) {
      throw new UnprocessableEntityException('not found');
    }

    return this.favoritesService.findOne(id, 'tracks');
  }

  @Delete('/track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeTrack(@Param('id') id: string) {
    if (!validate(id)) {
      throw new BadRequestException('bad request');
    }

    const selectedTrack = this.trackService.findOne(id);

    if (!selectedTrack) {
      throw new UnprocessableEntityException('not found');
    }

    return this.favoritesService.remove(id, 'tracks');
  }

  /*------------- Album --------------------*/

  @Post('/album/:id')
  @HttpCode(HttpStatus.CREATED)
  createAlbum(@Param('id') id: string) {
    if (!validate(id)) {
      throw new BadRequestException('bad request');
    }

    const selectedAlbum = this.albumService.findOne(id);

    if (!selectedAlbum) {
      throw new UnprocessableEntityException('not found');
    }

    return this.favoritesService.create('albums', selectedAlbum);
  }


  @Get('/album/:id')
  @HttpCode(HttpStatus.OK)
  findOneAlbum(@Param('id') id: string) {
    if (!validate(id)) {
      throw new BadRequestException('bad request');
    }

    const selectedAlbum = this.albumService.findOne(id);

    if (!selectedAlbum) {
      throw new UnprocessableEntityException('not found');
    }

    return this.favoritesService.findOne(id, 'albums');
  }

  @Delete('/album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeAlbum(@Param('id') id: string) {
    if (!validate(id)) {
      throw new BadRequestException('bad request');
    }

    const selectedAlbum = this.albumService.findOne(id);

    if (!selectedAlbum) {
      throw new UnprocessableEntityException('not found');
    }

    return this.favoritesService.remove(id, 'albums');
  }

  /*------------- Artist --------------------*/

  @Post('/artist/:id')
  @HttpCode(HttpStatus.CREATED)
  createArtist(@Param('id') id: string) {
    if (!validate(id)) {
      throw new BadRequestException('bad request');
    }

    const selectedArtist = this.artistService.findOne(id);

    if (!selectedArtist) {
      throw new UnprocessableEntityException('not found');
    }

    return this.favoritesService.create('artists', selectedArtist);
  }


  @Get('/artist/:id')
  @HttpCode(HttpStatus.OK)
  findOneArtist(@Param('id') id: string) {
    if (!validate(id)) {
      throw new BadRequestException('bad request');
    }

    const selectedArtist = this.artistService.findOne(id);

    if (!selectedArtist) {
      throw new UnprocessableEntityException('not found');
    }

    return this.favoritesService.findOne(id, 'artists');
  }

  @Delete('/artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeArtist(@Param('id') id: string) {
    if (!validate(id)) {
      throw new BadRequestException('bad request');
    }

    const selectedArtist = this.artistService.findOne(id);

    if (!selectedArtist) {
      throw new UnprocessableEntityException('not found');
    }

    return this.favoritesService.remove(id, 'artists');
  }
}
