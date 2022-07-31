import React from "react";
import "./cartoverlay.css"
import Cart from "../Cart";
import Button from "../../button/Button";
import { createCustomClass, medium, green, white } from "../../button/buttonUtils";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';

class CartOverlay extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { currentCurrency, purchasedProducts } = this.props;
        let total = 0;

        purchasedProducts.forEach(product => {
            product.prices.forEach(price => {
                if(currentCurrency === price.currency.label) {
                    total += price.amount * product.count;
                }
            })
        })

        return (
            <div className="cart_overlay">
                <Cart />
                <p>Total: </p><span><strong>${total}</strong></span>
                <div className="cart_overlay-actions">
                    <Link to="/cart"><Button customClassName={createCustomClass(medium, white)}>VIEW BAG</Button></Link>
                    <Button customClassName={createCustomClass(medium, green)}>CHECK OUT</Button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({currencyPersistReducer, productPersistReducer}) => {
    return {
        currentCurrency: currencyPersistReducer.currentCurrency,
        purchasedProducts: productPersistReducer.purchasedProducts
    }
}

export default connect(mapStateToProps)(CartOverlay)