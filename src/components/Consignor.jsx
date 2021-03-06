import axios from "axios";
import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie";

function Consignor() {
  const cookies = new Cookies();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get(
        process.env.REACT_APP_API +
          "/api/products/consignor/" +
          cookies.get("token").id
      )
      .then((result) => {
        setProducts(result.data);
      });
  }, []);

  return (
    <div id="Account">
      <h2>Hola, {cookies.get("token").nombre}</h2>
      <h5 style={{textAlign:"center"}}>Area de consignador</h5>
      <div className="orders">
        <p style={{ textAlign: "center" }}>
          {products.length < 1 && "No tienes ordenes realizadas"}
        </p>
        {products &&
          products.map((product) => (
            <div className="order product-order">
              <div>
                <p>Nombre : {product.name}</p>
                <p>Precio Actual : ${product.price}</p>
                <p>
                  Prcio Anterior :{" "}
                  {product.offer
                    ? `$${product.offer}`
                    : "No hay oferta para el producto"}
                </p>
                <p>Talle : {product.size}</p>
              </div>
              <img style={{ height: "100px", backgroundColor:"#cac3c3" }} src={product.img} />
            </div>
          ))}
      </div>
    </div>
  );
}

export default Consignor;
