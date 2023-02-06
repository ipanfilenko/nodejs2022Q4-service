import { Injectable } from '@nestjs/common';
import { FavoriteStore } from '../inMemoryDB';

@Injectable()
export class FavoritesService {
  create(type: string, dto: any) {
    return FavoriteStore.create(type, dto);
  }

  findAll() {
    return FavoriteStore.findAll();
  }

  findOne(id: string, type: string) {
    return FavoriteStore.findOne(id, type);
  }

  remove(id: string, type: string) {
    return FavoriteStore.remove(id, type);
  }
}
