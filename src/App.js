import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Product from "./components/Product";
import Nav from "./components/Nav";
import "./style.css";
import Cart from "./components/Cart";
import Form from "./components/Form";
import Soon from "./components/Soon";
import Shop from "./components/Shop";
import { BrowserRouter as Router, Link, useLocation } from "react-router-dom";
import Success from "./components/Success";
import Account from "./components/Account";
import Consignor from "./components/Consignor"
import Vende from "./components/Vende";

function App() {
  const [menu, setMenu] = useState(false);
  function useQuery() {
    const { search } = useLocation();

    return React.useMemo(() => new URLSearchParams(search), [search]);
  }
  let query = useQuery();
  return (
    <div>
      <Soon />
      <Nav setMenu={setMenu} menu={menu} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/shop/:id" element={<Shop />} />
        <Route path="/search" element={<Shop info={query.get("info")} />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/form" element={<Form setMenu={setMenu} menu={menu} />} />
        <Route path="/success" element={<Success />} />
        <Route path="/account" element={<Account />} />
        <Route path="/consignor" element={<Consignor />} />
        <Route path="/vende" element={<Vende />} />

        <Route
          path="*"
          element={
            <main style={{ padding: "1rem", marginTop:"13vh", textAlign:"center" }}>
              <h1>There's nothing here!</h1>
              <p>404</p>
            </main>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
