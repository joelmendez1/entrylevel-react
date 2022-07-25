import React from "react";
import './nav.css';
import { Link } from 'react-router-dom';
import { get } from '../../queries/getHomeData';
import { checkSessionData } from '../../utils/sessionStorage';
import Brand from '../../assets/Group.svg';
import { Currency } from '../svgComponents/Currency';
import { Cart } from '../svgComponents/Cart';
import { connect } from 'react-redux';
import { setURL } from '../../redux/nav/navActions';

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
                li.classList.remove('hovered');
            } else {
                li.classList.add('hovered');
            }
        })

    }

    componentDidMount() {
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

    render() {
        const { categories } = this.state;
        const { setURL } = this.props
        return (
            <nav>
                <ul className="navigator">
                    {
                        categories.map((category, index) => {
                            const categoryName = category.name !== 'all' ? category.name : 'home';
                            return (
                                <li key={index}>
                                    <Link to={categoryName} onClick={(e) => {
                                        setURL(categoryName)
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

const mapStateToProps = (state) => {
    return {
        currentURL: state.currentURL
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setURL: (url) => dispatch(setURL(url)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Nav)