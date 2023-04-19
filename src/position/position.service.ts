import { Injectable } from '@nestjs/common';
import { CreatePositionDto } from './dto/create-position.dto';
import { UpdatePositionDto } from './dto/update-position.dto';
import { PositionCategories } from './entities/positionCategories.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
@Injectable()
export class PositionService {
  constructor(
    @InjectRepository(PositionCategories)
    private positionCategories: Repository<PositionCategories>,
  ) {}
  async findById(id: number): Promise<PositionCategories> {
    const level = await this.positionCategories.findOne({ where: { id } });
    return level;
  }
}
