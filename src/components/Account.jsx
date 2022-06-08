import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Cookies from "universal-cookie";


function Account() {
  const cookies = new Cookies();
  const [orders, setOrders] = useState([])

  useEffect(() => {
      axios.get(
          "https://autentika.herokuapp.com/api/order"
      ).then((result) => {
          setOrders(result.data)
      })
  }, [])
  
  return (
    <div id='Account'>
        <h2>Hola, {cookies.get("token").nombre}</h2>
        <div className="orders">
            <p style={{textAlign:"center"}}>
            {orders.filter((order) => order.email === cookies.get("token").username).length < 1 && "No tienes ordenes realizadas"}
            </p>
            {orders && orders.filter((order) => order.email === cookies.get("token").username).map((order) => (
                <div style={order.status === "PAYED" ? {boxShadow: "green 0px 5px 15px"} : {}} className="order">
                    <p>Productos : {order.productos}</p>
                    <p>Total : ${order.total}</p>
                    <p>Entrega {order.barrio}, {order.calle}, {order.instrucciones}</p>
                    <hr />
                    <p>Status de Orden {order.status}</p>
                </div>
            ))}
        </div>
    </div>
  )
}

export default Account