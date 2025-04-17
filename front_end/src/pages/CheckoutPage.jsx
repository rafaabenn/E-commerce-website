import React, { useState } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function CheckoutPage({ cart, setCart }) {
    const navigate = useNavigate();
    const [shippingInfo, setShippingInfo] = useState({
        fullName: '',
        address: '',
        city: '',
        postalCode: '',
        country: '',
        phone: ''
    });

    const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0).toFixed(2);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you would typically process the payment and order
        alert('Order placed successfully!');
        setCart([]); // Clear cart after successful order
        navigate('/');
    };

    if (cart.length === 0) {
        return (
            <Container className="mt-5 text-center">
                <h2>Your cart is empty</h2>
                <Button 
                    variant="primary" 
                    className="mt-3"
                    onClick={() => navigate('/')}
                >
                    Continue Shopping
                </Button>
            </Container>
        );
    }

    return (
        <Container className="mt-5">
            <Row>
                <Col md={8}>
                    <div className="bg-light p-4 rounded-3 shadow-sm">
                        <h2 className="mb-4">Shipping Information</h2>
                        <Form onSubmit={handleSubmit}>
                            <Row>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Full Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            required
                                            value={shippingInfo.fullName}
                                            onChange={(e) => setShippingInfo({...shippingInfo, fullName: e.target.value})}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Phone</Form.Label>
                                        <Form.Control
                                            type="tel"
                                            required
                                            value={shippingInfo.phone}
                                            onChange={(e) => setShippingInfo({...shippingInfo, phone: e.target.value})}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Form.Group className="mb-3">
                                <Form.Label>Address</Form.Label>
                                <Form.Control
                                    type="text"
                                    required
                                    value={shippingInfo.address}
                                    onChange={(e) => setShippingInfo({...shippingInfo, address: e.target.value})}
                                />
                            </Form.Group>

                            <Row>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>City</Form.Label>
                                        <Form.Control
                                            type="text"
                                            required
                                            value={shippingInfo.city}
                                            onChange={(e) => setShippingInfo({...shippingInfo, city: e.target.value})}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={3}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Postal Code</Form.Label>
                                        <Form.Control
                                            type="text"
                                            required
                                            value={shippingInfo.postalCode}
                                            onChange={(e) => setShippingInfo({...shippingInfo, postalCode: e.target.value})}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={3}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Country</Form.Label>
                                        <Form.Control
                                            type="text"
                                            required
                                            value={shippingInfo.country}
                                            onChange={(e) => setShippingInfo({...shippingInfo, country: e.target.value})}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Button variant="success" type="submit" size="lg" className="w-100 mt-4">
                                Place Order (${total})
                            </Button>
                        </Form>
                    </div>
                </Col>

                <Col md={4}>
                    <div className="bg-light p-4 rounded-3 shadow-sm">
                        <h3 className="mb-4">Order Summary</h3>
                        {cart.map((item) => (
                            <div key={item.id} className="d-flex justify-content-between mb-3">
                                <div>
                                    <h6 className="mb-0">{item.title}</h6>
                                    <small className="text-muted">Quantity: {item.qty}</small>
                                </div>
                                <span>${(item.price * item.qty).toFixed(2)}</span>
                            </div>
                        ))}
                        <hr />
                        <div className="d-flex justify-content-between align-items-center">
                            <h5 className="mb-0">Total:</h5>
                            <h4 className="mb-0 text-success">${total}</h4>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}