import { Module } from '@nestjs/common';
import { CartsController } from './carts.controller';
import { CartsService } from './carts.service';
import { UsersService } from 'src/users/users.service';

@Module({
  controllers: [CartsController],
  providers: [CartsService,UsersService]
})
export class CartsModule {}
