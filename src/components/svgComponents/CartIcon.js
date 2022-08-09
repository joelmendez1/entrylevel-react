import React from "react";
import  ReactDOM  from "react-dom";
import "./cartIcon.css";
import { ReactComponent as CartSvg } from "../../assets/Vector.svg";
import { connect } from "react-redux";
import CartOverlay from "../Cart/CartOverlay/CartOverlay";

class CartIcon extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showCartOverlay: false
        }
        this.handleOnClick = this.handleOnClick.bind(this);
    }

    handleOnClick() {
        this.setState((prevState) =>({
            showCartOverlay: !prevState.showCartOverlay
        }))
    }

    render() {
        const { totalProducts } = this.props;
        const { showCartOverlay } = this.state;

        return(
            <div className="container-cart" onClick={() => this.handleOnClick()} >
                <CartSvg />
                {(totalProducts > 0) && <sup>{totalProducts}</sup>}
                {showCartOverlay && ReactDOM.createPortal(<CartOverlay />, document.getElementById("portal"))}
            </div>
        )
    }
}

const mapStateToProps = ({ productPersistReducer }) => {
    return {
        totalProducts: productPersistReducer.totalProducts
    }
}

export default connect(mapStateToProps)(CartIcon)
