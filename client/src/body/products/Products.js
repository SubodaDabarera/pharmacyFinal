import React, { useContext, useEffect, useState } from "react";
import { DataContext } from "../../GlobalStateD";
import ProductCard from "./productCard/ProductCard";
import "./product.css";
import { filterProducts } from "../../utils/FetchData";

function Products(props) {
  const state = useContext(DataContext);
  const categoryItem = props.selectedIndex;
  let [products] = state.products;

  const [filteredProducts, setFilteredProducts] = useState([]);

  //   const [products, setProducts] = useState(state.products);

  useEffect(() => {
    async function getFilters() {
      await filterProducts(
        "http://localhost:8000/products/category",
        categoryItem
      )
        .then((res) => {
          setFilteredProducts(res.data);
          console.log(res.data);
        })
        .catch((err) => console.log(err));
    }
    getFilters();
  }, [categoryItem]);

  console.log(categoryItem);

  return (
    <div>
      <div className="products_page">
        {categoryItem != "" && categoryItem != "home" ? (
          <>
            {filteredProducts.map((item, idx) => {
              return <ProductCard key={item._id} product={item} />;
            })}
          </>
        ) : (
          <>
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </>
        )}
      </div>
    </div>
  );
}

export default Products;
