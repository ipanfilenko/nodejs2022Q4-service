import { Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { AlbumModule } from '../album/album.module';
import { TrackModule } from '../track/track.module';
import { ArtistModule } from '../artist/artist.module';
import { FavoritesController } from './favorites.controller';

@Module({
  controllers: [FavoritesController],
  providers: [FavoritesService],
  imports: [AlbumModule, TrackModule, ArtistModule]
})
export class FavoritesModule {}
