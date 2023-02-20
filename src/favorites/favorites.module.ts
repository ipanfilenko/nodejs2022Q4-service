import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavoritesService } from './favorites.service';
import { AlbumModule } from '../album/album.module';
import { TrackModule } from '../track/track.module';
import { ArtistModule } from '../artist/artist.module';
import { FavoritesController } from './favorites.controller';
import { Favorite } from './entities/favorite.entity';

@Module({
  controllers: [FavoritesController],
  providers: [FavoritesService],
  imports: [
    AlbumModule,
    TrackModule,
    ArtistModule,
    TypeOrmModule.forFeature([Favorite]),
  ],
})
export class FavoritesModule {}
