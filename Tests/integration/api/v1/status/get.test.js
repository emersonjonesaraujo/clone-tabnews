//Sempre que o run npm test:watch é executado este JS será executado
test("GET to /api/v1/status should return 200", async () => {
  //teste para identificar se conexão da pasta status está funcionando
  const response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toBe(200);

  const responseBody = await response.json();
  expect(responseBody.dependencies.database.version_pg).toEqual("16.4");
  expect(responseBody.dependencies.database.max_conections).toBeGreaterThan(0);
  expect(responseBody.dependencies.database.conections_used).toEqual(1);

  //teste para identificar se a data atual é válida e é no minimo igual a data inicial
  //do timestemp 01.01.1970
  const parsedUpdatedAt = new Date(responseBody.updated_at).toISOString();
  expect(responseBody.updated_at).toEqual(parsedUpdatedAt);
  console.log(responseBody);
});
