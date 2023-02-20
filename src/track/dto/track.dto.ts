import { IsNumber, IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class TrackDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsString()
  artistId: string | null; // refers to Artist

  @IsOptional()
  @IsString()
  albumId: string | null; // refers to Album

  @IsNumber()
  @IsNotEmpty()
  duration: number; // integer number
}
