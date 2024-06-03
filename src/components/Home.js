import React, { useEffect, useState } from "react";
import style from "../styles/Home.module.css";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

function Home() {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    async function getData() {
      try {
        const url = "https://fakestoreapi.com/products";
        const response = await fetch(url);
        const data = await response.json();
        setProducts(data);
        setFilteredProducts(data);
      } catch (error) {
        console.log(error);
      }
    }

    getData();
  }, []);

  useEffect(() => {
    console.log("object")
    if (searchQuery) {
    }
    const filtered = products.filter((product) =>
      product.title.toLowerCase().includes(searchQuery)
    );
    setProducts(filtered);
  }, [searchQuery]);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
    console.log(searchQuery)
  };

  const navigate = useNavigate();
  return (
    <div>
      <h1 className="box-border mt-12 mb-4 text-center text-4xl font-semibold">
        All Products
      </h1>
      <div className="searchContainer box-border w-fit mx-auto bg-red-500 flex justify-start gap-10 items-center p-1">
        <div className="box-border bg-white pl-2">
          <FontAwesomeIcon icon={faMagnifyingGlass} />
          <input
            type="text"
            placeholder="Search"
            className="searchInput ml-1"
            onChange={handleSearch}
          />
        </div>
        <input type="text" placeholder="Search" className="filterInput" />
      </div>
      {filteredProducts.map((product) => (
        <div
          key={product.id}
          className={style.productCard}
          onClick={() => {
            navigate(`/home/${product.id}`);
          }}
        >
          <img
            src={product.image}
            alt={product.title}
            className={style.productImage}
          />
          <h1 className={style.productTitle}>{product.title}</h1>
          <p className={style.productDescription}>{product.description}</p>
          <p className={style.productPrice}>${product.price}</p>
          <p className={style.productCategory}>{product.category}</p>
          <div className={style.productRating}>
            <p>Rating: {product.rating.rate}</p>
            <p>Count: {product.rating.count}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Home;
