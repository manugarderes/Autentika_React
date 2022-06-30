import React from "react";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";

function Cart() {
  const navigate = useNavigate();
  const cookies = new Cookies();
  const cart = cookies.get("cart");
  var total = 0;
  cart.map((product) => {
    total = total + product.price;
  });
  return (
    <div className="hugeBoxCart" style={{ marginTop: "12vh" }}>
      <h1 style={{ textAlign: "center" }}>Carrito de Compras</h1>
      {cart &&
        cart.map((product) => (
          <div className="cartItem" key={product.id}>
            <div>
              <h3>{product.name}</h3>
              <p>Talle: {product.size}</p>
              <p>+ ${product.price}</p>
              <hr />
              <p
              style={{cursor:"pointer"}}
                onClick={() => {
                  if (cart.length > 1) {
                    cookies.set(
                      "cart",
                      cart.filter((item) => item.id !== product.id)
                    );
                    navigate("/cart");
                  } else {
                    cookies.remove("cart");
                    navigate("/");
                  }
                }}
              >
                Borrar
              </p>
            </div>
            <img style={{backgroundColor:"#cac3c3"}} src={product.img} />
          </div>
        ))}
      <h3 style={{ margin: "10px" }}>Total ${total}</h3>
      <div style={{ flexDirection: "column" }} className="complete-center">
        <button style={{cursor:"pointer"}} onClick={() => navigate("/form")} className="cartButton">
          CONTINUAR
        </button>
        <a style={{ marginBottom: "50px", cursor:"pointer" }} onClick={() => navigate("/")}>
          Seguir comprando
        </a>
      </div>
    </div>
  );
}

export default Cart;
