import React from "react";
import { useNavigate } from "react-router-dom";

function ProductItem({product}) {
  const navigate = useNavigate();
  return (
    <div
      style={{ cursor: "pointer" }}
      key={product.id}
      onClick={() => navigate(`/product/${product.id}`)}
      className="product"
    >
      <img style={{backgroundColor:"#cac3c3"}} src={product.img} />
      <div className="product-info">
        <p>{product.name}</p>
        <p>
          ${product.price} {product.offer && <del>{product.offer}</del>}
        </p>
      </div>
    </div>
  );
}

export default ProductItem;
