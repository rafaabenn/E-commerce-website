import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
    async findAll(){
        const response = await fetch("https://fakestoreapi.com/users");
        const data = await response.json();
        return data;
    }

    async findOneByUsername(username: string){
        const allUsers = await this.findAll();
        const user = allUsers.find((u) => u.username === username);
        console.log(user);
        return user;
    }
}
