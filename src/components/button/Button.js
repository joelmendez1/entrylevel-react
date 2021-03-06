import React from "react";
import "./button.css";
import { createCustomClass, large, green } from "./buttonUtils";
import { connect } from "react-redux";
import { setProduct } from "../../redux/products/productActions";

class Button extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { customClassName, disabled = false, action, productData,  setProduct } = this.props;

        return (
            <button className={customClassName ? customClassName : createCustomClass(large, green)} disabled={disabled} onClick={() => setProduct(action , productData)}>
                {this.props.children || "Default Button"}
            </button>
        )
    }
}

const mapStateToProps = (state) => {
    const { productPersistReducer } = state;

    return {
        purchasedProducts: productPersistReducer.purchasedProducts
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setProduct:(action, product) => dispatch(setProduct(action, product))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Button)
