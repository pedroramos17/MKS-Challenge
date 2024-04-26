import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
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
  @ApiProperty({
    description: 'The title of the movie',
    example: 'The Matrix',
  })
  @IsNotEmpty()
  @MaxLength(100)
  @IsString()
  title: string;

  @ApiProperty({
    description: 'The synopsis of the movie',
    example:
      'A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.',
  })
  @IsNotEmpty()
  @Length(10, 1000)
  @IsString()
  synopsis: string;

  @ApiProperty({
    description: 'The release date of the movie',
    example: '1999-12-31',
    format: 'date YYYY-MM-DD',
  })
  @IsNotEmpty()
  @IsDateString()
  releaseDate: string;

  @ApiProperty({
    description: 'The running time of the movie in minutes',
    example: 120,
    minimum: 1,
    maximum: 500,
  })
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @Max(500)
  runningTime: number;

  @ApiProperty({
    description: 'The genres of the movie',
    example: ['action', 'comedy'],
    type: [String],
    minLength: 2,
    maxLength: 20,
  })
  @ArrayNotEmpty()
  @IsArray()
  @Length(2, 20, { each: true })
  genres: string[];

  @ApiProperty({
    description: 'The languages of the movie',
    example: ['english', 'spanish'],
    type: [String],
    minLength: 2,
    maxLength: 20,
  })
  @ArrayNotEmpty()
  @IsArray()
  @Length(2, 20, { each: true })
  languages: string[];

  @ApiPropertyOptional({
    description: 'The subtitles of the movie',
    example: ['english', 'spanish'],
    type: [String],
    minLength: 2,
    maxLength: 20,
  })
  @IsOptional()
  @IsArray()
  @Length(2, 20, { each: true })
  subtitles?: string[];

  @ApiProperty({
    description: 'The country of the movie',
    example: 'usa',
    maxLength: 4,
  })
  @IsNotEmpty()
  @MaxLength(4)
  @IsString()
  country: string;

  @ApiPropertyOptional({
    description: 'The rating system of the movie',
    examples: ['g', 'pg', 'pg-13', 'r'],
    maxLength: 5,
  })
  @IsOptional()
  @IsString()
  @MaxLength(5)
  ratingSystem?: string;

  @ApiProperty({
    description: 'The directors of the movie',
    example: ['john', 'david'],
    type: [String],
    minLength: 3,
    maxLength: 20,
  })
  @ArrayNotEmpty()
  @IsArray()
  @Length(3, 20, { each: true })
  directors: string[];

  @ApiProperty({
    description: 'The cast of the movie',
    example: ['mary', 'bob'],
    type: [String],
    minLength: 3,
    maxLength: 20,
  })
  @ArrayNotEmpty()
  @IsArray()
  @Length(3, 20, { each: true })
  cast: string[];

  @ApiPropertyOptional({
    description: 'The rating of the movie',
    example: 7.5,
  })
  @IsOptional()
  @IsDecimal()
  rating?: number;

  @ApiPropertyOptional({
    description: 'The budget of the movie',
    example: '100 Million USD',
  })
  @IsOptional()
  @IsString()
  budget?: string;

  @ApiPropertyOptional({
    description: 'The box office of the movie',
    example: '100 Million USD',
  })
  @IsOptional()
  @IsString()
  boxOffice?: string;

  @ApiPropertyOptional({
    description: 'The image url of the movie',
    example: 'https://s3.us-west-2.amazonaws.com/movies/image.jpg',
  })
  @IsOptional()
  @IsUrl()
  imageUrl?: string;
}
