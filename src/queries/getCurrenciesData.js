import { client, Query } from "@tilework/opus";

client.setEndpoint("http://localhost:4000/graphql");

const getCurrenciesData = async (field) => {
  const query = new Query(field, true)
    .addField("label", true)
    .addField("symbol", true);

  const response = await client.post(query);

  return response;
};

export { getCurrenciesData };
