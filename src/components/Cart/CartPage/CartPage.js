import React from "react";
import "./cartpage.css";
import Cart from "../Cart";
import { connect } from "react-redux";
import Button from "../../Button/Button";
import { createCustomClass, large, green } from "../../Button/buttonUtils";
import { updateCostCurrency } from "../../../utils/utils";
import { setProduct, resetCart } from "../../../redux/products/productActions";
import { BUY } from "../../../redux/products/productReducer";

class CartPage extends React.Component {
  handleBuy() {
    const { resetCart } = this.props;

    setTimeout(function () {
      window.location.replace("/all");
      resetCart();
    }, 3000);
  }
  render() {
    const { totalProducts, order } = this.props;

    return (
      <div className="cart-page">
        <h1 className="cart-page_title">CART</h1>
        {totalProducts > 0 ? (
          this.renderPurchasedProducts()
        ) : order ? (
          <div className="cart-page_alternative-title">
            <h1>Thanks for your purchasing!</h1>
            <span>You'll be redirected in 3 seconds</span>
          </div>
        ) : (
          <h1 className="cart-page_alternative-title">
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
      <div className="cart-page_container">
        <Cart />
        <div className="cart-page_statistics">
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
          customClassName={createCustomClass(large, green)}
          onClick={this.handleBuy.bind(this)}
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
    order: productPersistReducer.order,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setProduct: (action, product) => dispatch(setProduct(action, product)),
    resetCart: () => dispatch(resetCart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CartPage);
