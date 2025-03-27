import React, { useEffect, useState } from "react";
import Article from "./Article";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function Articles() {
  const [dataList, setDataList] = useState([]);

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((response) => {
        setDataList(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <>
      <div className="container">
        <div className="row mt-5">
          {dataList.map((item, index) => (
            <div className="col-12 col-sm-6 col-md-3 col-lg-3 mb-4" key={index}>
              <Article data={item} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
