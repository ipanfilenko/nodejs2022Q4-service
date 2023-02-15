import { Injectable } from '@nestjs/common';
import { AlbumStore } from '../inMemoryDB';
import { Album } from './dto/album.dto';

@Injectable()
export class AlbumService {
  create(createAlbumDto: Album) {
    return AlbumStore.create(createAlbumDto);
  }

  findAll() {
    return AlbumStore.findAll();
  }

  findOne(id: string) {
    return AlbumStore.findOne(id);
  }

  update(updateAlbumDto: Album, selectedAlbum: Album) {
    return AlbumStore.update(updateAlbumDto, selectedAlbum);
  }

  remove(id: string) {
    return AlbumStore.remove(id);
  }
}
