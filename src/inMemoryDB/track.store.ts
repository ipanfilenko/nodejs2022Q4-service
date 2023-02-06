import { Track } from '../track/dto/track.dto';
import { favorites, FavoriteStore } from './favorites.store';
import { v4 as uuidv4 } from 'uuid';

let tracks = [] as Track[];

export const TrackStore = {
  findAll: () => tracks,
  findOne: (id: string) => {
    return tracks.find((_track: Track) => _track.id === id);
  },
  create: (track: Track) => {
    const newTrack = { ...track, id: uuidv4() };

    tracks.push(newTrack);

    return newTrack;
  },
  update: (track: Track, selectedTrack: Track) => {
    const updatedTrack = {
      ...track,
      ...selectedTrack,
    };

    tracks = tracks.map((_track: Track) =>
      _track.id === updatedTrack.id ? { ...updatedTrack } : { ...track },
    );

    return updatedTrack;
  },
  remove: (id: string) => {
    tracks = tracks.filter((_track: Track) => _track.id !== id);

    if (favorites.tracks.find(track => track.id === id)) {
      FavoriteStore.remove(id, 'tracks');
    }
  },
};
