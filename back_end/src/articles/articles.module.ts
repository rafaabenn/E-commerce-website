import { Module } from '@nestjs/common';
import { ArticlesController } from './articles.controller';
import { ArticlesService } from './articles.service';
import { CartsService } from 'src/carts/carts.service';
import { UsersService } from 'src/users/users.service';

@Module({
    controllers: [ArticlesController],
    providers: [ArticlesService,CartsService,UsersService]
})
export class ArticlesModule {}
