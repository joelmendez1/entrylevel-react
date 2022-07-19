import React from "react";
import './cart.css'
import {ReactComponent as CartIcon} from '../../assets/Vector.svg'

class Cart extends React.Component {
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
                <CartIcon />
                {isEmpty && <sup> 3 </sup>}
            </div>
        )
    }
}

export { Cart }