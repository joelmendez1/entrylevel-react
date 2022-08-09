import React from "react";
import "./cartoverlay.css";
import Cart from "../Cart";
import Button from "../../Button/Button";
import { createCustomClass, medium, green, white } from "../../Button/buttonUtils";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { updateCostCurrency } from "../../../utils/utils";

class CartOverlay extends React.Component {
    render() {
        const { currentCurrency, purchasedProducts, totalProducts } = this.props;
        const { totalWithTaxes } = updateCostCurrency(purchasedProducts, currentCurrency);

        return (
            <div className="cart_overlay" onClick={(e) => e.stopPropagation()}>
                <p>My Bag {totalProducts} items</p>
                <Cart />
                <p>Total: </p><span><strong>${totalWithTaxes}</strong></span>
                <div className="cart_overlay-actions">
                    <Link to="/cart">
                        <Button customClassName={createCustomClass(medium, white)}>VIEW BAG</Button>
                    </Link>
                    <Button customClassName={createCustomClass(medium, green)}>CHECK OUT</Button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({currencyPersistReducer, productPersistReducer}) => {
    return {
        totalProducts: productPersistReducer.totalProducts,
        currentCurrency: currencyPersistReducer.currentCurrency,
        purchasedProducts: productPersistReducer.purchasedProducts
    }
}

export default connect(mapStateToProps)(CartOverlay)