import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './users.model';
import { CreateUserDto, CreateUsersDto } from './dto/create-user.dto';
import { PaginationDto } from './dto/pagination.dto';
import { faker } from '@faker-js/faker';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  async findAll(paginationDto: PaginationDto) {
    const { page = 1, limit = 10 } = paginationDto;
    const offset = Number((page - 1) * limit);

    const { count, rows } = await this.userModel.findAndCountAll({
      limit: Number(limit),
      offset,
      order: [['name', 'ASC']],
    });

    return {
      data: rows,
      meta: {
        total: count,
        page,
        limit,
        totalPages: Math.ceil(count / limit),
      },
    };
  }

  async create(createUserDto: CreateUserDto) {
    return this.userModel.create(createUserDto);
  }

  async createMany(createUsersDto: CreateUsersDto) {
    return this.userModel.bulkCreate(createUsersDto.users);
  }

  async seedUsers(count: number = 500) {
    const users = Array.from({ length: count }, () => ({
      name: faker.person.fullName(),
      email: faker.internet.email(),
    }));

    return this.userModel.bulkCreate(users);
  }

  async isTableEmpty(): Promise<boolean> {
    const count = await this.userModel.count();
    return count === 0;
  }
} 
