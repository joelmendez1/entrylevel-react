import { client, Query } from "@tilework/opus";
import { saveData } from "../utils/sessionStorage";

client.setEndpoint("http://localhost:4000/graphql");

const getCategoriesName = async (field) => {
  const query = new Query(field, true).addField("name", true);

  const response = await client.post(query);

  saveData(field, response);

  return response;
};

export { getCategoriesName };
