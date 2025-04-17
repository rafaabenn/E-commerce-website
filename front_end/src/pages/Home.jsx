import React, { useEffect, useState } from "react";
import Articles from "../components/Articles";
import axios from "axios";

export default function Home({
  articles,
  setArticles,
  displayedArticles,
  setDisplayedArticles,
  searchText,
  setSearchText,
  cart,
  setCart
}) {
  

  useEffect(() => {
    setDisplayedArticles(
      articles.filter((article) =>
        article.title.toLowerCase().includes(searchText.toLowerCase())
      )
    );
  }, [searchText, articles]);

  useEffect(() => {
    const apiUrl = process.env.REACT_APP_API_URL;
    axios
      .get(`${apiUrl}/articles`)
      .then((response) => {
        const updatedArticles = response.data.map((item) => ({
          id: item.id,
          title: item.title,
          price: item.price,
          category: item.category,
          image: item.image,
          description: item.description,
          qty: 0,
        }));
        setArticles(updatedArticles);
        setDisplayedArticles(updatedArticles);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <Articles
      displayedArticles={displayedArticles}
      setDisplayedArticles={setDisplayedArticles}
      articles={articles}
      setArticles={setArticles}
      cart={cart}
      setCart={setCart}
    />
    /*<Articles articles={displayedArticles} setArticles={setDisplayedArticles} />*/
  );
}
