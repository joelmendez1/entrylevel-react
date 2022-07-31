import React from "react";
import './button.css'
import { connect } from 'react-redux';
import { setProduct } from '../../redux/products/productActions'

class Button extends React.Component {
    constructor(props) {
        super(props);
        this.getStyle = this.getStyle.bind(this);
        this.getSize = this.getSize.bind(this);
        this.getColor = this.getColor.bind(this);
    }

    render() {
        const { size = "medium", color = "green", disabled = false, action, productData,  setProduct } = this.props;

        return (
            <button style={this.getStyle(size, color)} disabled={disabled} onClick={() => setProduct(action , productData)}>
                {this.props.children || 'Default Button'}
            </button>
        )
    }

    getStyle = (size, color) => {
        let selectedSize = this.getSize(size);
        let selectedColor = this.getColor(color);

        return {
            ...selectedSize,
            ...selectedColor
        }
    }

    getSize = (size) => {
        size.toLowerCase();

        switch (size) {
            case "large":
                return {
                    'width': '15rem',
                    'height': '3rem',
                    'color': '#ffffff',
                    'fontSize': 'medium'
                };
            case "medium":
                return {
                    'width': '9rem',
                    'height': '2.5rem',
                    'fontSize': 'small'
                };
            case "small":
                return {
                    'width': '1.5rem',
                    'height': '1.5rem',
                    'fontSize': 'small'
                };
            default:
                return;
        }
    }

    getColor = (color) => {
        color.toLowerCase();

        switch (color) {
            case "green":
                return {
                    'background': '#5ECE7B',
                    'color': '#FFFFFF'
                };
            case "white":
                return {
                    'background': '#FFFFFF',
                    'color': '#000000',
                    'border': '1px solid #000000'
                    };
            case "gray":
                return {
                    'background': '#a2a6ab',
                    'color': '#000000'
                };
            default:
                return;
        }
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
