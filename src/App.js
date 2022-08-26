import React from "react";
import "./app.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import All from "./components/All/All";
import Nav from "./components/Nav/Nav";
import ProductDescription from "./components/ProductDescription/ProductDescription";
import CartPage from "./components/Cart/CartPage/CartPage";
import { checkSessionData } from "./utils/sessionStorage";
import { getCategoriesName } from "./queries/getCategoriesName";
import { Loader } from "./components/Loader/Loader";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      loading: true,
    };
  }

  componentDidMount() {
    (JSON.parse(sessionStorage.getItem("categories"))
      ? checkSessionData("categories")
      : getCategoriesName("categories")
    )
      .then((res) => {
        this.setState({
          categories: res.categories,
        });
      })
      .catch((error) => {
        console.error("An error has ocurred: ", error);
      })
      .finally(() => {
        this.setState({
          loading: false,
        });
      });
  }

  render() {
    const { categories, loading } = this.state;

    return (
      <BrowserRouter>
        <Nav />
        {!loading ? (
          <Routes>
            {categories.map((category) => (
              <Route
                key={`route-${category.name}`}
                path={`/${category.name}`}
                element={<All />}
              ></Route>
            ))}
            <Route path="/" element={<All />}></Route>
            <Route
              path="/product/:product"
              element={<ProductDescription />}
            ></Route>
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
        ) : (
          <Loader />
        )}
      </BrowserRouter>
    );
  }
}

export { App };
