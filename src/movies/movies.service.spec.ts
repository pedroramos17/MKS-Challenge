import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Movie } from './entities/movie.entity';
import { Repository } from 'typeorm';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

describe('MoviesService', () => {
  let moviesService: MoviesService;
  let moviesRepository: Repository<Movie>;

  const movieEntityMock = {
    id: 'test-id',
    title: 'Test movie',
    synopsis: 'Test synopsis',
    runningTime: 120,
    genres: ['action', 'comedy'],
    releaseDate: '2020-01-01',
    languages: ['english'],
    country: 'usa',
    ratingSystem: 'g',
    directors: ['john'],
    cast: ['mary'],
    rating: 0,
    budget: '0',
    boxOffice: '0',
    imageUrl: '',
    createdDate: new Date(),
    updatedDate: new Date(),
  } as Movie;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MoviesService,
        {
          provide: getRepositoryToken(Movie),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            findOneBy: jest.fn(),
            find: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    moviesService = module.get<MoviesService>(MoviesService);
    moviesRepository = module.get<Repository<Movie>>(getRepositoryToken(Movie));
  });

  it('should be defined', () => {
    expect(moviesService).toBeDefined();
    expect(moviesRepository).toBeDefined();
  });

  describe('create', () => {
    it('should create a movie', async () => {
      const data: CreateMovieDto = {
        title: 'Test movie',
        synopsis: 'Test synopsis',
        runningTime: 120,
        genres: ['action', 'comedy'],
        releaseDate: '2020-01-01',
        languages: ['english'],
        country: 'usa',
        directors: ['john'],
        cast: ['mary'],
      };

      jest
        .spyOn(moviesRepository, 'create')
        .mockReturnValueOnce(movieEntityMock);

      jest.spyOn(moviesRepository, 'save').mockResolvedValue(movieEntityMock);

      const movie = await moviesService.create(data);

      expect(movie).toBeDefined();
      expect(moviesRepository.create).toHaveBeenCalledTimes(1);
      expect(moviesRepository.save).toHaveBeenCalledTimes(1);
    });
  });

  describe('findOne', () => {
    it('should find a movie', async () => {
      jest
        .spyOn(moviesRepository, 'findOneBy')
        .mockReturnValueOnce(Promise.resolve(movieEntityMock));

      const movie = await moviesService.findOne('test-id');

      expect(movie).toBeDefined();
      expect(moviesRepository.findOneBy).toHaveBeenCalledTimes(1);
    });
  });

  describe('findAll', () => {
    it('should find all movies', async () => {
      const movieEntityMock = {
        id: 'test-id',
        title: 'Test movie',
        synopsis: 'Test synopsis',
        runningTime: 120,
        genres: ['action', 'comedy'],
        releaseDate: '2020-01-01',
        languages: ['english'],
        subtitles: ['english', 'spanish'],
        country: 'usa',
        ratingSystem: 'g',
        directors: ['john'],
        cast: ['mary'],
        rating: 0,
        budget: '0',
        boxOffice: '0',
        imageUrl: '',
        createdDate: new Date(),
        updatedDate: new Date(),
      } as Movie;

      jest
        .spyOn(moviesRepository, 'find')
        .mockReturnValueOnce(Promise.resolve([movieEntityMock]));

      const movies = await moviesService.findAll();

      expect(movies).toBeDefined();
      expect(moviesRepository.find).toHaveBeenCalledTimes(1);
    });
  });

  describe('update', () => {
    it('should update a movie', async () => {
      const updatedMovie = {
        title: 'Another Test movie',
        synopsis: 'Different synopsis',
        runningTime: 120,
        genres: ['action', 'comedy'],
        releaseDate: '2022-01-01',
        languages: ['english'],
        country: 'usa',
        directors: ['john'],
        cast: ['mary'],
      };

      jest
        .spyOn(moviesRepository, 'findOneBy')
        .mockReturnValueOnce(Promise.resolve(movieEntityMock));

      jest.spyOn(moviesRepository, 'update').mockReturnValueOnce(
        Promise.resolve({
          raw: {},
          generatedMaps: [],
          ...updatedMovie,
        }),
      );

      const isUpdated = await moviesService.update('test-id', updatedMovie);

      expect(isUpdated).toBeDefined();
      expect(moviesRepository.findOneBy).toHaveBeenCalledTimes(1);
      expect(moviesRepository.findOneBy).toHaveBeenCalledWith({
        id: 'test-id',
      });
      expect(moviesRepository.update).toHaveBeenCalledTimes(1);
      expect(isUpdated).toBe(true);
    });
  });

  describe('remove', () => {
    it('should remove a movie', async () => {
      jest
        .spyOn(moviesRepository, 'findOneBy')
        .mockReturnValueOnce(Promise.resolve(movieEntityMock));

      jest.spyOn(moviesRepository, 'delete').mockReturnValueOnce(
        Promise.resolve({
          raw: {},
          generatedMaps: [],
          affected: 1,
        }),
      );

      const isRemoved = await moviesService.remove('test-id');

      expect(isRemoved).toBeDefined();
      expect(moviesRepository.findOneBy).toHaveBeenCalledTimes(1);
      expect(moviesRepository.findOneBy).toHaveBeenCalledWith({
        id: 'test-id',
      });
      expect(moviesRepository.delete).toHaveBeenCalledTimes(1);
      expect(isRemoved).toBe(true);
    });
  });
});
