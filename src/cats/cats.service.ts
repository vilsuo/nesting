import { Injectable } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { Cat } from './interfaces/cat.interface';

// The @Injectable() decorator attaches metadata, which declares that
// CatsService is a class that can be managed by the Nest IoC container
@Injectable()
export class CatsService {
  private readonly cats: Cat[] = [];

  async createCat(obj: CreateCatDto): Promise<Cat> {
    const cat: Cat = {
      id: this.cats.length + 1,
      name: obj.name,
      createdAt: new Date(),
    };
    this.cats.push(cat);
    return cat;
  }

  async findAll(): Promise<Cat[]> {
    return this.cats;
  }

  async findById(id: number): Promise<Cat | undefined> {
    return this.cats.find((cat) => cat.id === id);
  }
}
