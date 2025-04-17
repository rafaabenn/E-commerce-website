import HeaderBar from "./components/HeaderBar";
import CartPage from "./pages/CartPage";
import React, { useEffect, useState } from "react";
import {
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ArticleDetail from "./pages/ArticleDetail";
import CheckoutPage from "./pages/CheckoutPage";  // Add this import

export default function AppRouter() {
  const location = useLocation();
  const [articles, setArticles] = useState([]);
  const [displayedArticles, setDisplayedArticles] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);
  return (
    <>
      {location.pathname !== "/login" && (
        <HeaderBar
          user={user}
          articles={articles}
          setArticles={setArticles}
          searchText={searchText}
          setSearchText={setSearchText}
          displayedArticles={displayedArticles}
          setDisplayedArticles={setDisplayedArticles}
          cart={cart}
          setUser={setUser}
        />
      )}
      <Routes>
        <Route
          path="/"
          element={
            <Home
              articles={articles}
              setArticles={setArticles}
              searchText={searchText}
              setSearchText={setSearchText}
              displayedArticles={displayedArticles}
              setDisplayedArticles={setDisplayedArticles}
              cart={cart}
              setCart={setCart}
            />
          }
        />
        <Route path="/login" element={<Login userState={user} setUserState={setUser} />} />
        <Route
          path="/product/:id"
          element={
            <ArticleDetail
              articles={articles}
              setArticles={setArticles}
              cart={cart}
              setCart={setCart}
            />
          }
        />
        <Route
          path="/cart"
          element={<CartPage cart={cart} setCart={setCart} />}
        />
        <Route
          path="/checkout"
          element={<CheckoutPage cart={cart} setCart={setCart} />}
        />
      </Routes>
    </>
  );
}
