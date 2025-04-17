import { Injectable } from '@nestjs/common';
import { CartsService } from 'src/carts/carts.service';

@Injectable()
export class ArticlesService {
    constructor(private readonly cartsService: CartsService) {}
     async findAll(){
        const response =  await fetch("https://fakestoreapi.com/products");
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }

        const data = await response.json();
        return data ;
    }

    async findOne(id: number){
        // console.log(id);
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        // console.log(response);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }

        const data = await response.json();
        return data;
    }

    async findArticlesByCart(id){
        try{
            const allArticles = await this.findAll();
            const cart = await this.cartsService.findOne(id);

            const artcileInCart = cart.products.map((item) => {
                const article = allArticles.find((a)=>{ return a.id === item.productId})
                article.qty = item.quantity
                console.log(article);
                return article
            })

            return artcileInCart;
        }catch(error){
            throw new Error("Error in findArticlesByCart:"+error.message);
        }
    }
}
