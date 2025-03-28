import React, { useEffect } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "bootstrap/dist/css/bootstrap.min.css";
import CategoiresHeadBar from "./CategoiresHeadBar";
import Cart from "./Cart";

export default function HeadBar({
  articles,
  searchText,
  setSearchText,
  setArticles,
}) {


  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand href="#"> Your Shop</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link
              href="#action1"
              onClick={() => {
                setArticles([...articles]);
              }}
            >
              Home
            </Nav.Link>

            <CategoiresHeadBar articles={articles} setArticles={setArticles} />
          </Nav>
          <Cart articles={articles} />
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
          <Button variant="outline-primary ms-2">Login</Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
