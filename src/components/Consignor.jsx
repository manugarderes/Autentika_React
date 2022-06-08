import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Cookies from "universal-cookie";


function Consignor() {
  const cookies = new Cookies();
  const [products, setProducts] = useState([])

  useEffect(() => {
      axios.get(
          "https://autentika.herokuapp.com/api/products/consignor/" + cookies.get("token").id
      ).then((result) => {
        setProducts(result.data)
      })
  }, [])
  
  return (
    <div id='Account'>
        <h2>Hola, {cookies.get("token").nombre}</h2>
        <div className="orders">
            <p style={{textAlign:"center"}}>
            {products.length < 1 && "No tienes ordenes realizadas"}
            </p>
            {products && products.map((product) => (
                <div className="order">
                  <div>
                    <p>Nombre : {product.name}</p>
                    <p>Precio Actual : ${product.price}</p>
                    <p>Prcio Anterior : {product.offer ? `$${product.offer}` : "No hay oferta para el producto"}</p>
                    <p>Talle : {product.size}</p>
                  </div>
                  <img style={{height:"100px"}} src={product.img}/>
                </div>
            ))}
        </div>
    </div>
  )
}

export default Consignor