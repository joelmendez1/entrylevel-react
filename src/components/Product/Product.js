import React from "react";
import './product.css';
import {ReactComponent as CircleIcon} from '../../assets/CircleIcon.svg'
import { Link } from 'react-router-dom';
import { connect } from "react-redux";

class Product extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showCircleIcon: false
        };

        this.showCircleIcon = this.showCircleIcon.bind(this);
    };

    showCircleIcon = () => {
        this.setState(prevState => ({
            showCircleIcon: !prevState.showCircleIcon
        }))
    }

    render() {
        const { showCircleIcon } = this.state;
        const { id, name, gallery, inStock,  currentCurrency } = this.props;

        return (
            <div
            className="product-container"
            onMouseEnter = {this.showCircleIcon}
            onMouseLeave = {this.showCircleIcon}
            >
                <Link to={`/product/${id}`}>
                    <img className={`product-${name}-stock-${inStock ? 'onstock' : 'offstock'}`} src={gallery[0]} alt={name} />
                </Link>
                <ul className="text">
                {showCircleIcon && <CircleIcon className="circle-icon" />}
                    <li><h3>{name}</h3></li>
                    <li><p>${currentCurrency}</p></li>
                </ul>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const { currencyPersistReducer } = state;
    return {
        currentCurrency: currencyPersistReducer.currentCurrency
    }
}

export default connect(mapStateToProps)(Product)