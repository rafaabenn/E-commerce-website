import { useLocation } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';

export default function ArticleDetail(){
    const location = useLocation();
    const article = location.state?.article;

    if (!article) {
        return <p style={{ textAlign: 'center', marginTop: '50px' }}>No product data found.</p>
    }

    return (
        <Container className="mt-5">
            <Row>
                <Col md={6}>
                <Image src={article.image} fluid rounded/>
                </Col>
                <Col>
                <h2>{article.title}</h2>
                <p>{article.description}</p>
                <h4>${article.price}</h4>
                <Button>Add to Cart</Button>
                </Col>
            </Row>
        </Container>
    );
}