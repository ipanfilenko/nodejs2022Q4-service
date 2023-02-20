import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Favorite } from './entities/favorite.entity';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(Favorite)
    private favoritesRepository: Repository<Favorite>,
  ) {}

  async create(type: string, dto: any) {
    const favorites = await this.findAll();

    favorites[type].push(dto);

    await this.favoritesRepository.save(favorites);

    return dto;
  }

  async findAll() {
    const [favorites] = await this.favoritesRepository.find({
      relations: {
        tracks: true,
        albums: true,
        artists: true,
      },
    });

    if (!favorites) {
      await this.favoritesRepository.save(new Favorite());

      return this.findAll();
    }

    return favorites;
  }

  async findOne(id: string, type: string) {
    const [favorites] = await this.findAll();
    const selectedFavorites = favorites[type];
    return selectedFavorites.find((_favoriteId: string) => _favoriteId === id);
  }

  async remove(id: string, type: string) {
    const [favorites] = await this.favoritesRepository.find({
      relations: {
        tracks: true,
        albums: true,
        artists: true,
      },
    });

    favorites[type] = favorites[type].filter(
      (_favorite) => _favorite.id !== id,
    );

    await this.favoritesRepository.save(favorites);

    return favorites;
  }
}
