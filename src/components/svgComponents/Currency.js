import React from "react";
import "./currency.css";
import {ReactComponent as CurrencySign} from "../../assets/$.svg";
import {ReactComponent as Caret} from "../../assets/vector2.svg";
import { checkSessionData } from "../../utils/sessionStorage";
import { getCurrenciesData } from "../../queries/getCurrenciesData";
import { connect } from "react-redux";
import { setCurrency } from "../../redux/currency/currencyActions";

class Currency extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            caretActivated: false,
            currencies: [],
            loading: true
        }
        this.handleOnClick = this.handleOnClick.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }

    handleOnClick() {
        this.setState((prevState) =>({
            caretActivated: !prevState.caretActivated
        }))
    }

    handleClickOutside(e) {
        if(e.target.className !== "container") {
            this.setState({
                caretActivated: false
            })
        }
    }

    componentDidMount() {
        (JSON.parse(sessionStorage.getItem("currencies")) ? checkSessionData("currencies") : getCurrenciesData("currencies"))
            .then(res => {
                this.setState({
                    currencies: res.currencies,
                    loading: false
                });
            })
            .catch(error => {
                console.error("An error has ocurred: ", error);
            })
        document.addEventListener("click", (e) => this.handleClickOutside(e))
    }

    render() {
        const { caretActivated, currencies } = this.state;
        const { setCurrency, currentCurrency } = this.props;

        return (
            <div className="container" onClick={this.handleOnClick}>
                <div>
                    <CurrencySign className="currency-icon"/>
                    <Caret className={caretActivated ? "caret-activated" : "caret"} />
                </div>
                <ul className={caretActivated ? "currency-container-activated" : "currency-container"}>
                    {currencies.map((currency, index) => (
                        <li
                        key={index}
                        onClick={() => {
                            setCurrency(currency.label)
                        }}
                        style={currentCurrency === currency.label ? {"background": "rgba(29, 31, 34, .5)"} : null}>
                            {`${currency.symbol} ${currency.label}`}
                        </li>
                    ))}
                </ul>
            </div>
        )
    }
}

const mapStateToProps = ({ currencyPersistReducer }) => {
    return {
        currentCurrency: currencyPersistReducer.currentCurrency
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setCurrency: (currency) => dispatch(setCurrency(currency)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Currency)