import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import axios from "axios";
import Cookies from "universal-cookie";
import Lottie from "react-lottie";
import * as animationData from "../loader.json";
import { useNavigate } from "react-router-dom";

function Product() {
  const navigate = useNavigate();
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const [added, setAdded] = useState(false);
  const { id } = useParams();
  const [error, setError] = useState(false);
  const cookies = new Cookies();
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState("");
  const [links, setLinks] = useState();
  const [product, setProduct] = useState();
  const [images, setImages] = useState();
  const [products, setProducts] = useState();
  const [exist, setExist] = useState(false);
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${process.env.REACT_APP_API}/api/product/${id}`)
      .then((result) => {
        setProduct(result.data);
        if (
          cookies.get("cart") && cookies.get("cart").find((item) => item.name === result.data.name)
        ) {
          setExist(true);
        }
      });
    axios
      .get(`${process.env.REACT_APP_API}/api/images/${id}`)
      .then((result) => {
        setImages(result.data);
      });
    axios.get(`${process.env.REACT_APP_API}/api/products`).then((result) => {
      setProducts(result.data);
      setLoading(false);
    });
  }, [id]);
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
        <div className="hugeProductBox">
          {product && images && images.length > 0 && (
            <div className="carrousel-box">
              <Carousel>
                <div>
                  <img src={product.img} />
                </div>
                {images.map((image) => (
                  <div key={image.id}>
                    <img src={image.img} />
                  </div>
                ))}
              </Carousel>
            </div>
          )}
          {product && images && images.length === 0 && (
            <div className="carrousel-box">
              <Carousel>
                <div>
                  <img src={product.img} />
                </div>
              </Carousel>
            </div>
          )}
          {product && (
            <div className="productTool">
              <div>
              <h1>{product.name}</h1>
              <h3>${product.price} {
                      product.offer && <del>{product.offer}</del>
              }</h3>
              <h3>Talle : {product.size}</h3>
              </div>
              <div>
                {exist ? (
                  <button
                    disabled
                    style={{ backgroundColor: "grey", border: "1px solid grey" }}
                  >
                    Ya se encuentra en tu carrito
                  </button>
                ) : (
                  <button
                    disabled={added}
                    style={
                      added
                        ? { backgroundColor: "green", border: "1px solid grey" }
                        : {cursor:"pointer"}
                    }
                    onClick={() => {
                      if (cookies.get("cart")) {
                        cookies.set(
                          "cart",
                          [ 
                            ...cookies.get("cart"),
                            {
                              id: Math.random(),
                              name: product.name,
                              price: product.price,
                              img: product.img,
                              size: product.size,
                            },
                          ],
                          { path: "/" }
                        );
                      } else {
                        cookies.set(
                          "cart",
                          [
                            {
                              id: Math.random(),
                              name: product.name,
                              price: product.price,
                              img: product.img,
                              size: product.size,
                            },
                          ],
                          { path: "/" }
                        );
                      }
                      setAdded(true);
                      setSelected();
                      setTimeout(() => {
                        navigate(`/product/${product.id}`);
                      }, 1000);
                    }}
                  >
                    {added ? "Ya se encuentra en tu carrito" : "Agregar al carrito"}
                  </button>
                )}
              </div>
              {links && links.length === 0 && <p>Out Of Stock</p>}
            </div>
          )}
        </div>
      )}
      <div className="products">
        {products &&
          product &&
          products
            .filter(
              (item) => item.type === product.type && item.id !== product.id
            )
            .map((product) => (
              <div
                key={product.id}
                style={{cursor:"pointer"}}
                onClick={() => navigate(`/product/${product.id}`)}
                className="product"
              >
                <img src={product.img} />
                <div className="product-info">
                  <p>{product.name}</p>
                  <p>${product.price}</p>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
}

export default Product;
