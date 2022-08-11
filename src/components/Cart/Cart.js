import React from "react";
import "./cart.css";
import Button from "../Button/Button";
import { createCustomClass, small, white } from "../Button/buttonUtils";
import { connect } from "react-redux";
import { setProduct } from "../../redux/products/productActions";
import { INCREMENT, DECREMENT } from "../../redux/products/productReducer";
import { Select } from "../Select/Select";

class Cart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedAttributes: {}
        }
        this.onChangeSelectedAttributes = this.onChangeSelectedAttributes.bind(this);
    }

    onChangeSelectedAttributes(selectedAttributes) {
        this.setState({
            selectedAttributes
        })
    }

    componentDidMount() {
        const { purchasedProducts } = this.props;
        const { selectedAttributes } = purchasedProducts;

        this.setState({
            selectedAttributes
        })
    }

    render() {
        const { purchasedProducts, currentCurrency } = this.props;
        const { selectedAttributes } = this.state;

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
                                        {product.attributes.map((attribute, index) => <Select key={`select-${attribute.value}-${index}`} type={attribute.type} attribute={attribute} selectedProducts={selectedAttributes} onChange={this.onChangeSelectedAttributes}/>)}
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

const mapStateToProps = ({ currencyPersistReducer, productPersistReducer } ) => {
    return {
        currentCurrency: currencyPersistReducer.currentCurrency,
        purchasedProducts: productPersistReducer.purchasedProducts
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setProduct: (action, product) => dispatch(setProduct(action, product))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)

