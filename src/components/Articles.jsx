import React, { useEffect, useState } from "react";
import Article from "./Article";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function Articles({ articles, setArticles }) {


  return (
    <>
      <div className="container">
        <div className="row mt-5">
          {articles.map((item, index) => (
            <div className="col-12 col-sm-6 col-md-3 col-lg-3 mb-4" key={index}>
              <Article article={item} setArticles={setArticles} articles={articles} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
