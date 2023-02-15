import { Injectable } from '@nestjs/common';
import { TrackStore } from '../inMemoryDB';
import { Track } from './dto/track.dto';

@Injectable()
export class TrackService {
  create(createTrackDto: Track) {
    return TrackStore.create(createTrackDto);
  }

  findAll() {
    return TrackStore.findAll();
  }

  findOne(id: string) {
    return TrackStore.findOne(id);
  }

  update(updateTrackDto: Track, selectedTrack: Track) {
    return TrackStore.update(updateTrackDto, selectedTrack);
  }

  remove(id: string) {
    return TrackStore.remove(id);
  }
}
