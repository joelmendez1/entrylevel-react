import { client, Field, Query } from "@tilework/opus";

client.setEndpoint("http://localhost:4000/graphql");

const createGetAllQuery = async (pathName) => {
  const query = new Query("category", true)
    .addField("name")
    .addField(
      new Field("products", true).addFieldList([
        "id",
        "name",
        "brand",
        "attributes{id, name, type, items{displayValue, value, id}}",
        "inStock",
        "prices{currency{label, symbol}, amount}",
      ])
    )
    .addField(
      new Field("products")
        .addField("gallery")
        .addCalculatedField("gallery", (result) => result.gallery[0])
    )
    .addArgument("input", "CategoryInput", { title: pathName });

  const response = await client.post(query);

  return response.category;
};

const getProduct = async (product) => {
  const query = new Query("product", true)
    .addArgument("id", "String!", product)
    .addFieldList([
      "id",
      "name",
      "brand",
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

const getAllImages = async (imgId) => {
  const query = new Query("product", true)
    .addArgument("id", "String!", imgId)
    .addFieldList(["gallery"]);

  const response = await client.post(query);

  return response;
};

export { createGetAllQuery, getProduct, getAllImages };
