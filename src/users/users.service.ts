import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  // Creates a dependency between the service and the automatically-created repository
  // Repository<User> is used by DI system to know what instance it needs to inject at run time
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  async createUser(email: string, password: string) {
    // Creates an instance of user entity
    const user = this.repo.create({ email, password });
    // Save the user entity instance in the DB
    return await this.repo.save(user);
  }

  async findUserById(id: number) {
    if (!id) return null;
    return await this.repo.findOne({
      where: { id },
    });
  }

  async findUserByEmail(email: string) {
    return await this.repo.find({ where: { email } });
  }

  async updateUser(id: number, attrs: Partial<User>) {
    const user = await this.findUserById(id);
    if (!user) throw new NotFoundException('User not found');
    Object.assign(user, attrs);
    return this.repo.save(user);
  }

  async removeUser(id: number) {
    const user = await this.findUserById(id);
    if (!user) throw new Error('User not found');
    return this.repo.remove(user);
  }
}
