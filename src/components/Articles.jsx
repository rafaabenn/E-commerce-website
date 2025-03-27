import React, { useEffect, useState } from "react";
import Article from "./Article";
import axios from "axios";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function Articles() {
  const [dataList, setDataList] = useState([]);

  useEffect(() => {
    axios.get("https://fakestoreapi.com/products")
    .then((response) => {
      setDataList(response.data);
    })
    .catch((error) => {
        console.error(error);
    })
  }, []);

  return (
    <>
    <div className="row" >
    {
    dataList.map((item, index) => {
        return <Article data={item} key={index} />
    })
    } 
    </div>
    
    </>
  );
}
