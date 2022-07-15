import { client, Field, Query } from "@tilework/opus";

client.setEndpoint("http://localhost:4000/graphql"); 

const getCategoriesName = async () => { 
    const queryCategoriesName = new Query("categories", true)
    .addField('name', true)

    return await client.post(queryCategoriesName)   
}

const getProducts = async () => {
    const queryProducts = new Query("categories", true)
        .addField(new Field('products', true).addFieldList(['id', 'name', 'inStock', 'gallery', 'description', 'category', 'attributes{id, name, type, items{displayValue, value, id}}', 'prices{currency{label, symbol}, amount}']))

    return await client.post(queryProducts)
}

export { getCategoriesName, getProducts }