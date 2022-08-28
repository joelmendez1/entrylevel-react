import { client, Query } from "@tilework/opus";

client.setEndpoint("http://localhost:4000/graphql");

const getCategoriesName = async (field) => {
  const query = new Query(field, true).addField("name", true);

  const response = await client.post(query);

  return response;
};

export { getCategoriesName };
