import { Column, CreateDateColumn, PrimaryGeneratedColumn } from 'typeorm';

export abstract class Content {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  content: string;

  @CreateDateColumn()
  createdAt: Date;
}
