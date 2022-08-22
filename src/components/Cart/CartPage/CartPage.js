import React from "react";
import "./cartpage.css";
import Cart from "../Cart";
import { connect} from "react-redux";
import Button from "../../Button/Button";
import { createCustomClass, large, green } from "../../Button/buttonUtils";
import { updateCostCurrency } from "../../../utils/utils";

class CartPage extends React.Component {
    render() {
        const { totalProducts,  purchasedProducts, currentCurrency } = this.props;
        const { taxesCost, totalWithTaxes } = updateCostCurrency(purchasedProducts, currentCurrency);

        return (
            (totalProducts > 0
                ?   <div className="cart_page">
                        <h1 className="cart_page-title">CART</h1>
                        <Cart />
                        <div className="cart_page-statistics">
                            <div>
                                <p>Tax 21%: </p>
                                <p>Quantity: </p>
                                <p>Total: </p>
                            </div>
                            <div>
                                <p><strong>{`${currentCurrency.symbol} ${taxesCost}`}</strong></p>
                                <p><strong>{totalProducts}</strong></p>
                                <p><strong>{`${currentCurrency.symbol} ${totalWithTaxes}`}</strong></p>
                            </div>
                        </div>
                        <Button customClassName={createCustomClass(large, green)}>ORDER</Button>
                    </div>
                :   <h1>Aun no tienes items en tu carrito</h1>
            )
        )
    }
}

const mapStateToProps = ({ currencyPersistReducer, productPersistReducer }) => {
    return {
        totalProducts: productPersistReducer.totalProducts,
        currentCurrency: currencyPersistReducer.currentCurrency,
        purchasedProducts: productPersistReducer.purchasedProducts
    }
}

export default connect(mapStateToProps)(CartPage)