import React from "react";
import './product.css';
import {ReactComponent as CircleIcon} from '../../assets/CircleIcon.svg'
import { connect } from 'react-redux';

class Product extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showCircleIcon: false
        };

        this.showCircleIcon = this.showCircleIcon.bind(this)
    };

    showCircleIcon = () => {
        this.setState(prevState => ({
            showCircleIcon: !prevState.showCircleIcon
        }))
    }

    render() {
        const { showCircleIcon } = this.state;
        const { name, img, stock, currentCurrency } = this.props;
        return (
            <div
            className="product-container"
            onMouseEnter = {this.showCircleIcon}
            onMouseLeave = {this.showCircleIcon}>
                <img className={`product-${stock}`} src={img} alt={name}/>
                <div className="text">
                {showCircleIcon && <CircleIcon className="circle-icon" />}
                    <h3>{name}</h3>
                    <p>${currentCurrency}</p>
                </div>
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