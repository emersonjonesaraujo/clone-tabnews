//pagina responsávle por mostrar os dados sobre o status da aplicação

//busca os dados de acesso ao banco
import database from "infra/database.js";
//busca o json do package.json
import pkg from "package.json";
import { version } from "react";

async function status(request, response) {
  //busca a data corrente no formato ISO
  const updatedAt = new Date().toISOString();

  //busca o json do package.json
  //const pkgVersionPg = pkg.dependencies.pg. ";" identifica ao banco o fim da query;
  let text = "SHOW server_version;";
  //  const databaseVersionResult = await database.query("SHOW server_version;");
  const databaseVersionResult = await database.query(text);

  const databaseVersionValue = databaseVersionResult.rows[0].server_version;

  //select no postgree para identificar o max de conexões permitidas
  //text = "SELECT current_setting('max_connections')";
  text = "SHOW max_connections;";
  const resultMax = await database.query(
    text,
    //  "SELECT current_setting('max_connections')",
  );
  //acessa o array 0 de resultMax.row para obter o valor de current_setting

  //let numberString = resultMax.rows[0].current_setting;
  let numberString = resultMax.rows[0].max_connections;
  const dbMaxConections = parseInt(numberString);

  //select no postgree para identificar o numero de conexões ativas
  //text = "SELECT * FROM pg_stat_activity WHERE state = 'active'";
  //:: é um type casting convertendo o count para int
  //'$1' parametro dinamico
  const dbname = process.env.POSTGRES_DB; //"local_db";
  const resultac = await database.query({
    text: "select count(*)::int  from pg_stat_activity WHERE  datname = $1;",
    values: [dbname],
  });
  const dbOpenConections = resultac.rows[0].count;
  const dbHost = process.env.POSTGRES_HOST;

  //let conectionsUsed = parseInt(numberString);
  response.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      database: {
        db_name: dbname,
        Host: dbHost,
        version_pg: databaseVersionValue,
        max_conections: dbMaxConections,
        conections_used: dbOpenConections,
      },
    },
  });
}

export default status;
