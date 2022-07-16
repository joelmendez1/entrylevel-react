import React from "react";
import { Product } from '../Product/Products';
import { checkSessionData } from '../../utils/sessionStorage';
import { getAll } from '../../queries/getHomeData';
class Clothes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            products: []
        }
    };

    componentDidMount() {
        {
            (JSON.parse(sessionStorage.getItem('all')) ? checkSessionData('all') : getAll())
                .then(res => {
                    const clothes = res.categories.filter(category => category.name === 'clothes');
                    this.setState({
                        products: clothes
                    })
                })
                .catch(error => {
                    console.error('An error has ocurred: ', error);
                })
        }
    }

    render() {
        const { products } = this.state;
        return (
            <div>
                {products.map(element => {
                    return element.products.map((product, index) => (
                        <Product key={index}
                        name={product.name}
                        img={product.gallery[0]}
                        stock={product.inStock}/>
                    ))
                })}
            </div>
        )
    };
}

export { Clothes }