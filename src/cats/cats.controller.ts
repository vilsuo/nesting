import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { Cat } from './interfaces/cat.interface';

@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Post()
  async create(@Body() body: CreateCatDto): Promise<Cat> {
    return await this.catsService.createCat(body);
  }

  @Get()
  async findAll(): Promise<Cat[]> {
    return await this.catsService.findAll();
  }

  @Get(':id')
  async findOne(
    @Param() params: { id: string },
    @Res({ passthrough: true }) res: Response,
  ) {
    const parsedId = Number(params.id);

    const cat = await this.catsService.findById(parsedId);
    if (!cat) {
      res.status(HttpStatus.NOT_FOUND);
      return { message: 'Cat does not exist' };
    }

    return cat;
  }
}
