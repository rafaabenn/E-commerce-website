import React, { useState } from 'react'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import '../styles/article.css'
import { useNavigate } from 'react-router-dom';


export default function Article({article, setArticles, articles, cart, setCart}) {
    const navigate = useNavigate();
    const user = localStorage.getItem('user');

    const addtoCartHandler = (qty) => {
        if (!user) {
            navigate('/login');
            return;
        }
        if(cart.some((item) => item.id === article.id)){
            setCart(cart.map((item) => item.id === article.id ? {...item, qty: item.qty + 1} : item)); 
        }else{
            setCart([...cart, {...article, qty: qty}]);
        }
    }

    return (
        <Card className="shadow-sm rounded-4 h-100">
            <Card.Img variant="top" src={article.image} className="p-3 rounded-4 h-50 " />
            <Card.Body  style={{ width: '300px', height: '200px' }} className="d-flex flex-column justify-content-between">
             <div>
             <Card.Title className="fs-5 ellipsis-multi-title ">{article.title}</Card.Title>
              <Card.Text style={{height: '112px'}} className="product-description text-muted flex-grow-1 ellipsis-multi">
                {article.description}
              </Card.Text>
             </div>
             <div>
             <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="mb-0 text-primary">${article.price}</h5>
              </div>
              <div className="d-flex gap-2">
                <Button 
                    variant="primary" 
                    className="flex-grow-1"
                    onClick={() => addtoCartHandler(1)}
                >
                    {user ? 'Add to Cart' : 'Login to Buy'}
                </Button>
                <Button 
                    variant="outline-secondary" 
                    className="flex-grow-1"
                    onClick={() => navigate(`/product/${article.id}`,{ state: { article } })}
                >
                    View
                </Button>
            </div>
           </div>
          </Card.Body>
        </Card>
    );
}
