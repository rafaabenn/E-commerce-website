import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Reviews from "../components/Reviews";

export default function ArticleDetail({
  articles,
  setArticles,
  cart,
  setCart,
}) {
  const location = useLocation();
  const article = location.state?.article;
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();
  const user = localStorage.getItem("user");

  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decreaseQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  if (!article) {
    return (
      <div className="text-center p-5 bg-light rounded-3 mt-5">
        <h3 className="text-muted">Product Not Found</h3>
        <p className="text-muted">The requested product could not be found.</p>
      </div>
    );
  }

  const addtoCartHandler = (qty) => {
    if (!user) {
      navigate("/login");
      return;
    }
    if (cart.some((item) => item.id === article.id)) {
      setCart(
        cart.map((item) =>
          item.id === article.id ? { ...item, qty: item.qty + qty } : item
        )
      );
    } else {
      setCart([...cart, { ...article, qty: qty }]);
    }
  };

  return (
    <Container className="mt-5">
      <div className="bg-light p-4 rounded-3 shadow-sm">
        <Row className="g-4">
          <Col md={4}>
            <div className="bg-white p-3 rounded-3">
              <Image
                src={article.image}
                fluid
                className="rounded-3 shadow-sm"
                style={{
                  width: "100%",
                  height: "300px",
                  objectFit: "contain",
                }}
              />
            </div>
          </Col>
          <Col md={8}>
            <div className="bg-white p-4 rounded-3 h-100">
              <h2 className="fw-bold mb-3">{article.title}</h2>
              <p className="text-muted mb-4">{article.description}</p>
              <h3 className="text-success fw-bold mb-4">${article.price}</h3>

              <div className="mb-4">
                <h6 className="fw-bold mb-3">Quantity:</h6>
                <div className="d-flex align-items-center gap-3">
                  <Button variant="outline-primary" onClick={decreaseQuantity}>
                    −
                  </Button>
                  <Form.Control
                    value={quantity}
                    onChange={(e) => {
                      const val = parseInt(e.target.value);
                      if (!isNaN(val) && val > 0) setQuantity(val);
                    }}
                    className="text-center"
                    style={{ width: "80px" }}
                  />
                  <Button variant="outline-primary" onClick={increaseQuantity}>
                    +
                  </Button>
                </div>
              </div>

              <div className="d-flex gap-3">
                <Button
                  variant="success"
                  size="lg"
                  className="px-5"
                  onClick={() => addtoCartHandler(quantity)}
                >
                  {user ? "Add to Cart" : "Login to Buy"}
                </Button>
                
                <Button
                  variant="primary"
                  size="lg"
                  className="px-5"
                  onClick={() => {
                    if (!user) {
                      navigate("/login");
                      return;
                    }
                    // Add to cart and navigate to checkout
                    if (!cart.some(item => item.id === article.id)) {
                      setCart([...cart, { ...article, qty: quantity }]);
                    }
                    navigate("/checkout");
                  }}
                >
                  Buy Now
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      </div>

      <div className="mt-4">
        <Reviews isLoggedIn={!!user} />
      </div>
    </Container>
  );
}
