import { Injectable } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Repository } from 'typeorm';
import { Movie } from './entities/movie.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie)
    private readonly moviesRepository: Repository<Movie>,
  ) {}
  async create(createMovieDto: CreateMovieDto): Promise<Movie> {
    const movie = this.moviesRepository.create(createMovieDto);
    return await this.moviesRepository.save(movie);
  }

  async findAll(): Promise<Movie[]> {
    return await this.moviesRepository.find();
  }

  async findOne(id: string): Promise<Movie | null> {
    return await this.moviesRepository.findOneBy({ id });
  }

  async update(id: string, updateMovieDto: UpdateMovieDto): Promise<boolean> {
    const movie = await this.moviesRepository.findOneBy({ id });

    if (!movie) {
      return false;
    }

    await this.moviesRepository.update(id, updateMovieDto);
    return true;
  }

  async remove(id: string): Promise<boolean> {
    const movie = await this.moviesRepository.findOneBy({ id });

    if (!movie) {
      return false;
    }

    await this.moviesRepository.delete(id);
    return true;
  }
}
