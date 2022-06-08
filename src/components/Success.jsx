import React from "react";
import Cookies from "universal-cookie";

function Success() {
  const cookies = new Cookies();
  const order = cookies.get("order");
  return (
    <div className="successBox">
      {order.status === "NOT_PAYED" && (
        <div className="successTitles">
          <h1>Gracias {order.nombre}</h1>
          <h2>Su orden fue confirmada</h2>
          <button style={{cursor:"pointer"}} onClick={() => {
            cookies.set("cart", [])
            window.location.href = `https://autentika.herokuapp.com/order/${order.id}`}
            }>Pagar</button>
          <p>Seras refirigido a mercadopago</p>
        </div>
      )}
      {order.status === "PAYED" && (
        <div className="successTitles">
          <h1>Hola {order.nombre}</h1>
          <h2>Su orden ya fue pagada, gracias</h2>
        </div>
      )}
      <hr />
      <div className="successInfo">
        <h3>Sus datos: </h3>
        <p>
          {" "}
          <span>Nombre</span> : {order.nombre}
        </p>
        <p>
          {" "}
          <span>Numero</span> : {order.numero}
        </p>
        <p>
          {" "}
          <span>Email</span> : {order.email}
        </p>
        <p>
          {" "}
          <span>Departamento</span> : {order.barrio}
        </p>
        <p>
          {" "}
          <span>Barrio</span> :{order.calle}{" "}
        </p>
        <p>
          {" "}
          <span>Calle y Num de Puerta</span> : {order.puerta}
        </p>
        <p>
          {" "}
          <span>Instrucciones</span> : {order.instrucciones}
        </p>
        <p>
          {" "}
          <span>Productos</span> : {order.productos}
        </p>
        <p>
          {" "}
          <span>Total</span> : {order.total}
        </p>
        <p>
          {" "}
          <span>Forma de entrega</span> : {order.forma}
        </p>
        <p>
          {" "}
          <span>Status</span> : {order.status}
        </p>
        <p>
          {" "}
          <span>Fecha</span> : {order.created_at}
        </p>
        <hr />
        <p>La orden fue registrada en tu cuenta exitosamente!</p>
      </div>
    </div>
  );
}

export default Success;
