import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class ArtistDTO {
  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsBoolean()
  public grammy: boolean;
}
