import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Repository } from 'typeorm';
import { TrackDTO } from './dto/track.dto';
import { Track } from './entities/track.entity';

@Injectable()
export class TrackService {
  constructor(
    @InjectRepository(Track)
    private tracksRepository: Repository<Track>,
  ) {}

  async create(createTrackDto: TrackDTO) {
    return this.tracksRepository.save({ ...createTrackDto, id: uuidv4() });
  }

  async findAll() {
    return this.tracksRepository.find();
  }

  async findOne(id: string) {
    return this.tracksRepository.findOneBy({ id });
  }

  async update(id: string, selectedTrack: TrackDTO) {
    await this.tracksRepository.update(id, selectedTrack);

    return selectedTrack;
  }

  async remove(id: string) {
    return this.tracksRepository.delete(id);
  }
}
