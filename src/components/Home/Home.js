import React from "react";
import './home.css';
import { get } from '../../queries/getHomeData';
import { Product } from '../Product/Products';
import { checkSessionData } from '../../utils/sessionStorage';
import { connect } from 'react-redux';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            products: []
        }
    };

    componentDidMount() {
            (JSON.parse(sessionStorage.getItem('home')) ? checkSessionData('home') : get('home'))
            .then(res => {
                    this.setState({
                        products: res.categories
                    })
            })
            .catch(error => {
                console.error('An error has ocurred: ', error);
            })
    }

    render() {
        const { products } = this.state;
        const { currentURL } = this.props
        return (
            <main>
                 <div className="category">
                        CATEGORY NAME
                </div>
                <section>
                    {
                        products.map(element => {
                            const categoryName = element.name !== 'all' ? element.name : 'home';
                            if(categoryName === currentURL) {
                                return element.products.map((product, index) => (
                                    <Product
                                    key={index}
                                    name={product.name}
                                    img={product.gallery[0]}
                                    stock={product.inStock}/>
                                ))
                            }
                            return
                        })
                    }
                </section>
            </main>
        )
    };
}

const mapStateToProps = (state) => {
    const { navPersistReducer } = state
    return {
        currentURL: navPersistReducer.currentURL
    }
}

export default connect(mapStateToProps)(Home)