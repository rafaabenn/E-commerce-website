import React from "react";
import { Button, Container, Row, Col, Image } from "react-bootstrap";

export default function CartPage({ articles, setArticles }) {
  const cartItems = articles.filter(item => item.qty > 0);

  const updateQty = (id, change) => {
    const updated = articles.map(item =>
      item.id === id
        ? { ...item, qty: Math.max(item.qty + change, 0) }
        : item
    );
    setArticles(updated);
  };

  const total = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0).toFixed(2);

  return (
    <Container className="mt-5">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>No items in cart.</p>
      ) : (
        <>
          {cartItems.map(item => (
            <Row key={item.id} className="align-items-center mb-3">
              <Col xs={2}><Image src={item.image} fluid /></Col>
              <Col xs={3}>{item.title}</Col>
              <Col xs={2}>${item.price}</Col>
              <Col xs={3}>
                <Button onClick={() => updateQty(item.id, -1)}>-</Button>
                <span className="mx-2">{item.qty}</span>
                <Button onClick={() => updateQty(item.id, +1)}>+</Button>
              </Col>
              <Col xs={2}>
                <Button variant="danger" onClick={() => updateQty(item.id, -item.qty)}>
                  Remove
                </Button>
              </Col>
            </Row>
          ))}
          <hr />
          <h4>Total: ${total}</h4>
          <Button variant="success">Proceed to Checkout</Button>
        </>
      )}
    </Container>
  );
}
