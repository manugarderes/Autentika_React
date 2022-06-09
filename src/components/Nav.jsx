import React, { useState } from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import Badge from "@mui/material/Badge";
import CloseIcon from "@mui/icons-material/Close";
import Menu from "./Menu";
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import Logo from "../logo.png";

function Nav({setMenu, menu}) {
  const navigate = useNavigate();
  const cookies = new Cookies();
  return (
    <div>
      <nav>
        {
          menu 
          ? 
          <CloseIcon style={{cursor:"pointer"}} onClick={() => setMenu(!menu)}/> 
          :
          <MenuIcon style={{cursor:"pointer"}} onClick={() => setMenu(!menu)} />
        }
        <h1
          style={{ height: "10vh",cursor:"pointer" }}
          className="complete-center"
          onClick={() => {
            navigate("/")
            setMenu(false);
          }}
        >
          <img
            style={{ height: "10vh" }}
            src={Logo}
            alt=""
          />
        </h1>
        {cookies.get("cart") ? (
          <Badge badgeContent={cookies.get("cart").length} color="success">
            <ShoppingCartIcon style={{cursor:"pointer"}} onClick={() => navigate("/cart")} />
          </Badge>
        ) : (
          <ShoppingBagIcon style={{ color: "black" }} />
        )}
        <Menu menu={menu} setMenu={setMenu}/>
      </nav>
    </div>
  );
}

export default Nav;
