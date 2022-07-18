import React from "react";
import './nav.css';
import { Link } from 'react-router-dom';
import { getCategoriesName } from '../../queries/getHomeData';
import { checkSessionData } from '../../utils/sessionStorage'

class Nav extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: []
        }

        this.selectedItem = this.selectedItem.bind(this);
    };

    selectedItem = (e, categoryName) => {
        const allItems = e.target.parentNode.parentNode.childNodes;

        allItems.forEach(li => {
            if(li.textContent !== categoryName) {
                li.classList.remove('hovered')
            } else {
                li.classList.add('hovered')
            }
        })
    }

    componentDidMount() {
        {
            (JSON.parse(sessionStorage.getItem('name')) ? checkSessionData('name') : getCategoriesName())
                .then(res => {
                    this.setState({
                        categories: res.categories
                    })
                })
                .catch(error => {
                    console.error('An error has ocurred: ', error);
                })
        }
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
                                <Link to={categoryName} onClick={(e) => this.selectedItem(e, categoryName)}>{categoryName}</Link>
                            </li>
                        )                        
                    })}
                </ul>
            </nav>
        )
    };
}

export { Nav }