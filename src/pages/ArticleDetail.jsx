import { useLocation } from "react-router-dom";
import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form' ;

export default function ArticleDetail(){
    const location = useLocation();
    const article = location.state?.article;

    const [quantity, setQuantity] = useState(1);

    const increaseQuantity = () => {
        setQuantity(prev => prev + 1);
    };

    const decreaseQuantity = () => {
        setQuantity(prev => (prev > 1 ? prev - 1 : 1));
    };

    if (!article) {
        return <p style={{ textAlign: 'center', marginTop: '50px' }}>No product data found.</p>
    }

    return (
        <Container className="mt-5">
            <Row>
                <Col md={3}>
                    <Image src={article.image} fluid rounded/>
                </Col>
                <Col>
                    <h2>{article.title}</h2>
                    <p>{article.description}</p>
                    <h4>${article.price}</h4>
                    <h6>Quantity :</h6>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        marginBottom: '10px'
                    }}>
                        
                        <Button variant="outline-secondary" onClick={decreaseQuantity}>−</Button>
                        <Form.Control 
        
                            value={quantity}
                            onChange={(e) => {
                                const val = parseInt(e.target.value);
                                if (!isNaN(val) && val > 0) setQuantity(val);
                            }}
                            style={{ width: '60px', textAlign: 'center' }}
                        />
                        <Button variant="outline-secondary" onClick={increaseQuantity}>+</Button>
                    </div>

                    <Button>Add to Cart</Button>
                </Col>
            </Row>
        </Container>
    );
}