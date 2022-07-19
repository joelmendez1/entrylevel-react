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
            currencies: []
        }

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick = (event) => {
        this.setState((prevState) =>({
            caretActivated: !prevState.caretActivated
        }))
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
    }

    render() {
        const { caretActivated, currencies } = this.state;

        return (
            <div className="container" onClick={(e) => this.handleClick(e)}>
                <div>
                    <CurrencySign className="currency-icon"/>
                    <Caret className={caretActivated ? 'caret-activated' : 'caret'} />
                </div>
                <ul className={caretActivated ? "currency-container-activated" : "currency-container"}>
                    {currencies.map((currency, index) => (
                        <li key={index}>{`${currency.symbol} ${currency.label}`}</li>
                    ))}
                </ul>
            </div>
        )
    }
}

export { Currency }