import React from "react";

export default function CategoiresHeadBar() {
    const FilterByCategoryHandler = (category) => {
        setDisplayedPro(
          products.filter((product) => product.category === category)
        );
    }
  return (
    <>
      <a
        className="nav-link dropdown-toggle"
        href="#"
        id="categoriesDropdown"
        role="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        Categories
      </a>
      <ul className="dropdown-menu" aria-labelledby="categoriesDropdown">
        <li>
          <button
            className=" btn dropdown-item"
            onClick={() => FilterByCategoryHandler("men's clothing")}
          >
            Men's clothing
          </button>
        </li>
        <li>
          <button
            className=" btn dropdown-item"
            onClick={() => FilterByCategoryHandler("women's clothing")}
          >
            Women's clothing
          </button>
        </li>
        <li>
          <button
            className=" btn dropdown-item"
            onClick={() => FilterByCategoryHandler("electronics")}
          >
            Electronics
          </button>
        </li>
        <li>
          <button
            className=" btn dropdown-item"
            onClick={() => FilterByCategoryHandler("jewelery")}
          >
            Jewelery
          </button>
        </li>
      </ul>
    </>
  );
}
