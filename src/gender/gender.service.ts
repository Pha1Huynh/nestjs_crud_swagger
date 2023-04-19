import { Injectable } from '@nestjs/common';
import { CreateGenderDto } from './dto/create-gender.dto';
import { UpdateGenderDto } from './dto/update-gender.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Gender } from './entities/gender.entity';
@Injectable()
export class GenderService {
  constructor(
    @InjectRepository(Gender)
    private gender: Repository<Gender>,
  ) {}
  async findById(id: number): Promise<Gender> {
    const gender = await this.gender.findOne({ where: { id } });
    return gender;
  }
}
