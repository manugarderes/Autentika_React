import React, { useEffect, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import axios from "axios";
import Lottie from "react-lottie";
import * as animationData from "../loader.json";
import { useNavigate } from "react-router-dom";
import ProductItem from "./ProductItem";

function Home() {
  const navigate = useNavigate();
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState();
  const [counter, setCounter] = useState();
  useEffect(() => {
    setLoading(true);
    axios.get(process.env.REACT_APP_API + "/api/products").then((result) => {
      setProducts(result.data);
      setLoading(false);
    });
    axios
      .get(`${process.env.REACT_APP_API}/api/order/selled/counter`)
      .then((result) => {
        setCounter(result.data + 10000);
      });
  }, []);
  return (
    <div>
      {loading ? (
        <Lottie
          style={{ marginTop: "12vh" }}
          options={defaultOptions}
          height={400}
          width={400}
        />
      ) : (
        <div>
          <div className="homeImg">
            <img
              style={{ backgroundColor: "#cac3c3" }}
              src="https://www.retroka.com/wp-content/uploads/2021/10/rk_S21_web_HS_2_Oct21.gif"
            />
          </div>
          <div className="counter">
            <h3 style={{textAlign:"center"}}>Los Números Hablan</h3>
            <div className="counterDiv">
              <h1>{counter && counter.toLocaleString().replace(",", ".")}</h1>
              <p>PRENDAS RECIRCULADAS</p>
            </div>
          </div>
          <div className="products">
            {products &&
              products.map((product) => (
                <ProductItem key={product.id} product={product} />
              ))}
          </div>
        </div>
      )}
      <div className="footer">
        <h3>AUTENTIKA</h3>
        <h5 style={{ textAlign: "center" }}>
          Programacion y diseño: <br /> Manuel Garderes
        </h5>
      </div>
    </div>
  );
}

export default Home;
