import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayNotEmpty,
  IsArray,
  IsDateString,
  IsDecimal,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  Length,
  Max,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateMovieDto {
  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(100)
  @IsString()
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  @Length(10, 1000)
  @IsString()
  synopsis: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  releaseDate: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @Max(500)
  runningTime: number;

  @ApiProperty()
  @ArrayNotEmpty()
  @IsArray()
  @Length(2, 20, { each: true })
  genre?: string[];

  @ApiProperty()
  @ArrayNotEmpty()
  @IsArray()
  @Length(2, 20, { each: true })
  languages: string[];

  @ApiProperty()
  @IsOptional()
  @IsArray()
  @Length(2, 20, { each: true })
  subtitles?: string[];

  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(4)
  @IsString()
  country: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @MaxLength(5)
  ratingSystem?: string;

  @ApiProperty()
  @ArrayNotEmpty()
  @IsArray()
  @Length(3, 20, { each: true })
  directors: string[];

  @ApiProperty()
  @ArrayNotEmpty()
  @IsArray()
  @Length(3, 20, { each: true })
  cast: string[];

  @ApiProperty()
  @IsOptional()
  @IsDecimal()
  rating?: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  budget?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  boxOffice?: string;

  @ApiProperty()
  @IsOptional()
  @IsUrl()
  imageUrl?: string;
}
