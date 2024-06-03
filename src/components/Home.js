import React, { useEffect, useState } from "react";
import style from "../styles/Home.module.css";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

function Home() {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All Products");

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
    let filtered = products.filter((product) =>
      product.title.toLowerCase().includes(searchQuery)
    );

    if (selectedCategory !== "All Products") {
      filtered = filtered.filter(
        (product) => product.category === selectedCategory
      );
    }

    setFilteredProducts(filtered);
  }, [searchQuery, selectedCategory, products]);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const navigate = useNavigate();
  return (
    <div>
      <h1 className="box-border mt-12 mb-4 text-center text-4xl font-semibold">
        All Products
      </h1>
      <div className="searchContainer box-border w-fit mx-auto bg-red-500 flex justify-start gap-10 items-center p-1">
        <div className="box-border bg-white pl-2 flex justify-start items-center">
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className="box-border text-gray-500 w-6 h-5"
          />
          <input
            type="text"
            placeholder="Search"
            className="searchInput ml-1 px-2"
            onChange={handleSearch}
          />
        </div>
        <select
          name=""
          id=""
          className="box-border px-2 py-1"
          onChange={handleCategoryChange}
        >
          <option value="All Products">All Products</option>
          <option value="men's clothing">Men's clothing</option>
          <option value="women's clothing">Women's clothing</option>
          <option value="jewelery">Jewellery</option>
          <option value="electronics">Electronics</option>
        </select>
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
