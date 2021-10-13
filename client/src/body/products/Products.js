import React, { useContext } from 'react'
import { DataContext } from '../../GlobalStateD'
import ProductCard from './productCard/ProductCard'
import './product.css'

function Products() {

    const state = useContext(DataContext)
    
    const [products] = state.products


    return (
        <div>
            <div className = "products_page">
                {
                    products.map(product => (
                        <ProductCard key = {product._id} product = {product} />
                        
                    ))
                }
            </div>
        </div>
    )
}

export default Products
