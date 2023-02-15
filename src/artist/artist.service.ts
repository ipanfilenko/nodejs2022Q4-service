import { Injectable } from '@nestjs/common';
import { Artist } from './dto/artist.dto';
import { ArtistStore } from '../inMemoryDB';

@Injectable()
export class ArtistService {
  create(createArtistDto: Artist) {
    return ArtistStore.create(createArtistDto);
  }

  findAll() {
    return ArtistStore.findAll();
  }

  findOne(id: string) {
    return ArtistStore.findOne(id);
  }

  update(selectedArtist: Artist, updateArtistDto: Artist) {
    return ArtistStore.update(selectedArtist, updateArtistDto);
  }

  remove(id: string) {
    return ArtistStore.remove(id);
  }
}
