import React from "react";
import "./product.css";
import {ReactComponent as CircleIcon} from "../../assets/CircleIcon.svg";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Button from "../Button/Button";
import { ADD_TO_CART } from "../../redux/products/productReducer";

class Product extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showCircleIcon: false,
            selectedProducts: {}
        };
        this.showCircleIcon = this.showCircleIcon.bind(this);
    };

    showCircleIcon() {
        this.setState(prevState => ({
            showCircleIcon: !prevState.showCircleIcon
        }))
    }

    componentDidMount() {
        const defaultAttributes = this.props.attributes
            .map(attribute => {
                return {
                    [attribute.name]: attribute.items[0].value
                }
            })
            .reduce((acc, currentEl) => {
                return {...acc, ...currentEl}
            }, {})

        this.setState({
            selectedProducts: defaultAttributes
        })
    }

    render() {
        const { showCircleIcon, selectedProducts } = this.state;
        const { id, name, gallery, inStock, prices, currentCurrency } = this.props;

        return (
            <div
            className={`product_container ${inStock ? "available-stock" : "out-of-stock"}`}
            onMouseEnter = {this.showCircleIcon}
            onMouseLeave = {this.showCircleIcon}
            >
                <div className="product-add-view">
                    <Link to={`/product/${id}`}>
                        <img className={`product-${name}-stock-${inStock ? "onstock" : "offstock"}`} src={gallery[0]} alt={name} />
                    </Link>
                    {(showCircleIcon && inStock)
                            &&  <Button
                                 customClassName="circle-icon"
                                 disabled={!inStock}
                                 action={ADD_TO_CART}
                                 productData={{...this.props, selectedAttributes: selectedProducts, count: 1}}>
                                    <CircleIcon className="circle-icon" />
                                </Button>}
                </div>
                <ul className="text">
                    <p>{name}</p>
                    {prices.map((price, index) => {
                        if(price.currency.label === currentCurrency) {
                            return (
                                <p key={`price-${price.currency.label}-${index}`}><strong>${price.amount}</strong></p>
                            )
                        }
                    })}
                </ul>
            </div>
        )
    }
}

const mapStateToProps = ({ currencyPersistReducer }) => {
    return {
        currentCurrency: currencyPersistReducer.currentCurrency
    }
}

export default connect(mapStateToProps)(Product)