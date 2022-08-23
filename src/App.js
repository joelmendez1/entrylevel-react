import React from "react";
import "./app.css";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import  All  from "./components/All/All";
import Nav from "./components/Nav/Nav";
import ProductDescription  from "./components/ProductDescription/ProductDescription";
import CartPage from "./components/Cart/CartPage/CartPage";

class App extends React.Component {
  render() {
    return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<All to="/all" />} />
        <Route path="/all" element={<All to="/"/>}></Route>
        <Route path="/clothes" element={<All />}></Route>
        <Route path="/tech" element={<All />}></Route>
        <Route path="/product/:product" element={<ProductDescription />}></Route>
        <Route path="/cart" element={<CartPage />}></Route>
        <Route
            path="*"
            element={
              <div>
                <h2>404 Page not found</h2>
              </div>
            }
          />
      </Routes>
    </BrowserRouter>
    )
  }
}

export { App }