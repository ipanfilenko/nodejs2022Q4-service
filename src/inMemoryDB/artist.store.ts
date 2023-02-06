import { Artist } from '../artist/dto/artist.dto';
import { v4 as uuidv4 } from 'uuid';

let artists = [] as Artist[];

export const ArtistStore = {
  findAll: () => artists,
  findOne: (id: string) => {
    return artists.find((_artist: Artist) => _artist.id === id);
  },
  create: (artist: Artist) => {
    const newArtist = { ...artist, id: uuidv4() };

    artists.push(newArtist);

    return newArtist;
  },
  update: (artist: Artist, selectedArtist: Artist) => {
    const updatedArtist = {
      ...artist,
      ...selectedArtist,
    };

    artists = artists.map((_artist: Artist) =>
      _artist.id === updatedArtist.id ? { ...updatedArtist } : { ...artist },
    );

    return updatedArtist;
  },
  remove: (id: string) => {
    artists = artists.filter((_artist: Artist) => _artist.id !== id);
  },
};
