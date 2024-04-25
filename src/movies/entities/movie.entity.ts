import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Movie {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  title: string;

  @Column('text')
  synopsis: string;

  @Column('date')
  releaseDate: string;

  @Column()
  runningTime: number;

  @Column('simple-array')
  genres: string[];

  @Column('simple-array')
  languages: string[];

  @Column('simple-array', { nullable: true })
  subtitles: string[];

  @Column({ length: 4 })
  country: string;

  @Column({ length: 5, nullable: true })
  ratingSystem: string;

  @Column('simple-array')
  directors: string[];

  @Column('simple-array')
  cast: string[];

  @Column('decimal', { precision: 3, scale: 1, nullable: true })
  rating: number;

  @Column('bigint', { nullable: true })
  budget: string;

  @Column('bigint', { nullable: true })
  boxOffice: string;

  @Column({ nullable: true })
  imageUrl: string;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;
}
