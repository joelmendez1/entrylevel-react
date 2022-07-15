import React from "react";
import './products.css'

class Product extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    };

    render() {
        const { name, img, stock } = this.props
        return (
            <div className="product-container">
                <img className={`product-${stock}`} src={img}/>
                <div className="text">
                    <h3>{name}</h3>
                    <p>$precio</p>
                </div>
            </div>
        )
    }
}

export { Product }