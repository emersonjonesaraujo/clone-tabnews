//Sempre que o run npm test:watch é executado este JS será executado
//só é possivel o import por causa do jest.config
import database from "infra/database";

beforeAll(cleanDatabase);

async function cleanDatabase() {
  await database.query("drop schema public cascade; create schema public;");
}

//Sempre que o run npm test:watch é executado este JS será executado
test("POST to /api/v1/migrations should return 200", async () => {
  //teste para identificar se conexão da pasta status está funcionando
  const response = await fetch("http://localhost:3000/api/v1/migrations", {
    method: "POST",
  });
  expect(response.status).toBe(201);

  const responseBody = await response.json();
  expect(responseBody.length).toBeGreaterThan(0);
  expect(Array.isArray(responseBody)).toBe(true);

  for (var i = 0; i < responseBody.length; i++) {
    const migName = responseBody[i].name;
    const queryMigrationsDb = await database.query({
      text: 'Select count(*)::int FROM "public"."migrationsTable" where name = $1;',
      values: [migName],
    });
    const migrationCount = queryMigrationsDb.rows[0].count;
    expect(migrationCount).toBeGreaterThan(0);
  }
});
