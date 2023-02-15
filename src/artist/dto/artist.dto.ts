import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export interface Artist {
  id: string; // uuid v4
  name: string;
  grammy: boolean;
}

export class ArtistDTO {
  @IsString()
  @IsNotEmpty()
  public id: string;

  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsBoolean()
  public grammy: boolean;
}
