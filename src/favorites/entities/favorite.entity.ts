import { Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Artist } from '../../artist/entities/artist.entity';
import { Album } from '../../album/entities/album.entity';
import { Track } from '../../track/entities/track.entity';

@Entity()
export class Favorite {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @JoinTable()
  @ManyToMany(() => Artist, { onDelete: 'CASCADE' })
  artists: Artist[];

  @JoinTable()
  @ManyToMany(() => Album, { onDelete: 'CASCADE' })
  albums: string[]; // favorite albums ids

  @JoinTable()
  @ManyToMany(() => Track, { onDelete: 'CASCADE' })
  tracks: string[]; // favorite tracks ids
}
