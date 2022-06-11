import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Lottie from "react-lottie";
import * as animationData from "../loader.json";
import ProductItem from "./ProductItem";

function Shop({ info }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const [products, setProducts] = useState();
  const [type, setType] = useState();
  const [loading, setLoading] = useState(false);
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  useEffect(() => {
    setLoading(true);
    if (id > 0) {
      axios
        .get(`${process.env.REACT_APP_API}/api/products/${id}`)
        .then((result) => {
          setProducts(result.data);
          setLoading(false);
        });
      axios.get(process.env.REACT_APP_API + "/api/types").then((result) => {
        result.data.map((item) => {
          if (item.id == id) {
            setType(item);
          }
        });
      });
    } else {
      axios
        .get(`${process.env.REACT_APP_API}/api/products`)
        .then((result) => {
          setProducts(result.data);
          setLoading(false);
          setType({ name: "Todos los productos" });
        });
    }
  }, [id]);

  return (
    <div>
      <h1
        style={
          !info
            ? { marginTop: "13vh", textAlign: "center" }
            : { marginTop: "13vh", textAlign: "center", fontSize: "15px" }
        }
      >
        {info ? `resultados para busqueda : ${info}` : type && type.name}
      </h1>
      {info && (
        <p style={{ textAlign: "center" }}>
          {products &&
            products.filter((product) =>
              product.name.toLowerCase().includes(info.toLowerCase())
            ).length === 0 &&
            "Sin resultados"}
        </p>
      )}
      {loading ? (
        <Lottie
          style={{ marginTop: "12vh" }}
          options={defaultOptions}
          height={400}
          width={400}
        />
      ) : !info ? (
        <div className="products">
          {products &&
            products.map((product) => <ProductItem product={product} />)}
        </div>
      ) : (
        <div className="products">
          {products &&
            products
              .filter((product) =>
                product.name.toLowerCase().includes(info.toLowerCase())
              )
              .map((product) => <ProductItem product={product} />)}
        </div>
      )}
    </div>
  );
}

export default Shop;
