import React, { useState } from "react";
import Rating from "../rating/Rating";
import "./DetailProductCard.css";

function DetailProductCard({ product }) {
  const [imageName, setImageName] = useState("");
  const [averageRating, setAverageRating] = useState(0.0);
  const [userName, setUserName] = useState(sessionStorage.getItem("userName"))

  // ../../imagesProducts/${product.stockimage}
  useState(() => {
    // setImageName(product.stockimage)
    import(`../imagesProducts/${product.stockimage}`).then((image) =>
      setImageName(image.default)
    );
  });

  //for calculating the rating
  useState(() => {
    if (product.numReviews == 0) {
      setAverageRating(0.0);
    } else {
      setAverageRating((product.rating / product.numReviews).toFixed(1));
    }
  });

  const handleCart = (product) => {
    let hasCart = false;
    const newProduct = product._id;
    const Items = JSON.parse(localStorage.getItem("cartItems")) || [];

    Items.map((item) => {
      if (item == newProduct) {
        hasCart = true;
      }
    });

    if (hasCart) {
      alert("This item is currently in your shopping cart!");
    } else {
      Items.push(newProduct);
      localStorage.setItem("cartItems", JSON.stringify(Items));
      alert("Item added successfully!");
    }
  };

  const handleBuy = () => {
    console.log(userName)
    if(userName == null || userName == "" || userName == undefined){
        alert("You need to log into the system")
    }
    else{
        alert("Your transaction will take place shortly...")
    }
  }

  return (
    <div>
      <div>
        <div className="detail_product_card">
          <img src={imageName} alt="Product image" />

          <div className="detail_product_card_content">
            <h2>{product.name}</h2>
            <div>
              <h3 style={{ margin: "10px 0" }}>
                Rating : {product.numReviews} reviews
              </h3>
              <h3
                style={{
                  color: "#e8b109",
                  fontSize: "25px",
                  margin: 0,
                  padding: 0,
                }}
              >
                {averageRating} / 5.0
              </h3>{" "}
              <Rating props={product} />
              {/* <h3 style = {{color: "#e8b109", fontSize: "25px", margin: 0, padding: 0}}>4.3 / 5.0</h3> <Rating props = {product}/> */}
            </div>
            <br />
            <span> Rs. {product.price}</span>

            <p> {product.description} </p>
            <br />

            <button
              className="buttonBuy"
              onClick={() => handleBuy() }
            >
              <i class="far fa-money-bill-alt"></i> Buy{" "}
            </button>
            <button
              className="buttonAddToCart"
              onClick={() => handleCart(product)}
            >
              <i class="fa fa-cart-arrow-down" aria-hidden="true"></i> Add to
              Cart{" "}
            </button>
          </div>
        </div>

        {/* <hr></hr>

            <h2> More about Product</h2>
            <p>{product.description}</p> */}

        <hr></hr>
      </div>
    </div>
  );
}

export default DetailProductCard;
