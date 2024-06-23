import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  create(email: string, password: string) {
    const user = this.repo.create({ email, password });
    return this.repo.save(user);
  }

  findOne(id: number) {
    return this.repo.findOneBy({ id });
  }
  find(email: string) {
    return this.repo.find({ where: { email } });
  }
  async update(id: number, attributes: Partial<User>) {
    // commented approach bellow makes one db trip,
    // and it works with search criteria,
    // but it not triggers hooks defined in user.entity.ts like @AfterUpdate()
    // return this.repo.update({ id }, attributes);

    // approach bellow makes two db trips,
    // and it works with User entity,
    // but it triggers hooks defined in user.entity.ts like @AfterUpdate()
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    Object.assign(user, attributes);

    return this.repo.save(user);
  }
  async remove(id: number) {
    // commented approach bellow makes one db trip,
    // and it works with search criteria,
    // but it not triggers hooks defined in user.entity.ts like @AfterUpdate()
    // return this.repo.delete({ id });

    // approach bellow makes two db trips,
    // and it works with User entity,
    // but it triggers hooks defined in user.entity.ts like @AfterRemove()
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return this.repo.remove(user);
  }
}
