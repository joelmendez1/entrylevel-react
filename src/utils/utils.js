const updateCostCurrency = (purchasedProducts, currentCurrency) => {
  const taxes = 21;
  let total = 0;

  purchasedProducts.forEach((product) => {
    product.prices.forEach((price) => {
      if (currentCurrency.label === price.currency.label) {
        total += price.amount * product.count;
      }
    });
  });

  const taxesCost = ((total * taxes) / 100).toFixed(2);
  const totalWithTaxes = (parseFloat(total) + parseFloat(taxesCost)).toFixed(2);

  return {
    total,
    taxesCost,
    totalWithTaxes,
  };
};

const arrayCompare = (arr1, arr2) => {
  return arr1.join() === arr2.join();
};

const objectCompare = (obj1, obj2) => {
  if (arrayCompare(Object.keys(obj1), Object.keys(obj2))) {
    if (arrayCompare(Object.values(obj1), Object.values(obj2))) {
      return true;
    }
  }
  return false;
};

export { updateCostCurrency, arrayCompare, objectCompare };
