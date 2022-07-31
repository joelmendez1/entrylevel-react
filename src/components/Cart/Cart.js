import React from "react";
import './cart.css';
import Button from "../button/Button";
import { connect } from "react-redux";
import { setProduct } from '../../redux/products/productActions';

class Cart extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { purchasedProducts, currentCurrency } = this.props;
        let total = 0;
        let productQuantity = 0;

        purchasedProducts.forEach(product => {
            productQuantity += product.count;
            product.prices.forEach(price => {
                if(currentCurrency === price.currency.label) {
                    total += price.amount * product.count;
                }
            })
        })

        return(
            <section>
                <h1>CART</h1>
                { purchasedProducts && purchasedProducts.map(product => {
                    if(product.count !== 0) {
                        return (
                            <div key={product.id} className="cart_products">
                                <div className="cart_products-description">
                                    <h1>{product.brand}</h1>
                                    <p>{product.name}</p>
                                    {product.prices.map((price, index) => {
                                        if(price.currency.label === currentCurrency) {
                                            return <p key={`${product.id}-price-${index}`}><strong>{price.currency.symbol}{price.amount}</strong></p>
                                        }
                                    })}
                                    <div>
                                        {product.attributes.map((attribute, index) =>{
                                            return (
                                                <div key={`${product.id}-attribute-${index}`}>
                                                    <h2>{attribute.name}</h2>
                                                    {attribute.items.map((item, index) => (
                                                        <span key={`${product.id}-attribute-item-${index}`}>{item.displayValue}</span>
                                                    ))}
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                                <div className="cart_products-actions">
                                    <Button size="small" color="white" action="increment" productData={product}>+</Button>
                                    {product.count}
                                    <Button size="small" color="white" action="decrement" productData={product}>-</Button>
                                </div>
                            </div>
                        )
                    }
                })}
                <div>
                    <p>Tax 21%: </p><strong>{`$${(total + (total * 0.21)).toFixed(2)}`}</strong>
                    <p>Quantity: </p><strong>{productQuantity}</strong>
                    <p>Total: </p><strong>${total.toFixed(2)}</strong>
                </div>
            </section>
        )
    }
}

const mapStateToProps = (state) => {
    const { currencyPersistReducer, productPersistReducer } = state;

    return {
        currentCurrency: currencyPersistReducer.currentCurrency,
        purchasedProducts: productPersistReducer.purchasedProducts
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setProduct:(action, product) => dispatch(setProduct(action, product))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)

