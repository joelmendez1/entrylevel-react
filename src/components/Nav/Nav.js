import React from "react";
import './nav.css'
import { Link } from 'react-router-dom';
import { getCategoriesName } from '../../queries/getHomeData';

class Nav extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: []
        }
    }

    componentDidMount() {
        getCategoriesName()
            .then((res) => {
                this.setState({
                    categories: res.categories
                })
            })
    }

    render() {
        const { categories } = this.state;

        return (
            <nav>
                <ul>
                    {categories.map((category, index) => {
                        const categoryName = category.name !== 'all' ? category.name : 'home';
                        return (
                            <li key={index}>
                                <Link to={categoryName}>{categoryName}</Link>
                            </li>
                        )                        
                    })}
                </ul>
            </nav>
        )
    }
}

export { Nav }