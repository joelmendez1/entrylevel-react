import React from "react";
import './home.css';
import { get } from '../../queries/getHomeData';
import { Product } from '../Product/Products';
import { checkSessionData } from '../../utils/sessionStorage';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            products: []
        }
    };

    componentDidMount() {
        (JSON.parse(sessionStorage.getItem('all')) ? checkSessionData('all') : get('all'))
            .then(res => {
                console.log(res)
                this.setState({
                    products: res.categories
                });
            })
            .catch(error => {
                console.error('An error has ocurred: ', error);
            })
    }

    render() {
        const { products } = this.state;
        return (
            <main>
                 <div className="category">
                        CATEGORY NAME
                </div>
                <section>
                    {products.map(element => {
                        return element.products.map((product, index) => (
                            <Product
                            key={index}
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