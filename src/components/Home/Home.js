import React from "react";
import './home.css'
import { getProducts } from '../../queries/getHomeData';
import { Product } from '../Product/Products'
import { checkSessionData } from '../../utils/sessionStorage'

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            products: []
        }
    }

    componentDidMount() {
        {
            (JSON.parse(sessionStorage.getItem('products')) ? checkSessionData('products') : getProducts())
                .then(res => {
                    this.setState({
                        products: res.categories
                    });
                })
                .catch(error => {
                    console.error('An error has ocurred: ', error);
                })
        }
    }

    render() {
        const { products } = this.state;
        return (
            <main>
                <section>
                    {products.map(element => {
                            return element.products.map((product, index) => (
                                <Product key={index} 
                                name={product.name} 
                                img={product.gallery[0]}
                                stock={product.inStock}/>
                            ))
                        })}
                </section>
            </main>
        )
    };
}

export { Home }