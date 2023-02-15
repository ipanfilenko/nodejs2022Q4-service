import { Album } from '../album/dto/album.dto';
import { favorites, FavoriteStore } from './favorites.store';
import { TrackStore } from './track.store';
import { v4 as uuidv4 } from 'uuid';

let albums = [] as Album[];

export const AlbumStore = {
  findAll: () => albums,
  findOne: (id: string) => {
    return albums.find((_album: Album) => _album.id === id);
  },
  create: (album: Album) => {
    const newAlbum = { ...album, id: uuidv4() };

    albums.push(newAlbum);

    return newAlbum;
  },
  update: (album: Album, selectedAlbum: Album) => {
    const updatedAlbum = {
      ...album,
      ...selectedAlbum,
    };

    albums = albums.map((_album: Album) =>
      _album.id === updatedAlbum.id ? { ...updatedAlbum } : { ...album },
    );

    return updatedAlbum;
  },
  remove: (id: string) => {
    albums = albums.filter((_album: Album) => _album.id !== id);

    TrackStore.removeAlbum(id);

    if (favorites.albums.find((album) => album.id === id)) {
      FavoriteStore.remove(id, 'albums');
    }
  },
  removeArtist: (id: string) => {
    albums.forEach((track) => {
      if (track.artistId === id) {
        track.artistId = null;
      }
    });
  },
};
