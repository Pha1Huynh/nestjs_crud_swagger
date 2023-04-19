import { Injectable, HttpException } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './entities/role.entity';
import { In } from 'typeorm';

@Injectable()
export class RoleService {
  constructor(@InjectRepository(Role) private role: Repository<Role>) {}
  async create(createRoleDto: UpdateRoleDto) {
    let newRole = this.role.create(createRoleDto);
    await this.role.save(newRole);
    return newRole;
  }

  async findAll(names: string[]): Promise<Role[]> {
    let listRole = await this.role.find({ where: { roleName: In(names) } });

    return listRole;
  }

  findOne(id: number) {
    return `This action returns a #${id} role`;
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    let myRole = await this.role.update(
      { id: id },
      { roleName: updateRoleDto.roleName },
    );
    return myRole;
  }

  async remove(id: number) {
    let deleteRole = await this.role.delete(id);
  }
}
