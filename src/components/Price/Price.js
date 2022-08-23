import React from "react";

class Price extends React.Component {
    render() {
        const { prices, currentCurrency } = this.props;
        return (
            prices.map((price, index) => {
                const { currency, amount } = price;
                const { label, symbol } = currency;

                if(label === currentCurrency.label) {
                    return (
                        <p key={`price-${label}-${index}`}><strong>{`${symbol} ${amount}`}</strong></p>
                    )
                }
            })
        )
    }
}

export { Price }