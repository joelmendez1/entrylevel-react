import React from "react";
import "./all.css";
import { createGetAllQuery } from "../../queries/getAllData";
import Product from "../Product/Product";
import { connect } from "react-redux";
import { Loader } from "../Loader/Loader";
import { getPathname } from "../../utils/utils";

class All extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      loading: true,
    };
  }

  componentDidMount() {
    createGetAllQuery(getPathname())
      .then((res) => {
        this.setState({
          products: res.products,
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

  componentDidUpdate(prevProps) {
    if (prevProps.currentURL !== this.props.currentURL) {
      createGetAllQuery(getPathname())
        .then((res) => {
          this.setState({
            products: res.products,
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
  }

  render() {
    const { products, loading } = this.state;
    const { currentBackground } = this.props;

    return (
      <main className="all" style={{ background: currentBackground }}>
        {!loading ? (
          <div className="all-products-container">
            <h1 className="all-title">{getPathname() || "WELCOME"}</h1>
            <section className="all-products">
              {products.map((product, index) => (
                <Product
                  key={`product-${product.name}-${index}`}
                  {...product}
                />
              ))}
            </section>
          </div>
        ) : (
          <Loader />
        )}
      </main>
    );
  }
}

const mapStateToProps = ({ navPersistReducer, backgroundReducer }) => {
  return {
    currentURL: navPersistReducer.currentURL,
    currentBackground: backgroundReducer.currentBackground,
  };
};

export default connect(mapStateToProps)(All);
