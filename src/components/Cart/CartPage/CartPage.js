import React from "react";
import "./cartpage.css";
import Cart from "../Cart";
import { connect } from "react-redux";
import Button from "../../Button/Button";
import { createCustomClass, large, green } from "../../Button/buttonUtils";
import { updateCostCurrency } from "../../../utils/utils";
import { setProduct } from "../../../redux/products/productActions";
import { BUY } from "../../../redux/products/productReducer";

class CartPage extends React.Component {
  render() {
    const { totalProducts } = this.props;
    const isBought = true;

    return (
      <div className="cart_page">
        <h1 className="cart_page-title">CART</h1>
        {totalProducts > 0 ? (
          this.renderPurchasedProducts()
        ) : isBought ? (
          <h1 className="cart_page-alternative-title">
            Thanks for your purchasing!
          </h1>
        ) : (
          <h1 className="cart_page-alternative-title">
            Your cart is empty, go back to do some shopping!
          </h1>
        )}
      </div>
    );
  }

  renderPurchasedProducts() {
    const { totalProducts, purchasedProducts, currentCurrency } = this.props;

    const { taxesCost, totalWithTaxes } = updateCostCurrency(
      purchasedProducts,
      currentCurrency
    );

    return (
      <div>
        <Cart />
        <div className="cart_page-statistics">
          <div>
            <p>Tax 21%: </p>
            <p>Quantity: </p>
            <p>Total: </p>
          </div>
          <div>
            <p>
              <strong>{`${currentCurrency.symbol} ${taxesCost}`}</strong>
            </p>
            <p>
              <strong>{totalProducts}</strong>
            </p>
            <p>
              <strong>{`${currentCurrency.symbol} ${totalWithTaxes}`}</strong>
            </p>
          </div>
        </div>
        <Button
          action={BUY}
          productData={[]}
          customClassName={createCustomClass(large, green)}
        >
          ORDER
        </Button>
      </div>
    );
  }
}

const mapStateToProps = ({ currencyPersistReducer, productPersistReducer }) => {
  return {
    totalProducts: productPersistReducer.totalProducts,
    currentCurrency: currencyPersistReducer.currentCurrency,
    purchasedProducts: productPersistReducer.purchasedProducts,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setProduct: (action, product) => dispatch(setProduct(action, product)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CartPage);
