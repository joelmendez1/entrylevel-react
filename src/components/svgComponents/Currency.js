import React from "react";
import './currency.css';
import {ReactComponent as CurrencySign} from '../../assets/$.svg'
import {ReactComponent as Caret} from '../../assets/vector2.svg'
import { checkSessionData } from "../../utils/sessionStorage";
import { getCurrenciesData } from '../../queries/getCurrenciesData'


class Currency extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            caretActivated: false,
            currencies: [],
            currentCurrency: 'USD'
        }

        this.handleClick = this.handleClick.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }

    handleClick = () => {
        this.setState((prevState) =>({
            caretActivated: !prevState.caretActivated
        }))
    }

    handleClickOutside = (e) => {
        if(e.target.className !== 'container') {
            this.setState({
                caretActivated: false
            })
        }
    }

    componentDidMount() {
        (JSON.parse(sessionStorage.getItem('currencies')) ? checkSessionData('currencies') : getCurrenciesData('currencies'))
            .then(res => {
                this.setState({
                    currencies: res.currencies
                });
            })
            .catch(error => {
                console.error('An error has ocurred: ', error);
            })
        document.addEventListener('click', (e) => this.handleClickOutside(e))
    }

    render() {
        const { caretActivated, currencies, currentCurrency } = this.state;

        return (
            <div className="container" onClick={this.handleClick}>
                <div>
                    <CurrencySign className="currency-icon"/>
                    <Caret className={caretActivated ? 'caret-activated' : 'caret'} />
                </div>
                <ul className={caretActivated ? "currency-container-activated" : "currency-container"}>
                    {currencies.map((currency, index) => (
                        <li
                        key={index}
                        onClick={() => this.setState({currentCurrency: currency.label})}
                        style={currentCurrency === currency.label ? {'background': 'rgba(29, 31, 34, .5)'} : null}>
                            {`${currency.symbol} ${currency.label}`}
                        </li>
                    ))}
                </ul>
            </div>
        )
    }
}

export { Currency }