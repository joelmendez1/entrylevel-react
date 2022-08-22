const updateCostCurrency = (purchasedProducts, currentCurrency) => {
    const taxes = 21;
    let total = 0;

    purchasedProducts.forEach(product => {
        product.prices.forEach(price => {
            if(currentCurrency.label === price.currency.label) {
                total += price.amount * product.count;
            }
        })
    })

    const taxesCost = ((total * taxes) / 100).toFixed(2);
    const totalWithTaxes = (parseFloat(total) + parseFloat(taxesCost)).toFixed(2);

    return {
        total, 
        taxesCost,
        totalWithTaxes
    };
}

export { updateCostCurrency }