import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, CreateUsersDto } from './dto/create-user.dto';
import { PaginationDto } from './dto/pagination.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.usersService.findAll(paginationDto);
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Post('bulk')
  createMany(@Body() createUsersDto: CreateUsersDto) {
    return this.usersService.createMany(createUsersDto);
  }
} 
