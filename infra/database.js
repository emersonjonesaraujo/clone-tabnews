import { Client } from "pg";

async function query(queryObject) {
  const client = new Client({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
  });

  //try catch para evitar o vazamento de conexões
  try {
    await client.connect();
    const result = await client.query(queryObject);
    return result;
  } catch (error) {
    throw error;
    console.error(error);
  } finally {
    await client.end();
  }
}

console.log("Credencias do PG:", {
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT,
  user: process.env.POSTGRES_USER,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
});

export default {
  query: query,
};
