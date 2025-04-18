import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
    async findAll(){
        const response = await fetch("https://fakestoreapi.com/users");
        const data = await response.json();
        return data;
    }
}
