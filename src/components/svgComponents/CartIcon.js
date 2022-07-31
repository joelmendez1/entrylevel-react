import React from "react";
import './cartIcon.css';
import { ReactComponent as CartSvg } from '../../assets/Vector.svg';

class CartIcon extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isEmpty: true
        }
    }

    render() {
        const { isEmpty } = this.state;

        return(
            <div className="container-cart">
                <CartSvg />
                {isEmpty && <sup> 3 </sup>}
            </div>
        )
    }
}

export { CartIcon }