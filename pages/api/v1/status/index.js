import database from "infra/database.js";

async function status(request, response) {
  try {
    const result = await database.query("SELECT 1 + 1 as sum;");
    console.log(result.rows);
    response.status(200).json({ status: "ok", sum: result.rows });
  } catch (err) {
    console.error("/api/v1/status error", err);
    response.status(200).json({ error: "database query failed" });
  }
}

export default status;
