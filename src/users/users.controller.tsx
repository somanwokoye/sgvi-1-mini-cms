import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import App from '../clients_dev/users-react-web-client/src/App';
import * as React from 'react';
import { UpdateResult } from 'typeorm/query-builder/result/UpdateResult';
import { User } from './models/user.entity';
import { CreateUserDto } from './dto/create/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update/update-user.dto';
import {} from './dto/update/update-profile.dto';
import { Reply } from 'src/global/custom.interfaces';
import renderEngine from 'src/global/render.engine';
import { renderToNodeStream } from 'react-dom/server';

@Controller('users')
export class UsersController {
  /**
   *
   * @param usersService
   * Inject usersService
   */

  constructor(private readonly usersService: UsersService) {}

  /**
   *
   * @param createUserDto
   * Handle Post request for create
   */

  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    // console.log(JSON.stringify(createUserDto));
    return this.usersService.create(createUserDto);
  }

  /**
   * Handle Get request for find
   */
  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  /**
   *
   * @param id
   * Handle Get request for find by id
   */

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return this.usersService.findOne(id);
  }

  /**
   *
   * @param id id of user to be updated
   * @param updateUserDto new content
   * Handle Put request for
   */

  @Put(':id')
  partialUpdate(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UpdateResult> {
    return this.usersService.update1(id, updateUserDto);
  }

  /**
   *
   * @param user
   * Non-partial update. Takes a full tenant without param.
   */
  @Put()
  update(@Body() user: User): Promise<User> {
    return this.usersService.update2(user);
  }

  /**
   *
   * @param id
   * Finds by a criterion (id in this case) and deletes. Returns void
   */
  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.delete(id);
  }

  @Get('web')
  web(@Res() reply: Reply) {
    //We want to render the raw way so that we can call renderToStream
    const res = reply.raw;

    /*We want to be able to send some initialization data to the react component
    Just using below string as an illustration placeholder for now. The real value will be 
    when we implement Authentication and Authorization.
    The token will contain whatever data you want to pass but in base64 digest format.
    For example, UserInfo, Roles, ThemeContext values, etc.
    */
    const initialProps = { jwtToken: 'put-the-token-string-here-if-any' };

    const beforeStream = renderEngine().render(
      'users/before-react-stream.fragment.html',
      { title: 'Users Administration', UsersActive: true },
    );

    const afterStream = renderEngine().render(
      'users/after-react-stream.fragment.html',
      { initialProps: JSON.stringify(initialProps) },
    );

    //Write the first rendered fragment (upper html part)
    res.write(beforeStream);

    //write the React app using renderToNodeStream
    const stream = renderToNodeStream(<App {...initialProps} />);

    stream.addListener('end', () => {
      res.write(afterStream); //Write the last rendered fragment (lower html part)
      res.end();
    });

    //enable stream piping
    stream.pipe(res, { end: false });
  }
}
