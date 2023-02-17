import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Repository } from 'typeorm';
import { ArtistDTO } from './dto/artist.dto';
import { Artist } from './entities/artist.entity';


@Injectable()
export class ArtistService {
  constructor(
    @InjectRepository(Artist)
    private artistsRepository: Repository<Artist>,
  ) {}

  async create(createArtistDto: ArtistDTO) {
    return this.artistsRepository.save({ ...createArtistDto, id: uuidv4() });
  }

  async findAll() {
    return this.artistsRepository.find();
  }

  async findOne(id: string) {
    return this.artistsRepository.findOneBy({ id });
  }

  async update(id: string, selectedArtist: ArtistDTO) {
    await this.artistsRepository.update(id, selectedArtist);

    return selectedArtist;
  }

  async remove(id: string) {
    return this.artistsRepository.delete(id);
  }
}
