import React from "react";
import './cartIcon.css';
import { ReactComponent as CartSvg } from '../../assets/Vector.svg';
import { connect } from 'react-redux';

class CartIcon extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { totalProducts } = this.props;

        return(
            <div className="container-cart">
                <CartSvg />
                {(totalProducts > 0) && <sup>{totalProducts}</sup>}
            </div>
        )
    }
}

const mapStateToProps = ({productPersistReducer}) => {
    return {
        totalProducts: productPersistReducer.totalProducts
    }
}

export default connect(mapStateToProps)(CartIcon)
