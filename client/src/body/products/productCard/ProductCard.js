import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './ProductCard.css'


function ProductCard({product}) {

    const [imageName, setImageName] = useState('')

    useState(() => {
        // setImageName(product.stockimage)
        import(`../../imagesProducts/${product.stockimage}`).then((image) => 
            setImageName(image.default)
        );
    })

    return (
        <div className = "product_card">
            {/* <Link to = {`/product/${product._id}`}><img src = {product.images.url} alt = ""/> </Link> */}

            <Link to = {`/product/${product._id}`}><img src = {imageName} alt = "Product image"/> </Link>
    
            <h3>{product.name}</h3>
            <span> Rs. {product.price}</span>
            <p>{product.description}</p>

        </div>
    )
}


export default ProductCard
