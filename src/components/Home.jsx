import React, { useEffect, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import axios from "axios";
import Lottie from "react-lottie";
import * as animationData from "../loader.json";
import { useNavigate } from "react-router-dom";
import ProductItem from "./ProductItem";
import CountUp from "react-countup";

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
          <div className="infinite-body">
            <div class="slider-infinite">
              <div class="slide-track">
                <div class="slide">
                  <img
                    src="https://www.gabatt.com/media/images/envio-1.png"
                    height="100"
                    width="250"
                    alt=""
                  />
                </div>
                <div class="slide">
                  <img
                    src="https://www.nopcommerce.com/images/thumbs/0006813_mercadopago-checkout-latam-tecnofin.png"
                    height="100"
                    width="250"
                    alt=""
                  />
                </div>
                <div class="slide">
                  <img
                    src="http://mconsulting.com.ec/wp-content/uploads/2019/01/Tarjetas-de-Cr%C3%A9dito.jpg"
                    height="100"
                    width="250"
                    alt=""
                  />
                </div>
                <div class="slide">
                  <img
                    src="https://www.netflea.com/media/easycms/u/l/ulkkarikaupat_uusi_slider_1_.png"
                    height="100"
                    width="250"
                    alt=""
                  />
                </div>
                <div class="slide">
                  <img
                    src="https://www.gabatt.com/media/images/envio-1.png"
                    height="100"
                    width="250"
                    alt=""
                  />
                </div>
                <div class="slide">
                  <img
                    src="https://www.nopcommerce.com/images/thumbs/0006813_mercadopago-checkout-latam-tecnofin.png"
                    height="100"
                    width="250"
                    alt=""
                  />
                </div>
                <div class="slide">
                  <img
                    src="http://mconsulting.com.ec/wp-content/uploads/2019/01/Tarjetas-de-Cr%C3%A9dito.jpg"
                    height="100"
                    width="250"
                    alt=""
                  />
                </div>
                <div class="slide">
                  <img
                    src="https://www.netflea.com/media/easycms/u/l/ulkkarikaupat_uusi_slider_1_.png"
                    height="100"
                    width="250"
                    alt=""
                  />
                </div>
                <div class="slide">
                  <img
                    src="https://www.gabatt.com/media/images/envio-1.png"
                    height="100"
                    width="250"
                    alt=""
                  />
                </div>
                <div class="slide">
                  <img
                    src="https://www.nopcommerce.com/images/thumbs/0006813_mercadopago-checkout-latam-tecnofin.png"
                    height="100"
                    width="250"
                    alt=""
                  />
                </div>
                <div class="slide">
                  <img
                    src="http://mconsulting.com.ec/wp-content/uploads/2019/01/Tarjetas-de-Cr%C3%A9dito.jpg"
                    height="100"
                    width="250"
                    alt=""
                  />
                </div>
                <div class="slide">
                  <img
                    src="https://www.netflea.com/media/easycms/u/l/ulkkarikaupat_uusi_slider_1_.png"
                    height="100"
                    width="250"
                    alt=""
                  />
                </div>
                <div class="slide">
                  <img
                    src="https://www.gabatt.com/media/images/envio-1.png"
                    height="100"
                    width="250"
                    alt=""
                  />
                </div>
                <div class="slide">
                  <img
                    src="https://www.nopcommerce.com/images/thumbs/0006813_mercadopago-checkout-latam-tecnofin.png"
                    height="100"
                    width="250"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="counter">
            <div className="counterDiv">
              <h1>
                <CountUp end={10000} duration={10} />
              </h1>
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
