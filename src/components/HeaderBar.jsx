import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "bootstrap/dist/css/bootstrap.min.css";
import CategoiresHeadBar from "./CategoiresHeadBar";
import Cart from "./Cart";
import { useNavigate } from "react-router-dom";

export default function HeadBar({
  articles,
  searchText,
  setSearchText,
  setArticles,
  displayedArticles,
  setDisplayedArticles,
  cart,
  user,
  setUser
}) {
  const navigate = useNavigate();
 

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    navigate("/");
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand>Your Shop</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link
              onClick={() => {
                setArticles([...articles]);
                navigate("/");
              }}
            >
              Home
            </Nav.Link>

            <CategoiresHeadBar
              articles={articles}
              setDisplayedArticles={setDisplayedArticles}
            />
          </Nav>
          {user && <Cart cart={cart} />}
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <Button variant="outline-success">Search</Button>
          </Form>
          {user ? (
            <NavDropdown
              title={`Welcome, ${user.username}`}
              id="nav-dropdown"
              className="ms-2"
            >
              <NavDropdown.Item>Profile</NavDropdown.Item>
              <NavDropdown.Item>Orders</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
            </NavDropdown>
          ) : (
            <Button
              variant="outline-primary ms-2"
              onClick={() => navigate("/login")}
            >
              Login
            </Button>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
