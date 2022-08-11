import React from "react";
import "./productDescription.css";
import { connect } from "react-redux";
import  Button  from "../Button/Button";
import { createCustomClass, large, green, gray } from "../Button/buttonUtils";
import { ADD_TO_CART } from "../../redux/products/productReducer";
import parse from "html-react-parser";
import { Select } from "../Select/Select";

class ProductDescription extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedImg: "",
            selectedProducts: {}
        }
        this.onChangeSelectedAttributes = this.onChangeSelectedAttributes.bind(this);
    }

    onChangeSelectedAttributes(selectedAttribute) {
        this.setState({
            selectedProducts: selectedAttribute
        })
    }

    componentDidMount() {
        const { currentCurrency } = this.props;
        const urlProduct = window.location.pathname.split("/")[2];
        const allProducts = JSON.parse(sessionStorage.getItem("home")).categories[0].products;
        const productData = {...allProducts.find((product) => product.id === urlProduct), currentCurrency};

        const defaultAttributes = productData.attributes
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
        const { currentCurrency } = this.props;
        const { selectedImg, selectedProducts } = this.state;
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
                    <div className="product-description_attribute">
                        {attributes.map(attribute => <Select type={attribute.type} attribute={attribute} selectedProducts={selectedProducts} onChange={this.onChangeSelectedAttributes} />)}
                    </div>
                    <Button
                    customClassName = {createCustomClass(large, buttonColor)}
                    disabled = {inStock ? false : true} action={ADD_TO_CART}
                    productData = {Object.entries(selectedProducts).length > 0 ? {...productData, selectedAttributes: selectedProducts, count: 1} : null}>
                        {inStock ? "ADD TO CART" : "OUT OF STOCK"}
                    </Button>
                    {parse(description)}
                </article>
            </div>
        )
    }
}

const mapStateToProps = ({ currencyPersistReducer }) => {
    return {
        currentCurrency: currencyPersistReducer.currentCurrency
    }
}

export default connect(mapStateToProps)(ProductDescription)
