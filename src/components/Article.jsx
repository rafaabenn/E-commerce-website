import React, { useState } from 'react'


export default function Article({data}) {
    
    
    console.log(data);
  return (
    <div className="card mt-3 mb-3 ms-5 me-3" style={{width: "18rem", height: "32rem", overflow: "hidden"}} id="your-card-id">
      <div className='tw-bg-red-500'>hi</div>
        <img src={data.image} className="card-img-top" alt="Card Image" style={{height: "296.983px  "}}/>
        <div className="card-body">
            <h5 className="card-title">{data.title}</h5>
            <p className="card-text">{data.description}</p>
            <p className="card-text">Price: {data.price}MAD</p>
            <a href="#" className="btn btn-link">Go somewhere</a>
            <a href="#" className="btn btn-primary">Add to cart</a>
        </div>

    </div>
  )
}
