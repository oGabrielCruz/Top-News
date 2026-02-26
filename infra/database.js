import { Client } from "pg";

async function query(queryObject) {
  const client = new Client({
    host: process.env.POSTGRES_HOST || "localhost",
    port: process.env.POSTGRES_PORT || 5432,
    user: process.env.POSTGRES_USER || "postgres",
    database: process.env.POSTGRES_DB || "postgres",
    // if the environment variable isn't defined just fall back to the
    // password that the docker-compose service is configured with.
    password: process.env.POSTGRES_PASSWORD || "local_password",
  });

  await client.connect();

  try {
    // wait for the query to finish before closing the connection; otherwise
    // `client.end()` may terminate the connection while the query is still
    // running, which often results in an unhandled rejection and a 500 from
    // the API handler.
    const result = await client.query(queryObject);
    return result;
  } finally {
    await client.end();
  }
}

export default {
  query: query,
};
