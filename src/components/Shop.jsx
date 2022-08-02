import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Lottie from "react-lottie";
import * as animationData from "../loader.json";
import ProductItem from "./ProductItem";

function Shop({ info }) {
  const navigate = useNavigate();
  const [sizeSelected, setSizeSelected] = useState();
  const [sizes, setSizes] = useState();
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
          let preSizes = [];
          result.data.map((product) => {
            if (!preSizes.find((item) => item === product.size)) {
              preSizes.push(product.size);
            }
          });
          setSizes(preSizes);
          setSizeSelected(preSizes);
        });
      axios.get(process.env.REACT_APP_API + "/api/types").then((result) => {
        result.data.map((item) => {
          if (item.id == id) {
            setType(item);
          }
        });
      });
    } else {
      axios.get(`${process.env.REACT_APP_API}/api/products`).then((result) => {
        setProducts(result.data);
        setLoading(false);
        setType({ name: "TODOS LOS PRODUCTOS" });
        let preSizes = [];
        result.data.map((product) => {
          if (!preSizes.find((item) => item === product.size)) {
            preSizes.push(product.size);
          }
        });
        setSizes(preSizes);
        setSizeSelected(preSizes);
      });
    }
  }, [id]);

  return (
    <div>
      <div className="shopFilter">
        <h1
          style={
            !info
              ? {textAlign: "center" }
              : {textAlign: "center", fontSize: "15px" }
          }
        >
          {info ? `resultados para busqueda : ${info}` : type && type.name.toUpperCase()}
        </h1>
        {!info && (
          <select
          className="filter"
            onChange={(e) => {
              if (e.target.value === "ALL") {
                setSizeSelected(sizes);
              } else {
                setSizeSelected([e.target.value]);
              }
            }}
          >
            <option selected disabled>
              Filtrar por talle
            </option>
            <option value="ALL">Limpiar Filtros</option>
            {sizes && sizes.map((size) => <option value={size}>Talle: {size}</option>)}
          </select>
        )}
      </div>

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
            products.map((product) => {
              if (sizeSelected.includes(product.size)) {
                return <ProductItem product={product} />;
              }
            })}
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
