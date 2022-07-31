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
        const { totalProducts, productsTotalCost } = this.props;

        return (
            (totalProducts > 0
                ?   <div className="cart_page">
                        <Cart />
                        <div className="cart_page-statistics">
                            <p>Tax 21%: </p><strong>{`$${(productsTotalCost + (productsTotalCost * 0.21)).toFixed(2)}`}</strong>
                            <p>Quantity: </p><strong>{totalProducts}</strong>
                            <p>Total: </p><strong>${productsTotalCost.toFixed(2)}</strong>
                        </div>
                        <Button customClassName={createCustomClass(medium, green)}>ORDER</Button>
                    </div>
                :   <h1>Aun no tienes items en tu carrito</h1>
            )
        )
    }
}

const mapStateToProps = ({ productPersistReducer }) => {
    return {
        totalProducts: productPersistReducer.totalProducts,
        productsTotalCost: productPersistReducer.productsTotalCost
    }
}

export default connect(mapStateToProps)(CartPage)