import React, { useEffect } from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Cookies from "universal-cookie";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import StoreIcon from "@mui/icons-material/Store";
import DeliveryDiningIcon from "@mui/icons-material/DeliveryDining";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Form({ setMenu, menu, setSituation }) {
  const navigate = useNavigate();
  const [alignment, setAlignment] = React.useState("mdeo");
  useEffect(() => {
    if (!alignment) {
      setAlignment("mdeo")
    }
  }, [alignment])
  
  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };
  var total = 0;
  var products = "";
  const cookies = new Cookies();
  cookies.get("cart").map((product, index) => {
    total = total + product.price;
    if (index === 0) {
      products = `${product.name}`;
    } else {
      products = `${products}, ${product.name}`;
    }
  });

  const children = [
    <ToggleButton style={{width:"20vw"}} className="ToggleButton" value="pickUp" key="left">
      Retiro por local
    </ToggleButton>,
    <ToggleButton style={{width:"20vw"}} className="ToggleButton" value="mdeo" key="center">
      Envío a Domicilio
    </ToggleButton>,
  ];

  const control = {
    value: alignment,
    onChange: handleChange,
    exclusive: true,
  };
  const cart = cookies.get("cart");
  const [nombre, setNombre] = useState("");
  const [numero, setNumero] = useState("");
  const [email, setEmail] = useState("");
  const [barrio, setBarrio] = useState("");
  const [calle, setCalle] = useState("");
  const [puerta, setPuerta] = useState("");
  const [instrucciones, setInstrucciones] = useState("");
  const [error, setError] = useState("");

  return (
    <div className="hugeBoxForm">
      {cookies.get("token") ? (
        <div className="form-box">
          <h1>{"Datos de Envío"}</h1>
          {cart && (
            <div>
              <p>Productos: </p>
              {products}
              <p>Total : ${total}</p>
            </div>
          )}
          <div style={{ margin: "40px 0" }} className="complete-center">
            <ToggleButtonGroup size="small" {...control}>
              {children}
            </ToggleButtonGroup>
          </div>
          <p style={{ color: "red", textAlign: "center" }}>{error}</p>
          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              onChange={(e) => setNombre(e.target.value)}
              id="standard-basic"
              label="Nombre Completo"
              variant="standard"
              value={cookies.get("token").nombre}
            />
            <TextField
              onChange={(e) => setNumero(e.target.value)}
              id="standard-basic"
              label="Celular"
              type={"number"}
              variant="standard"
              value={cookies.get("token").celular}
            />
            <TextField
              onChange={(e) => setEmail(e.target.value)}
              id="standard-basic"
              label="Email"
              variant="standard"
              value={cookies.get("token").username}
            />
            {alignment !== "pickUp" && (
              <TextField
                onChange={(e) => setBarrio(e.target.value)}
                id="standard-basic"
                label={"Departamento"}
                variant="standard"
                value={barrio}
              />
            )}
            {alignment !== "pickUp" && (
              <TextField
                onChange={(e) => setCalle(e.target.value)}
                id="standard-basic"
                label="Ciudad"
                variant="standard"
                value={calle}
              />
            )}
            {alignment !== "pickUp" && (
              <TextField
                onChange={(e) => setPuerta(e.target.value)}
                id="standard-basic"
                label="Calle y numero de puerta"
                variant="standard"
                value={puerta}
              />
            )}
            {alignment !== "pickUp" && (
              <TextField
                onChange={(e) => setInstrucciones(e.target.value)}
                id="standard-basic"
                label="Intrucciones de entrega"
                variant="standard"
                value={instrucciones}
              />
            )}
            <Button
              onClick={() => {
                axios
                  .post(process.env.REACT_APP_API + "/api/create/order", {
                    nombre: cookies.get("token").nombre,
                    numero: cookies.get("token").celular,
                    email: cookies.get("token").username,
                    barrio: alignment !== "pickUp" ? barrio : "pickUp",
                    calle: alignment !== "pickUp" ? calle : "pickUp",
                    puerta: alignment !== "pickUp" ? puerta : "pickUp",
                    instrucciones:
                      alignment !== "pickUp" ? instrucciones : "pickUp",
                    productos: products,
                    total: total,
                    forma: alignment === "pickUp" ? "pickUp" : "Envio",
                  })
                  .then((result) => {
                    cookies.set("order", result.data, { path: "/" });
                    navigate("/success");
                  })
                  .catch((error) => setError(error.response.data.message));
              }}
              style={{
                marginBottom: "50px",
                cursor: "pointer",
                display: "flex",
                justifyContent: "space-between",
              }}
              color="success"
              variant="contained"
            >
              Pagar
              <span>${total}</span>
            </Button>
          </Box>
        </div>
      ) : (
        <div className="form-box">
          <h3 style={{ textAlign: "center", marginBottom: "20px" }}>
            Inicia sesion para continuar
          </h3>
          <button
            style={{ cursor: "pointer" }}
            onClick={() => {
              setMenu(true);
              setSituation("login");
            }}
            className="login"
          >
            Ingresar o Crear Cuenta
          </button>
        </div>
      )}
    </div>
  );
}

export default Form;
