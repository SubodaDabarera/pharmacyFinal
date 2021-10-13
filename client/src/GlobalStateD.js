import React, { Children, createContext, useEffect, useState } from 'react'
import {io} from 'socket.io-client'
import { getData } from './utils/FetchData'


export const DataContext = createContext()

export const DataProvider = ({children}) => {
    const [products, setProducts] = useState([])
    const [socket, setSocket] = useState(null)

    console.log("inside global State")

    // setProducts(res.data.products)

    useEffect(() => {
        getData('http://localhost:8000/products')
        .then(res => setProducts(res.data.products))
        .catch(err => console.log(err.response.data.msg))

        const socket = io.connect("http://localhost:8000")
           
        setSocket(socket)

        return () => socket.close()

    }, [])


    const state = {
        products: [products, setProducts],
        socket
    }

    return(
        <DataContext.Provider value = {state}>
            {children}
        </DataContext.Provider>
    )

}