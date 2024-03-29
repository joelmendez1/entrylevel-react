import React from "react";
import "./cart.css";
import Button from "../Button/Button";
import { createCustomClass, small, white } from "../Button/buttonUtils";
import { connect } from "react-redux";
import { INCREMENT, DECREMENT } from "../../redux/products/productReducer";
import { Select } from "../Select/Select";
import { Slider } from "../Slider/Slider";
import { Price } from "../Price/Price";
import { getPathname } from "../../utils/utils";

class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedProducts: {},
    };
    this.onChangeSelectedAttributes =
      this.onChangeSelectedAttributes.bind(this);
  }

  onChangeSelectedAttributes(selectedAttributes) {
    this.setState({
      selectedProducts: selectedAttributes,
    });
  }

  componentDidMount() {
    const { purchasedProducts } = this.props;
    const { selectedAttributes } = purchasedProducts;

    this.setState({
      selectedProducts: selectedAttributes,
    });
  }

  render() {
    const { purchasedProducts, currentCurrency, onClick } = this.props;

    return (
      <section className="cart_section" onClick={onClick}>
        {purchasedProducts &&
          purchasedProducts.map((product, index) => {
            if (product.count !== 0) {
              return (
                <div
                  key={`cart_products-${product.name}-${index}`}
                  className={`cart_products ${
                    getPathname("cart") && "cart_page"
                  }`}
                >
                  <div className="cart_products-description">
                    <h1>{product.brand}</h1>
                    <p>{product.name}</p>
                    <Price
                      prices={product.prices}
                      currentCurrency={currentCurrency}
                    />
                    <div>
                      {product.attributes.map((attribute, index) => (
                        <Select
                          key={`select-${attribute.value}-${index}`}
                          productId={product.id}
                          type={attribute.type}
                          attribute={attribute}
                          selectedProduct={product.selectedAttributes}
                          onChange={this.onChangeSelectedAttributes}
                        />
                      ))}
                    </div>
                  </div>
                  <section className="cart-products_actions-img">
                    <div className="cart_products-actions">
                      <Button
                        customClassName={createCustomClass(small, white)}
                        action={INCREMENT}
                        productData={product}
                      >
                        +
                      </Button>
                      {product.count}
                      <Button
                        customClassName={createCustomClass(small, white)}
                        action={DECREMENT}
                        productData={product}
                      >
                        -
                      </Button>
                    </div>
                    <Slider imageId={product.id} />
                  </section>
                </div>
              );
            }
          })}
      </section>
    );
  }
}

const mapStateToProps = ({ currencyPersistReducer, productPersistReducer }) => {
  return {
    currentCurrency: currencyPersistReducer.currentCurrency,
    purchasedProducts: productPersistReducer.purchasedProducts,
  };
};

export default connect(mapStateToProps)(Cart);
