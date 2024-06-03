import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import style from "../styles/Home.module.css";

function SingleProduct() {
  const params = useParams();
  const { id } = params;
  console.log(id);

  const [product, setProduct] = useState([]);

  useEffect(() => {
    async function getData() {
      try {
        const url = `https://fakestoreapi.com/products/${id}`;
        const response = await fetch(url);
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.log(error);
      }
    }

    getData();
  }, []);
  return (
    <div>
      <h1 className={style.heading}>{product.title}</h1>
      <div key={product.id} className={style.productCard} onClick={() => {}}>
        <img
          src={product.image}
          alt={product.title}
          className={style.productImage}
        />
        <h1 className={style.productTitle}>{product.title}</h1>
        <p className={style.productDescription}>{product.description}</p>
        <p className={style.productPrice}>${product.price}</p>
        <p className={style.productCategory}>{product.category}</p>
        {/*
         <div className={style.productRating}>
         <p>Count: {product.rating.count}</p>
         <p>Rating: {product.rating}</p>
        </div>
        */}
      </div>
    </div>
  );
}

export default SingleProduct;
