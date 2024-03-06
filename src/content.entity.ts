import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

export abstract class Content {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  content: string;

  @CreateDateColumn()
  createdAt: Date;

  // TypeORM will call this before the entity is inserted using
  // repository/manager save.
  @BeforeInsert()
  trimContent() {
    if (this.content) this.content = this.content.trim();
  }
}
