import React from "react";
import { Button, Container, Row, Col, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function CartPage({ cart, setCart }) {
  const navigate = useNavigate();
  const updateQty = (id, change) => {
    if (
      (change === -1 && cart.some((item) => item.id === id && item.qty === 1)) ||
      (change < -1 && cart.some((item) => item.id === id))
    ) {
      setCart(cart.filter((item) => item.id !== id));
    } else {
      const updated = cart.map((item) =>
        item.id === id ? { ...item, qty: Math.max(item.qty + change, 0) } : item
      );
      setCart(updated);
    }
  };

  const total = cart
    .reduce((sum, item) => sum + item.price * item.qty, 0)
    .toFixed(2);

  return (
    <Container className="mt-5">
      <h2 className="mb-4 text-center fw-bold">Your Shopping Cart</h2>
      {cart.length === 0 ? (
        <div className="text-center p-5 bg-light rounded-3">
          <h3 className="text-muted">Your cart is empty</h3>
          <p className="text-muted">Add some items to start shopping!</p>
        </div>
      ) : (
        <>
          <div className="bg-light p-4 rounded-3 shadow-sm">
            {cart.map((item) => (
              <Row
                key={item.id}
                className="align-items-center mb-3 p-3 bg-white rounded-3"
              >
                <Col xs={2}>
                  <Image
                    src={item.image}
                    fluid
                    className="rounded-3 shadow-sm"
                    style={{ maxHeight: "80px", objectFit: "contain" }}
                  />
                </Col>
                <Col xs={3}>
                  <h6 className="mb-0 fw-bold">{item.title}</h6>
                </Col>
                <Col xs={2}>
                  <span className="fw-bold text-success">${item.price}</span>
                </Col>
                <Col xs={3}>
                  <div className="d-flex align-items-center">
                    <Button
                      variant="outline-primary"
                      size="sm"
                      onClick={() => updateQty(item.id, -1)}
                    >
                      -
                    </Button>
                    <span className="mx-3 fw-bold">{item.qty}</span>
                    <Button
                      variant="outline-primary"
                      size="sm"
                      onClick={() => updateQty(item.id, +1)}
                    >
                      +
                    </Button>
                  </div>
                </Col>
                <Col xs={2}>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => updateQty(item.id, -item.qty)}
                    className="w-100"
                  >
                    Remove
                  </Button>
                </Col>
              </Row>
            ))}
          </div>
          <div className="mt-4 p-4 bg-light rounded-3 shadow-sm">
            <h4 className="mb-3 text-end">
              Total: <span className="text-success">${total}</span>
            </h4>
            <div className="text-end">
              <Button variant="success" size="lg" className="px-5" 
              onClick={()=> {navigate('/checkout')}}>
                Proceed to Checkout
              </Button>
            </div>
          </div>
        </>
      )}
    </Container>
  );
}
