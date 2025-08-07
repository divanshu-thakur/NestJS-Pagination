import { Injectable, OnModuleInit } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Injectable()
export class SeederService implements OnModuleInit {
  constructor(private readonly usersService: UsersService) {}

  async onModuleInit() {
    const isEmpty = await this.usersService.isTableEmpty();
    if (isEmpty) {
      console.log('Seeding users...');
      await this.usersService.seedUsers(500);
      console.log('Users seeded successfully!');
    }
  }
}
