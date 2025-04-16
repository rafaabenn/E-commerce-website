import "./App.css";
import Article from "./components/Article";
import Articles from "./components/Articles";
import HeaderBar from "./components/HeaderBar";
import CartPage from "./pages/CartPage";
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ArticleDetail from "./pages/ArticleDetail";

function App() {
  const [articles, setArticles] = useState([]);
  const [searchText, setSearchText] = useState("");


  return (
    <div>
      <Router>
        <HeaderBar
          articles={articles}
          setArticles={setArticles}
          searchText={searchText}
          setSearchText={setSearchText}
        />
        <Routes>
          <Route 
            path="/" 
            element={
              <Home 
              articles={articles}
              setArticles={setArticles}
              searchText={searchText}
              setSearchText={setSearchText}
              />
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/product/:id" element={
            <ArticleDetail
              articles={articles}
              setArticles={setArticles}
            />} />
          <Route path="/cart" element={<CartPage articles={articles} setArticles={setArticles}/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
