import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Repository } from 'typeorm';
import { AlbumDto } from './dto/album.dto';
import { Album } from './entities/album.entity';

@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(Album)
    private albumsRepository: Repository<Album>,
  ) {}

  async create(createAlbumDto: AlbumDto) {
    return this.albumsRepository.save({ ...createAlbumDto, id: uuidv4() });
  }

  async findAll() {
    return this.albumsRepository.find();
  }

  async findOne(id: string) {
    return this.albumsRepository.findOneBy({ id });
  }

  async update(id: string, selectedAlbum: AlbumDto) {
    await this.albumsRepository.update(id, selectedAlbum);

    return selectedAlbum;
  }

  async remove(id: string) {
    return this.albumsRepository.delete(id);
  }
}
