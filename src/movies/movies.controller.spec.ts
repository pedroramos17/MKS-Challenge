import { Test, TestingModule } from '@nestjs/testing';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { Movie } from './entities/movie.entity';

describe('MoviesController', () => {
  let moviesController: MoviesController;
  let moviesService: MoviesService;

  const moviesEntityMock = {
    id: 'test-id',
    title: 'Test movie',
    synopsis: 'Test synopsis',
    runningTime: 120,
    genres: ['action', 'comedy'],
    releaseDate: '2020-01-01',
    languages: ['english'],
    country: 'usa',
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
      controllers: [MoviesController],
      providers: [
        MoviesService,
        {
          provide: MoviesService,
          useValue: {
            create: jest.fn(),
            findOne: jest.fn(),
            findAll: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    moviesController = module.get<MoviesController>(MoviesController);
    moviesService = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(moviesController).toBeDefined();
    expect(moviesService).toBeDefined();
  });

  describe('create', () => {
    it('should create a movie', async () => {
      const body: CreateMovieDto = {
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
        .spyOn(moviesService, 'create')
        .mockReturnValueOnce(Promise.resolve(moviesEntityMock));

      const result = await moviesController.create(body);

      expect(result).toBeDefined();
      expect(moviesService.create).toHaveBeenCalledTimes(1);
    });
  });

  describe('findAll', () => {
    it('should find all movies', async () => {
      jest
        .spyOn(moviesService, 'findAll')
        .mockResolvedValue([moviesEntityMock]);

      const result = await moviesController.findAll();

      expect(result).toBeDefined();
      expect(moviesService.findAll).toHaveBeenCalledTimes(1);
    });
  });

  describe('findOne', () => {
    it('should find a movie', async () => {
      jest.spyOn(moviesService, 'findOne').mockResolvedValue(moviesEntityMock);

      const result = await moviesController.findOne('test-id');

      expect(result).toBeDefined();
      expect(moviesService.findOne).toHaveBeenCalledTimes(1);
      expect(moviesService.findOne).toHaveBeenCalledWith('test-id');
    });
  });

  describe('update', () => {
    it('should update a movie', async () => {
      const body = {
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
        .spyOn(moviesService, 'update')
        .mockReturnValueOnce(Promise.resolve(true));

      const isUpdated = await moviesController.update('test-id', body);

      expect(isUpdated).toBeDefined();
      expect(isUpdated).toBe(true);
      expect(moviesService.update).toHaveBeenCalledTimes(1);
      expect(moviesService.update).toHaveBeenCalledWith('test-id', body);
    });
  });

  describe('remove', () => {
    it('should remove a movie', async () => {
      jest
        .spyOn(moviesService, 'remove')
        .mockReturnValueOnce(Promise.resolve(true));

      const isRemoved = await moviesController.remove('test-id');

      expect(isRemoved).toBeDefined();
      expect(isRemoved).toBe(true);
      expect(moviesService.remove).toHaveBeenCalledTimes(1);
      expect(moviesService.remove).toHaveBeenCalledWith('test-id');
    });
  });
});
