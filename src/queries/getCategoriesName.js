import { client, Query } from "@tilework/opus";

client.setEndpoint("http://localhost:4000/graphql");

const getCategoriesName = async () => {
  const query = new Query("categories", true).addField("name", true);

  const response = await client.post(query);

  return response;
};

export { getCategoriesName };
