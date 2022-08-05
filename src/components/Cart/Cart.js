import React from "react";
import "./cart.css";
import Button from "../Button/Button";
import { createCustomClass, small, white } from "../Button/buttonUtils";
import { connect } from "react-redux";
import { setProduct } from "../../redux/products/productActions";
import { INCREMENT, DECREMENT } from "../../redux/products/productReducer";

class Cart extends React.Component {
    render() {
        const { purchasedProducts, currentCurrency } = this.props;

        return (
            <section className="cart_section">
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
                                    <Button customClassName={createCustomClass(small, white)} action={INCREMENT} productData={product}>+</Button>
                                    {product.count}
                                    <Button customClassName={createCustomClass(small, white)} action={DECREMENT} productData={product}>-</Button>
                                </div>
                            </div>
                        )
                    }
                })}
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

