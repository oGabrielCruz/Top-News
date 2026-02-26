import database from "../../../../infra/database.js";

async function status(request, response) {
  try {
    const result = await database.query("SELECT 1 + 1 as sum;");
    console.log(result.rows);
    response.status(200).json({ status: "ok", sum: result.rows });
  } catch (err) {
    // log the underlying error so that the developer can see what failed
    console.error("/api/v1/status error", err);
    // still send a meaningful HTTP response instead of letting Next.js
    // convert the exception into a generic 500
    response.status(500).json({ error: "database query failed" });
  }
}

export default status;
