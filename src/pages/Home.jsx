import React, { useEffect, useState } from "react";
import HeaderBar from "../components/HeaderBar";
import Articles from "../components/Articles";
import axios from "axios";

export default function Home() {
  const [articles, setArticles] = useState([]);
  const [diplayedarticles, setDisplayedArticles] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    setDisplayedArticles(
      articles.filter((article) =>
        article.title.toLowerCase().includes(searchText.toLowerCase())
      )
    );
  }, [searchText]);

  useEffect(() => {
    const articleHandler = (list) => {
      const updatedArticles = list.map((item) => {
        return {
          id: item.id,
          title: item.title,
          price: item.price,
          category: item.category,
          image: item.image,
          description: item.description,
          qty: 0,
        };
      });
      setArticles([...articles, ...updatedArticles]);
      setDisplayedArticles([...diplayedarticles, ...updatedArticles]);
    };
    axios
      .get("https://fakestoreapi.com/products")
      .then((response) => {
        articleHandler(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  return (
    <div>
      <HeaderBar
        articles={articles}
        setArticles={setDisplayedArticles}
        searchText={searchText}
        setSearchText={setSearchText}
      />
      <Articles
        articles={diplayedarticles}
        setArticles={setDisplayedArticles}
      />
    </div>
  );
}
