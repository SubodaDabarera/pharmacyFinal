import React, { useState } from 'react'
import Rating from '../rating/Rating'
import './DetailProductCard.css'

function DetailProductCard({product}) {

    const [imageName, setImageName] = useState('')
    const [averageRating, setAverageRating] = useState(0.00)
    // ../../imagesProducts/${product.stockimage}
    useState(() => {
        // setImageName(product.stockimage)
        import(`../imagesProducts/${product.stockimage}`).then((image) => 
            setImageName(image.default),

        
        setAverageRating( (product.rating/ product.numReviews).toFixed(1) )
        );
    })

    return (
        <div>
            <div>
            <div className = "detail_product_card">
                <img src = {imageName} alt = "Product image" />

                <div  className = "detail_product_card_content">
                    <h2>{product.name}</h2>
                    <div>
                        <h3 style = {{margin: '10px 0'}}>Rating : {product.numReviews} reviews</h3>
                        <h3 style = {{color: "#e8b109", fontSize: "25px", margin: 0, padding: 0}}>{averageRating} / 5.0</h3> <Rating props = {product}/>
                        {/* <h3 style = {{color: "#e8b109", fontSize: "25px", margin: 0, padding: 0}}>4.3 / 5.0</h3> <Rating props = {product}/> */}
                    </div>
                <br />
                    <span> Rs. {product.price}</span>
                
                    <p> {product.description} </p>
                    <br/>
                    
                    <button className = "buttonBuy"><i class="far fa-money-bill-alt"></i>  {' '}  Buy </button>
                    <button className = "buttonAddToCart"><i class="fa fa-cart-arrow-down" aria-hidden="true"></i>  {' '}  Add to Cart </button>
          
                </div>
            </div>
            
            {/* <hr></hr>

            <h2> More about Product</h2>
            <p>{product.description}</p> */}
           
            <hr></hr>
        </div>
        </div>
    )
}

export default DetailProductCard
