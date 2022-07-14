import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import InfoIcon from "@mui/icons-material/Info";
import SupportIcon from "@mui/icons-material/Support";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import Cookies from "universal-cookie";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DoNotDisturbOnIcon from "@mui/icons-material/DoNotDisturbOn";
import PersonIcon from "@mui/icons-material/Person";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import SearchIcon from "@mui/icons-material/Search";
import VerifiedIcon from "@mui/icons-material/Verified";
import AddIcon from "@mui/icons-material/Add";

function Menu({ menu, setMenu, setSituation, situation}) {
  const cookies = new Cookies();
  const navigate = useNavigate();
  const [products, setProducts] = useState();
  const [productNames, setProductNames] = useState();
  const [types, setTypes] = useState();
  const [nombreR, setNombreR] = useState();
  const [usernameR, setUsernameR] = useState();
  const [celularR, setCelularR] = useState();
  const [contraseñaR, setContraseñaR] = useState();
  const [users, setUsers] = useState();
  const [usernameL, setUsernameL] = useState();
  const [contraseñaL, setContraseñaL] = useState();
  const [error, setError] = useState(false);
  const [messages, setMessages] = useState();
  const [showTypes, setShowTypes] = useState(false);
  const [visibility, setVisibility] = useState(false);
  useEffect(() => {
    axios.get(process.env.REACT_APP_API + "/api/types").then((result) => {
      setTypes(result.data);
    });
  }, [menu]);
  return (
    <div className={menu ? "menu show" : "menu hide"}>
      {situation === "menu" && (
        <div className="menu-info">
          <form className="searchForm" action="/search" method="get">
            <input placeholder="Buscar productos" type="text" name="info" />
            <button type="submit">
              <SearchIcon />
            </button>
          </form>
          <p>
            <span
              style={{ fontFamily: "sans-serif", cursor: "pointer" }}
              onClick={() => {
                navigate(`shop/0`);
                setMenu(false);
                setShowTypes(false);
              }}
            >
              SHOP ONLINE
            </span>{" "}
            <AddIcon
              style={{ cursor: "pointer" }}
              onClick={() => setShowTypes(!showTypes)}
            />
          </p>
          {types &&
            showTypes &&
            types.map((type) => (
              <p
                style={{
                  padding: "0 20px 0 20px",
                  fontSize: "18px",
                  cursor: "pointer",
                }}
                key={type.id}
                onClick={() => {
                  navigate(`shop/${type.id}`);
                  setMenu(false);
                  setShowTypes(false);
                }}
              >
                {type.name}
              </p>
            ))}
          <hr />
          <p
            style={{ cursor: "pointer" }}
            onClick={() => {
              navigate(`/vende`);
              setMenu(false);
              setShowTypes(false);
            }}
          >
            Vendé <InfoIcon />
          </p>
          <p
            style={{ cursor: "pointer" }}
            onClick={() => {
              navigate(`/nosotros`);
              setMenu(false);
              setShowTypes(false);
            }}
          >
            Nosotros <SupportIcon />
          </p>
          <p>
            Contaco <SupportIcon />
          </p>
          {cookies.get("token") ? (
            <div>
              <hr />
              <p
                style={{ cursor: "pointer" }}
                onClick={() => {
                  navigate(`/account`);
                  setMenu(false);
                  setShowTypes(false);
                }}
              >
                Mi Cuenta
                <PersonIcon />
              </p>
              {cookies.get("token").isConsignor === 1 && (
                <p
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    navigate(`/consignor`);
                    setMenu(false);
                    setShowTypes(false);
                  }}
                >
                  Consignador Verificado
                  <VerifiedIcon style={{ color: "green" }} />
                </p>
              )}
              <p
                style={{
                  textDecoration: "underline",
                  cursor: "pointer",
                }}
                onClick={() => {
                  cookies.remove("token");
                  window.location.href = "/";
                }}
              >
                Cerrar Sesion <DoNotDisturbOnIcon />
              </p>
            </div>
          ) : (
            <button
              style={{ cursor: "pointer" }}
              onClick={() => {
                setSituation("login");
                setError(false);
              }}
              className="login"
            >
              Ingresar o Crear Cuenta
            </button>
          )}
        </div>
      )}
      {situation === "login" && (
        <div className="menu-info">
          <h3>Login</h3>
          {error && <h5>Usuario o Contraseña incorrectos</h5>}
          <div className="auth-form">
            <TextField
              id="standard-basic"
              label="Email"
              variant="standard"
              type="email"
              onChange={(e) => setUsernameL(e.target.value)}
            />
            <TextField
              id="standard-basic"
              label="Contraseña"
              variant="standard"
              type={visibility ? "text" : "password"}
              onChange={(e) => setContraseñaL(e.target.value)}
            />
            {visibility && (
              <RemoveRedEyeIcon
                style={{ cursor: "pointer" }}
                onClick={() => setVisibility(!visibility)}
                className="eye"
              />
            )}
            {!visibility && (
              <VisibilityOffIcon
                style={{ cursor: "pointer" }}
                onClick={() => setVisibility(!visibility)}
                className="eye"
              />
            )}
            <Button
              style={{ marginTop: "20px", cursor: "pointer" }}
              color="success"
              variant="outlined"
              onClick={() => {
                axios
                  .post(process.env.REACT_APP_API + "/api/login", {
                    username: usernameL,
                    contraseña: contraseñaL,
                  })
                  .then((result) => {
                    if (result.data === "error") {
                      setError(true);
                    } else {
                      cookies.set("token", result.data, { path: "/" });
                      setSituation("menu");
                      setMenu(false);
                      setError(false);
                    }
                  })
                  .catch((error) => setError(true));
              }}
            >
              Iniciar Sesion
            </Button>
            <Button
              onClick={() => {
                setSituation("register");
                setError(false);
              }}
              style={{ marginTop: "20px", cursor: "pointer" }}
              variant="outlined"
            >
              Registrarme
            </Button>
            <Button
              onClick={() => {
                setSituation("menu");
                setError(false);
              }}
              style={{ marginTop: "20px", cursor: "pointer" }}
              variant="outlined"
            >
              Volver
            </Button>
          </div>
        </div>
      )}
      {situation === "register" && (
        <div className="menu-info">
          <h3>Registro</h3>
          {messages && <h5>{messages}</h5>}
          <div className="auth-form">
            <TextField
              id="standard-basic"
              label="Nombre Completo"
              variant="standard"
              onChange={(e) => setNombreR(e.target.value)}
            />
            <TextField
              id="standard-basic"
              label="Email"
              variant="standard"
              type="email"
              onChange={(e) => setUsernameR(e.target.value)}
            />
            <TextField
              id="standard-basic"
              label="Celular"
              variant="standard"
              type="number"
              onChange={(e) => setCelularR(e.target.value)}
            />
            <TextField
              id="standard-basic"
              label="Contraseña"
              variant="standard"
              type={visibility ? "text" : "password"}
              onChange={(e) => setContraseñaR(e.target.value)}
            />
            {visibility && (
              <RemoveRedEyeIcon
                style={{ top: "196px", cursor: "pointer" }}
                onClick={() => setVisibility(!visibility)}
                className="eye"
              />
            )}
            {!visibility && (
              <VisibilityOffIcon
                style={{ top: "196px", cursor: "pointer" }}
                onClick={() => setVisibility(!visibility)}
                className="eye"
              />
            )}
            <Button
              onClick={() => {
                if (
                  /^([\da-z_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.exec(
                    usernameR
                  )
                ) {
                  axios
                    .post(process.env.REACT_APP_API + "/api/create/user", {
                      nombre: nombreR,
                      username: usernameR,
                      celular: celularR,
                      contraseña: contraseñaR,
                    })
                    .then((result) => {
                      cookies.set("token", result.data, { path: "/" });
                      setSituation("menu");
                      setMenu(false);
                      setError(false);
                    })
                    .catch((error) => {
                      setMessages(error.response.data.message);
                      setTimeout(() => {
                        setMessages("");
                      }, 2000);
                    });
                } else {
                  setMessages("Email no valido");
                  setTimeout(() => {
                    setMessages("");
                  }, 2000);
                }
              }}
              style={{ marginTop: "20px", cursor: "pointer" }}
              color="success"
              variant="outlined"
            >
              Registrarme
            </Button>
            <Button
              onClick={() => {
                setSituation("login");
                setError(false);
              }}
              style={{ marginTop: "20px", cursor: "pointer" }}
              variant="outlined"
            >
              Iniciar sesion
            </Button>
            <Button
              onClick={() => {
                setSituation("menu");
                setError(false);
              }}
              style={{ marginTop: "20px", cursor: "pointer" }}
              variant="outlined"
            >
              Volver
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Menu;
