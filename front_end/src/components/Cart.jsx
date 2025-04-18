import React, { useMemo } from "react";
import { Link } from "react-router-dom";
function Cart({ cart }) {

  const numberInCart = useMemo(() => {
    let sumnbr = 0;
    for (let i = 0; i < cart.length; i++) {
      sumnbr += cart[i].qty;
    }
    return sumnbr;
  },[cart]);
  
  return (
    <>
      <Link to="/cart">
        <div className="nav-link me-1 mb-sm-0">
          <img src="/assets/shop-icon.svg" alt="My cart" />
        </div>
      </Link>
      <div className=" me-3 ms-1">{numberInCart}</div>
    </>
  );
}

export default Cart;