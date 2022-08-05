import React from "react";
import "./productDescription.css";
import { connect } from "react-redux";
import  Button  from "../Button/Button";
import { createCustomClass, large, green, gray } from "../Button/buttonUtils";
import { ADD_TO_CART } from "../../redux/products/productReducer";
import parse from 'html-react-parser';

class ProductDescription extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedImg: ''
        }
    }

    render() {
        const { currentCurrency } = this.props;
        const { selectedImg } = this.state;
        const urlProduct = window.location.pathname.split("/")[2];
        const allProducts = JSON.parse(sessionStorage.getItem("home")).categories[0].products;
        const productData = {...allProducts.find((product) => product.id === urlProduct), currentCurrency};
        const { name, inStock, gallery, brand, attributes, prices, description } = productData;
        const buttonColor = inStock ? green : gray;

        if(!productData) {
            return "Error"
        }

        return (
            <div className="product-description_container">
                <div className="product-images-section">
                    {gallery.map((img, index) => (
                        <img onClick={() => this.setState({selectedImg: img})} key={index} src={img} alt={`img-${img}`}></img>
                    ))}
                </div>
                <div className="product-description_main-img">
                    <img src={ selectedImg ? selectedImg : gallery[0]} alt="main-img"/>
                </div>
                <article className="product-description_description">
                    <div className="product-description_text">
                        <h1>{brand}</h1>
                        <p>{name}</p>
                    </div >
                    <div className="product-description_price">
                        {prices.map(price => {
                            if(price.currency.label === currentCurrency) {
                                return <p><strong>{`${price.currency.symbol} ${price.amount}`}</strong></p>
                            }
                        })}
                    </div>
                    <form className="product-description_attribute">
                        {attributes.map(attribute => {
                            <label>{attribute.id}</label>
                            if(attribute.type === "swatch") {
                                return (
                                    attribute.items.map(item => (
                                        <input type="radio" value={item.displayValue} />
                                    ))
                                )   
                            } else {
                                return (
                                    <div>
                                        <label>{attribute.id}</label>
                                        {attribute.items.map(item => (
                                            <option>{item.value}</option>
                                        ))}
                                    </div>
                                )
                            }
                        })}
                    </form>
                    <Button
                    customClassName={createCustomClass(large, buttonColor)}
                    disabled={inStock ? false : true} action={ADD_TO_CART}
                    productData={{...productData, count: 1}}>
                        {inStock ? "ADD TO CART" : "OUT OF STOCK"}
                    </Button>
                    <p>{parse(description)}</p>
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
