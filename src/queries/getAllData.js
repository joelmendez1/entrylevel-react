import { client, Field, Query } from "@tilework/opus";

client.setEndpoint("http://localhost:4000/graphql");

//categories, category, currencies

const get = async (field) => {
  let query = new Query("categories", true);

  switch (field) {
    case "name":
      query = createGetCategoriesNameQuery(query, field);
      break;
    case "products":
      query = createGetProductsQuery(query, field);
      break;
    // case 'all':
    //   query = createGetAllQuery(query);
    //   break;
    default:
      break;
  }
  const response = await client.post(query);

  return response;
};

const createGetCategoriesNameQuery = (query, field) => {
  return query.addField(field, true);
};

const createGetProductsQuery = (query, field) => {
  return query
    .addArgument("id", "String!", field)
    .addFieldList([
      "id",
      "name",
      "inStock",
      "gallery",
      "description",
      "brand",
      "attributes {id, items {value, id}}",
      "prices {amount}",
    ]);

  // .addField(
  //   new Field(field, true).addFieldList([
  //     'id',
  //     'name',
  //     'inStock',
  //     'gallery',
  //     'description',
  //     'category',
  //     'attributes{id, name, type, items{displayValue, value, id}}',
  //     'prices{currency{label, symbol}, amount}',
  //   ])
  // );
};

// const getProduct = async (product) => {
//   client.setEndpoint('http://localhost:4000/graphql');

//   const query = new Query('product', true)
//     .addArgument('id', product)
//     .addFieldList([
//       'id',
//       'name',
//       'inStock',
//       'gallery',
//       'description',
//       'brand',
//       'attributes {id, items {value, id}}',
//       'prices {amount}',
//     ]);

//   return await client.post(query);
// };

const getProduct = async (product) => {
  const query = new Query("product", true)
    .addArgument("id", "String!", product)
    .addFieldList([
      "id",
      "name",
      "inStock",
      "gallery",
      "description",
      "category",
      "attributes{id, name, type, items{displayValue, value, id}}",
      "prices{currency{label, symbol}, amount}",
    ]);

  const response = await client.post(query);

  return response;
};

export default getProduct;

const createGetAllQuery = async () => {
  const firstQuery = new Query("categories", true)
    .addField("name", true)
    .addField(
      new Field("products", true).addFieldList([
        "id",
        "name",
        "attributes{id, name, type, items{displayValue, value, id}}",
        "inStock",
        "prices{currency{label, symbol}, amount}",
      ])
    )
    .addField(
      new Field("products")
        .addField("gallery")
        .addCalculatedField("gallery", (result) => result.gallery[0])
    );
  const firstQueryResponse = await client.post(firstQuery);

  return firstQueryResponse;
};

export { get, createGetAllQuery };
