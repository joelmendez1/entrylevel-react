import React from "react";
import "./productDescription.css";
import { connect } from "react-redux";
import  Button  from "../button/Button";
import { createCustomClass, large, green } from "../button/buttonUtils";
import { ADD_TO_CART } from "../../redux/products/productReducer";

class ProductDescription extends React.Component {
    render() {
        const { currentCurrency } = this.props;
        const urlProduct = window.location.pathname.split("/")[2];
        const allProducts = JSON.parse(sessionStorage.getItem("home")).categories[0].products;
        const productData = {...allProducts.find((product) => product.id === urlProduct), currentCurrency};
        const { name, inStock, gallery, brand, attributes, prices, description } = productData;

        if(!productData) {
            return "Error"
        }

        return (
            <div className="product-description_container">
                <div className="product-images-section">
                    {gallery.map((img, index) => (
                        <img key={index} src={img} alt={`img-${img}`}></img>
                    ))}
                </div>
                <div className="product-description_main-img">
                    <img src={gallery[0]} alt="main-img"/>
                </div>
                <article className="product-description_description">
                    <div className="product-description_text">
                        <h1>{brand}</h1>
                        <p>{name}</p>
                    </div >
                    <div className="product-description_attribute">
                        {attributes.map(attribute => (
                            <div key={attribute.id} className="product-description_">
                                <h2>{attribute.name}</h2>
                                <div>
                                    {attribute.items.map(item => (
                                        <p key={item.id}>{item.displayValue}</p>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="product-description_price">
                        <h2>Price:</h2>
                        {`${prices.map(price => {
                            if(price.currency.label === currentCurrency) {
                                return `${price.currency.symbol} ${price.amount}`
                            }
                        })}`}
                    </div>
                    <Button customClassName={createCustomClass(large, green)} disabled={inStock ? false : true} action={ADD_TO_CART} productData={{...productData, count: 1}}>ADD TO CART</Button>
                    <p>{description}</p>
                </article>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const { currencyPersistReducer } = state;
    return {
        currentCurrency: currencyPersistReducer.currentCurrency
    }
}

export default connect(mapStateToProps)(ProductDescription)
