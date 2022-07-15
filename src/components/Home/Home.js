import React from "react";
import './home.css'
import { getProducts } from '../../queries/getHomeData';
import { Product } from '../Product/Products'

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: [],
            products: [],
        }
    }

    async componentDidMount() {
        await getProducts()
            .then(res => {
                this.setState({
                    products: res.categories
                })
            })
    }

    render() {
        const { categories, products } = this.state;
        console.log(products)
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