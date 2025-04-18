import { Controller, Get, Param, Query } from '@nestjs/common';
import { CartsService } from './carts.service';

@Controller('carts')
export class CartsController {
    constructor(private readonly cartsService: CartsService) {};

    @Get()
     findAll(){
        return this.cartsService.findAll();
    }

    @Get('/ByUsers')
     findByUsers(@Query('username') username: string,@Query('password') password: string)
    {
        console.log("hiiii");
        return this.cartsService.findByUserNameAndPass(username,password);
    }

}
