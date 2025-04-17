import React, { useState } from 'react';
import { Container, Form, Button, Row, Col, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function CheckoutPage({ cart, setCart }) {
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    const validateForm = () => {
        const newErrors = {};
        
        // Validate Full Name
        if (shippingInfo.fullName.length < 3) {
            newErrors.fullName = 'Full name must be at least 3 characters';
        }

        // Validate Phone
        const phoneRegex = /^\d{10}$/;
        if (!phoneRegex.test(shippingInfo.phone)) {
            newErrors.phone = 'Please enter a valid 10-digit phone number';
        }

        // Validate Address
        if (shippingInfo.address.length < 5) {
            newErrors.address = 'Please enter a valid address';
        }

        // Validate City
        if (shippingInfo.city.length < 2) {
            newErrors.city = 'Please enter a valid city name';
        }

        // Validate Postal Code
        const postalRegex = /^\d{5}$/;
        if (!postalRegex.test(shippingInfo.postalCode)) {
            newErrors.postalCode = 'Please enter a valid 5-digit postal code';
        }

        // Validate Card Number
        const cardNumberRegex = /^\d{16}$/;
        if (!cardNumberRegex.test(shippingInfo.cardNumber)) {
            newErrors.cardNumber = 'Please enter a valid 16-digit card number';
        }

        // Validate Card Expiry
        const expiryRegex = /^(0[1-9]|1[0-2])\/([0-9]{2})$/;
        if (!expiryRegex.test(shippingInfo.cardExpiry)) {
            newErrors.cardExpiry = 'Please enter a valid expiry date (MM/YY)';
        } else {
            const [month, year] = shippingInfo.cardExpiry.split('/');
            const expiry = new Date(2000 + parseInt(year), parseInt(month) - 1);
            if (expiry < new Date()) {
                newErrors.cardExpiry = 'Card has expired';
            }
        }

        // Validate CVV
        const cvvRegex = /^\d{3,4}$/;
        if (!cvvRegex.test(shippingInfo.cardCVV)) {
            newErrors.cardCVV = 'Please enter a valid CVV';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            setShowSuccessMessage(true);
            setTimeout(() => {
                setCart([]);
                navigate('/');
            }, 2000);
        }
    };

    const [shippingInfo, setShippingInfo] = useState({
        fullName: '',
        address: '',
        city: '',
        postalCode: '',
        phone: '',
        cardNumber: '',
        cardExpiry: '',
        cardCVV: ''
    });

    const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0).toFixed(2);

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
            {showSuccessMessage && (
                <Alert variant="success" className="mb-4">
                    Order placed successfully! Redirecting...
                </Alert>
            )}
            <Row>
                <Col md={8}>
                    <div className="bg-light p-4 rounded-3 shadow-sm">
                        <h2 className="mb-4">Shipping Information</h2>
                        <Form onSubmit={handleSubmit} noValidate>
                            <Row>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Full Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            required
                                            isInvalid={!!errors.fullName}
                                            value={shippingInfo.fullName}
                                            onChange={(e) => {
                                                setShippingInfo({...shippingInfo, fullName: e.target.value});
                                                if (errors.fullName) {
                                                    const newErrors = {...errors};
                                                    delete newErrors.fullName;
                                                    setErrors(newErrors);
                                                }
                                            }}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.fullName}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Phone</Form.Label>
                                        <Form.Control
                                            type="tel"
                                            required
                                            isInvalid={!!errors.phone}
                                            value={shippingInfo.phone}
                                            onChange={(e) => {
                                                setShippingInfo({...shippingInfo, phone: e.target.value});
                                                if (errors.phone) {
                                                    const newErrors = {...errors};
                                                    delete newErrors.phone;
                                                    setErrors(newErrors);
                                                }
                                            }}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.phone}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Form.Group className="mb-3">
                                <Form.Label>Address</Form.Label>
                                <Form.Control
                                    type="text"
                                    required
                                    isInvalid={!!errors.address}
                                    value={shippingInfo.address}
                                    onChange={(e) => {
                                        setShippingInfo({...shippingInfo, address: e.target.value});
                                        if (errors.address) {
                                            const newErrors = {...errors};
                                            delete newErrors.address;
                                            setErrors(newErrors);
                                        }
                                    }}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.address}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Row>
                                <Col md={8}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>City</Form.Label>
                                        <Form.Control
                                            type="text"
                                            required
                                            isInvalid={!!errors.city}
                                            value={shippingInfo.city}
                                            onChange={(e) => {
                                                setShippingInfo({...shippingInfo, city: e.target.value});
                                                if (errors.city) {
                                                    const newErrors = {...errors};
                                                    delete newErrors.city;
                                                    setErrors(newErrors);
                                                }
                                            }}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.city}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                                <Col md={4}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Postal Code</Form.Label>
                                        <Form.Control
                                            type="text"
                                            required
                                            isInvalid={!!errors.postalCode}
                                            value={shippingInfo.postalCode}
                                            onChange={(e) => {
                                                setShippingInfo({...shippingInfo, postalCode: e.target.value});
                                                if (errors.postalCode) {
                                                    const newErrors = {...errors};
                                                    delete newErrors.postalCode;
                                                    setErrors(newErrors);
                                                }
                                            }}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.postalCode}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                            </Row>

                            <hr className="my-4" />
                            <h3 className="mb-4">Payment Information</h3>
                            
                            <Form.Group className="mb-3">
                                <Form.Label>Card Number</Form.Label>
                                <Form.Control
                                    type="text"
                                    required
                                    pattern="\d{16}"
                                    maxLength="16"
                                    placeholder="1234 5678 9012 3456"
                                    isInvalid={!!errors.cardNumber}
                                    value={shippingInfo.cardNumber}
                                    onChange={(e) => {
                                        const value = e.target.value.replace(/\D/g, '');
                                        setShippingInfo({...shippingInfo, cardNumber: value});
                                        if (errors.cardNumber) {
                                            const newErrors = {...errors};
                                            delete newErrors.cardNumber;
                                            setErrors(newErrors);
                                        }
                                    }}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.cardNumber}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Row>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Expiry Date</Form.Label>
                                        <Form.Control
                                            type="text"
                                            required
                                            pattern="\d{2}/\d{2}"
                                            maxLength="5"
                                            placeholder="MM/YY"
                                            isInvalid={!!errors.cardExpiry}
                                            value={shippingInfo.cardExpiry}
                                            onChange={(e) => {
                                                let value = e.target.value.replace(/\D/g, '');
                                                if (value.length >= 2) {
                                                    value = value.slice(0, 2) + '/' + value.slice(2);
                                                }
                                                if (value.length <= 5) {
                                                    setShippingInfo({...shippingInfo, cardExpiry: value});
                                                }
                                                if (errors.cardExpiry) {
                                                    const newErrors = {...errors};
                                                    delete newErrors.cardExpiry;
                                                    setErrors(newErrors);
                                                }
                                            }}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.cardExpiry}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>CVV</Form.Label>
                                        <Form.Control
                                            type="password"
                                            required
                                            pattern="\d{3,4}"
                                            maxLength="4"
                                            placeholder="123"
                                            isInvalid={!!errors.cardCVV}
                                            value={shippingInfo.cardCVV}
                                            onChange={(e) => {
                                                const value = e.target.value.replace(/\D/g, '');
                                                if (value.length <= 4) {
                                                    setShippingInfo({...shippingInfo, cardCVV: value});
                                                }
                                                if (errors.cardCVV) {
                                                    const newErrors = {...errors};
                                                    delete newErrors.cardCVV;
                                                    setErrors(newErrors);
                                                }
                                            }}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.cardCVV}
                                        </Form.Control.Feedback>
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