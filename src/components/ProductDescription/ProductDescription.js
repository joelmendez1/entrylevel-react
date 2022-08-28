import React from "react";
import "./productDescription.css";
import { connect } from "react-redux";
import Button from "../Button/Button";
import { createCustomClass, large, green } from "../Button/buttonUtils";
import { ADD_TO_CART } from "../../redux/products/productReducer";
import parse from "html-react-parser";
import { Select } from "../Select/Select";
import { Price } from "../Price/Price";
import getProduct from "../../queries/getAllData";
import { Loader } from "../Loader/Loader";

class ProductDescription extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedImg: "",
      selectedProduct: {},
      loading: true,
      selectedAttributes: {},
    };
    this.onChangeSelectedAttributes =
      this.onChangeSelectedAttributes.bind(this);
  }

  onChangeSelectedAttributes(selectedAttribute) {
    this.setState({
      selectedAttributes: selectedAttribute,
    });
  }

  componentDidMount() {
    const { currentCurrency } = this.props;
    const urlProduct = window.location.pathname.split("/")[2];

    getProduct(urlProduct)
      .then((res) => {
        const defaultAttributes = res.product.attributes
          .map((attribute) => {
            return {
              [attribute.id]: attribute.items[0].value,
            };
          })
          .reduce((acc, currentEl) => {
            return { ...acc, ...currentEl, currentCurrency };
          }, {});

        this.setState({
          selectedProduct: res.product,
          selectedAttributes: defaultAttributes,
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
    const { currentCurrency, currentBackground } = this.props;
    const { selectedProduct, selectedImg, loading, selectedAttributes } =
      this.state;
    const { name, gallery, brand, attributes, prices, inStock, description } =
      selectedProduct;

    return (
      <div>
        {!loading ? (
          <div
            className="product-description_container"
            style={{ background: currentBackground }}
          >
            <div className="product-description_images-section">
              {gallery.map((img, index) => (
                <img
                  onClick={() => this.setState({ selectedImg: img })}
                  key={index}
                  src={img}
                  alt={`img-${img}`}
                ></img>
              ))}
            </div>
            <div className="product-description_main-img">
              <img
                src={selectedImg ? selectedImg : gallery[0]}
                alt="main-img"
              />
            </div>
            <article className="product-description_description">
              <div className="product-description_text">
                <h1>{brand}</h1>
                <p>{name}</p>
              </div>
              <div className="product-description_attribute">
                {attributes.map((attribute, index) => (
                  <Select
                    key={`select-${attribute.id}-${index}`}
                    type={attribute.type}
                    attribute={attribute}
                    selectedProduct={selectedAttributes}
                    onChange={this.onChangeSelectedAttributes}
                  />
                ))}
              </div>
              <div className="product-description_price">
                <p>
                  <strong>PRICE:</strong>
                </p>
                <Price prices={prices} currentCurrency={currentCurrency} />
              </div>
              <Button
                customClassName={
                  inStock ? createCustomClass(large, green) : "disabled-button"
                }
                disabled={!inStock}
                action={ADD_TO_CART}
                productData={{
                  ...selectedProduct,
                  selectedAttributes: selectedAttributes,
                  count: 1,
                }}
              >
                {inStock ? "ADD TO CART" : "OUT OF STOCK"}
              </Button>
              <div className="product-description_info">
                {parse(description)}
              </div>
            </article>
          </div>
        ) : (
          <Loader />
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ currencyPersistReducer, backgroundReducer }) => {
  return {
    currentCurrency: currencyPersistReducer.currentCurrency,
    currentBackground: backgroundReducer.currentBackground,
  };
};

export default connect(mapStateToProps)(ProductDescription);

{
  /* <div
className="product-description_images-section"
style={{ background: currentBackground }}
>
{this.state.loading ? (
  <Loader />
) : (
  <div>
    {gallery.map((img, index) => (
      <img
        onClick={() => this.setState({ selectedImg: img })}
        key={index}
        src={img}
        alt={`img-${img}`}
      ></img>
    ))}
  </div>
)}
</div> */
}
