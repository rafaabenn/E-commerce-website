import React from "react";
import { NavDropdown } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

export default function CategoiresHeadBar({articles,setDisplayedArticles}) {
  const navigate = useNavigate();
    const FilterByCategoryHandler = (category) => {
        setDisplayedArticles(
            articles.filter((article) => article.category === category)
        );
        navigate('/');
        
    }
    return (
        <NavDropdown title="Categories" id="categories-dropdown">
          <NavDropdown.Item onClick={() => FilterByCategoryHandler("men's clothing")}>
            Men's clothing
          </NavDropdown.Item>
          <NavDropdown.Item onClick={() => FilterByCategoryHandler("women's clothing")}>
            Women's clothing
          </NavDropdown.Item>
          <NavDropdown.Item onClick={() => FilterByCategoryHandler("electronics")}>
            Electronics
          </NavDropdown.Item>
          <NavDropdown.Item onClick={() => FilterByCategoryHandler("jewelery")}>
            Jewelery
          </NavDropdown.Item>
        </NavDropdown>
      );
}
