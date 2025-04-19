import { Controller, Get, Param } from '@nestjs/common';
import { ArticlesService } from './articles.service';

@Controller('articles')
export class ArticlesController {
    constructor (private readonly articleServices: ArticlesService) {}
    @Get()
     findall(){
        return this.articleServices.findAll();
    }

    @Get(':id')
     findOne(@Param('id') id: string){
        return this.articleServices.findOne(parseInt(id, 10))
    }

    @Get('ByCart/:id')
     getByCartId(@Param('id') id: string){
        return this.articleServices.findArticlesByCart(parseInt(id, 10))
    }
}
