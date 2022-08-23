import React from "react";
import "./home.css";
import { get } from "../../queries/getHomeData";
import  Product  from "../Product/Product";
import { checkSessionData } from "../../utils/sessionStorage";
import { connect } from "react-redux";
import { Loader } from "../Loader/Loader";

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            loading: true
        }
    };

    componentDidMount() {
            (JSON.parse(sessionStorage.getItem("home")) ? checkSessionData("home") : get("home"))
            .then(res => {
                    this.setState({
                        products: res.categories,
                        loading: false
                    })
            })
            .catch(error => {
                console.error("An error has ocurred: ", error);
            })
    }

    render() {
        const { products, loading } = this.state;
        const { currentURL, currentBackground } = this.props;
        const categoryName = window.location.pathname.slice(1);

        return (
            <main className="home" style={{"background": currentBackground}}>
                {
                    !loading
                        ?  <div className="home-products-container">
                                <h1 className="home-title">{categoryName}</h1>
                                <section className="home-products">
                                    {products.map(element => {
                                        const categoryName = element.name !== "all" ? element.name : "home";
                                        if(categoryName === currentURL) {
                                            return element.products.map((product, index) => (
                                                <Product key={`product-${product.name}-${index}`} {...product}/>
                                            ))
                                        }
                                        return
                                        })}
                                </section>
                            </div>
                        :   <Loader />
                }
            </main>
        )
    };
}

const mapStateToProps = ({ navPersistReducer, backgroundReducer }) => {
    return {
        currentURL: navPersistReducer.currentURL,
        currentBackground: backgroundReducer.currentBackground
    }
}

export default connect(mapStateToProps)(Home)