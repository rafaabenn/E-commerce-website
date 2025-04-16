import React, { useEffect, useState } from "react";
import Articles from "../components/Articles";
import axios from "axios";

export default function Home({ articles, setArticles, searchText, setSearchText }) {
  const [displayedArticles, setDisplayedArticles] = useState([]);

  useEffect(() => {
    setDisplayedArticles(
      articles.filter((article) =>
        article.title.toLowerCase().includes(searchText.toLowerCase())
      )
    );
  }, [searchText, articles]);

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
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
    <Articles articles={articles} setArticles={setArticles} /> 
    /*<Articles articles={displayedArticles} setArticles={setDisplayedArticles} />*/
  );
}
