import { client, Field, Query } from "@tilework/opus";
import { saveData } from '../utils/sessionStorage'

client.setEndpoint("http://localhost:4000/graphql"); 

const get = async (field) => {
    let query = new Query("categories", true);

    switch (field) {
        case "name":
            query = createGetCategoriesNameQuery(query, field);
            break;
        case "products":
            query = createGetProductsQuery(query, field);
            break;
        case "all":
            query = createGetAllQuery(query);
            break;
        default:
            break
    }
    const response  = await client.post(query);

    saveData(field, response);

    return response;
}

const createGetCategoriesNameQuery = (query, field) => {
    return query.addField(field, true);
}

const createGetProductsQuery = (query, field) => {
    return query
        .addField(new Field(field, true).addFieldList(['id', 'name', 'inStock', 'gallery', 'description', 'category', 'attributes{id, name, type, items{displayValue, value, id}}', 'prices{currency{label, symbol}, amount}']));
}

const createGetAllQuery = (query) => {
    return query
        .addField('name', true)
        .addField(new Field('products', true).addFieldList(['id', 'name', 'inStock', 'gallery', 'description', 'category', 'attributes{id, name, type, items{displayValue, value, id}}', 'prices{currency{label, symbol}, amount}']));
}

export { get }