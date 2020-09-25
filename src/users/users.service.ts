import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { CreateUserDto } from './dto/create/create-user.dto';
import { UpdateProfileDto } from './dto/update/update-profile.dto';
import { UpdateUserDto } from './dto/update/update-user.dto';
import { User } from './models/user.entity';

@Injectable()
export class UsersService {
  /**
   *
   * @param userRepository
   *
   */
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  /**
   *
   * @param createUserDto
   *
   */
  //create below assumes that tenant model does not allow cascade create of custom theme
  /*
    async create (createUserDto: createUserDto): Promise<Tenant>{

        const newCustomTheme = this.customThemeRepository.create(createUserDto.customTheme)
        const customTheme = await this.customThemeRepository.save(newCustomTheme);


        const newItem = this.tenantRepository.create(createUserDto);
        //associate the custom theme created above with newItem before saving
        newItem.customTheme = customTheme;

        
        return this.tenantRepository.save(newItem);
    }
    */
  async create(createUserDto: CreateUserDto): Promise<User> {
    const newUser = this.userRepository.create(createUserDto);
    return await this.userRepository.save(newUser);
  }

  /**
   * See https://typeorm.io/#/find-options
   */
  /*
    async findAll(): Promise<Tenant[]> {
        return await this.tenantRepository.find();
    }
    */

  //2. Note: You can indicate the fields to be returned
  /*
    async findAll(): Promise<Tenant[]> {
        return await this.tenantRepository.find({select: ["code", "name"]});
    }*/

  // async findAll(): Promise<User[]> {
  //   return await this.userRepository.find();
  // }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find({
      select: ['firstName', 'lastName', 'id'],
      relations: ['profile'],
    });
  }

  /**
   *
   * @param id
   * find by id
   */

  async findOne(id: number): Promise<User> {
    return await this.userRepository.findOne(id);
  }

  /**
   *
   * @param id
   * Finds by a criterion (id in this case) and deletes. Returns void
   */

  async delete(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }

  /**
   *
   * @param user
   * Remove the User specifed. Returns User removed.
   */

  async remove(user: User): Promise<User> {
    return await this.userRepository.remove(user);
  }

  //partial update
  /**
   *
   * @param id
   * @param user
   * Find by the id and replace the fields sent in Dto
   */

  async update1(id: number, user: UpdateUserDto): Promise<UpdateResult> {
    return await this.userRepository.update(id, { ...user });
  }

  /**
   *
   * @param user
   * No partial update allowed here. Saves the tenant object supplied
   */
  async update2(user: User): Promise<User> {
    return await this.userRepository.save(user);
  }
}
