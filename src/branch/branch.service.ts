import { Injectable } from '@nestjs/common';
import { CreateBranchDto } from './dto/create-branch.dto';
import { UpdateBranchDto } from './dto/update-branch.dto';
import { Branch } from './entities/branch.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
@Injectable()
export class BranchService {
  constructor(
    @InjectRepository(Branch)
    private branch: Repository<Branch>,
  ) {}

  async findById(id: number): Promise<Branch> {
    const branch = await this.branch.findOne({ where: { id } });
    return branch;
  }
}
