import { client, Field, Query } from "@tilework/opus";
import { saveData } from '../utils/sessionStorage'

client.setEndpoint("http://localhost:4000/graphql"); 


const getCategoriesName = async () => { 
    const field = 'name';

    const queryCategoriesName = new Query("categories", true)
    .addField(field, true);
    const response  = await client.post(queryCategoriesName);

    saveData(field, response);

    return response;
}

const getProducts = async () => {
    const field = 'products';

    const queryProducts = new Query("categories", true)
        .addField(new Field(field, true).addFieldList(['id', 'name', 'inStock', 'gallery', 'description', 'category', 'attributes{id, name, type, items{displayValue, value, id}}', 'prices{currency{label, symbol}, amount}']));
    const response  = await client.post(queryProducts);

    saveData(field, response);

    return response;
}

export { getCategoriesName, getProducts }