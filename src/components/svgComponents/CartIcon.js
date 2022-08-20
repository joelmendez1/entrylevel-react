import "./cartIcon.css";
import React from "react";
import Cart from "../Cart/Cart";
import Modal from "../Modal/Modal";
import Button from "../Button/Button";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { updateCostCurrency } from "../../utils/utils";
import { ReactComponent as CartSvg } from "../../assets/Vector.svg";
import { createCustomClass, medium, green, white } from "../Button/buttonUtils";

class CartIcon extends React.Component {
    constructor(props) {
        super(props);
        this.myRef = React.createRef();
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

    componentDidMount() {
        const checkIfClickedOutside = (e) => {
            if(this.myRef.current && !this.myRef.current.contains(e.target)) {
                this.setState({
                    showCartOverlay: false
                })
            }
        }

        document.addEventListener("click", checkIfClickedOutside);
    }

    render() {
        const { totalProducts, currentCurrency, purchasedProducts } = this.props;
        const { showCartOverlay } = this.state;
        const { totalWithTaxes } = updateCostCurrency(purchasedProducts, currentCurrency);

        return (
            <div className="container-cart" ref={this.myRef} onClick={() => this.handleOnClick(true)} >
                <CartSvg />
                {(totalProducts > 0) && <sup>{totalProducts}</sup>}
                <Modal open={showCartOverlay} onClose={() => this.handleOnClick(false)}>
                    <div className="cart_overlay">
                        <p><strong> My Bag </strong> {totalProducts} items</p>
                        <Cart onClick={(e) => e.stopPropagation()}/>
                        <div className="cart_total">
                            <p>Total: </p>
                            <p><strong>${totalWithTaxes}</strong></p>
                        </div>
                        <div className="cart_overlay-actions">
                            <Link to="/cart">
                                <Button customClassName={createCustomClass(medium, white)}>VIEW BAG</Button>
                            </Link>
                            <Button customClassName={createCustomClass(medium, green)}>CHECK OUT</Button>
                        </div>
                    </div>
                </Modal>
            </div>
        )
    }
}

const mapStateToProps = ({currencyPersistReducer, productPersistReducer }) => {
    return {
        totalProducts: productPersistReducer.totalProducts,
        currentCurrency: currencyPersistReducer.currentCurrency,
        purchasedProducts: productPersistReducer.purchasedProducts
    }
}

export default connect(mapStateToProps)(CartIcon)
