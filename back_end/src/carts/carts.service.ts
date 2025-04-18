import { Injectable } from '@nestjs/common';
import { console } from 'inspector';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class CartsService {

    constructor(private readonly usersService: UsersService) {}
   async findAll(){
        const response = await fetch("https://fakestoreapi.com/carts");
        const data = await response.json();
        console.log(data)
        return data;
    }

    async findOne(id: number){
        const response = await fetch(`https://fakestoreapi.com/carts/${id}`);
        // console.log(response);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }

        const data = await response.json();
        return data;
    }

    async findByUserNameAndPass(username: string,password: string){
        console.log("wah");
        try{
            console.log("hii");
            const allCarts = await this.findAll();
            console.log(allCarts);
             const allUsers = await this.usersService.findAll();
             console.log(allUsers)
             const user = allUsers.find(u => u.username === username && u.password === password);
             const userCarts = allCarts.find( c => c.userId === user.id)
           
             return userCarts;

        }catch(error){
            throw new Error('Something went wrong: ' + error.message);
        }
        
    }
}
