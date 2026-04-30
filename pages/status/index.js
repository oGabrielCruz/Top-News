import useSWR from "swr";
async function fetchAPI(key) {
  const response = await fetch(key);
  const responseBody = await response.json();
  return responseBody;
}

export default function StatusPage() {
  return (
    <>
      <h1>Status</h1>
      <UpdatedAt />
      <DatabaseStatus />
    </>
  );
}

function UpdatedAt() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });
  let updatedAtText = "Carregando...";

  if (!isLoading && data) {
    updatedAtText = new Date(data.updated_at).toLocaleString("pt-BR");
  }
  return <div>Ultima atualização: {updatedAtText}</div>;
}

function DatabaseStatus() {
  const { isLoading, data } = useSWR("api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });

  let databaseInfoContent = "Loading...";
  if (!isLoading && data) {
    const { database } = data.dependencies;

    databaseInfoContent = (
      <>
        <ul>
          <li>Version: {database.version}</li>
          <li>Max Connections: {database.max_connections}</li>
          <li>Opened Connections: {database.opened_connections}</li>
        </ul>
      </>
    );
  }

  return (
    <>
      <h2>Database:</h2>
      {databaseInfoContent}
    </>
  );
}
