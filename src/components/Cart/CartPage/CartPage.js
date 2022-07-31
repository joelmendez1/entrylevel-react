import React from "react";
import Cart from "../Cart";
import { connect} from "react-redux";
import Button from "../../button/Button";
import { createCustomClass, medium, green } from "../../button/buttonUtils";

class CartPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { purchasedProducts, currentCurrency } = this.props;
        let total = 0;
        let productQuantity = 0;

        purchasedProducts.forEach(product => {
            productQuantity += product.count;
            product.prices.forEach(price => {
                if(currentCurrency === price.currency.label) {
                    total += price.amount * product.count;
                }
            })
        })

        return (
            (productQuantity > 0 
                ?   <div className="cart_page">
                        <Cart />
                        <div className="cart_page-statistics">
                            <p>Tax 21%: </p><strong>{`$${(total + (total * 0.21)).toFixed(2)}`}</strong>
                            <p>Quantity: </p><strong>{productQuantity}</strong>
                            <p>Total: </p><strong>${total.toFixed(2)}</strong>
                        </div>
                        <Button customClassName={createCustomClass(medium, green)}>ORDER</Button>
                    </div>
                :   <h1>Aun no tienes items en tu carrito</h1>
            )
        )
    }
}

const mapStateToProps = ({currencyPersistReducer, productPersistReducer}) => {
    return {
        currentCurrency: currencyPersistReducer.currentCurrency,
        purchasedProducts: productPersistReducer.purchasedProducts
    }
}

export default connect(mapStateToProps)(CartPage)