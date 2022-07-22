import React from "react";
import './nav.css';
import { Link } from 'react-router-dom';
import { get } from '../../queries/getHomeData';
import { checkSessionData } from '../../utils/sessionStorage';
import Brand from '../../assets/Group.svg';
import { Currency } from '../svgComponents/Currency';
import { Cart } from '../svgComponents/Cart';

class Nav extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pathName: 'home',
            categories: []
        }

        this.selectedItem = this.selectedItem.bind(this);
    };

    selectedItem = (e, categoryName) => {
        const allItems = e.target.parentNode.parentNode.childNodes;

        allItems.forEach(li => {
            if(li.textContent !== categoryName) {
                li.classList.remove('hovered');
            } else {
                li.classList.add('hovered');
            }
        })

    }

    componentDidMount() {
        {
            (JSON.parse(sessionStorage.getItem('name')) ? checkSessionData('name') : get('name'))
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
        const { categories, pathName } = this.state;
        console.log(pathName)
        return (
            <nav>
                <ul className="navigator">
                    {categories.map((category, index) => {
                        const categoryName = category.name !== 'all' ? category.name : 'home';
                        return (
                            <li key={index}>
                                <Link to={categoryName} onClick={(e) => {
                                    this.selectedItem(e, categoryName)
                                    this.setState({
                                        pathName: categoryName
                                    })
                                }}>{categoryName}</Link>
                            </li>
                        )                        
                    })}
                </ul>
                <img src={Brand} alt="logo" />
                <div className="actions">
                    <Currency />
                    <Cart />
                </div>
            </nav>
        )
    };
}

export { Nav }