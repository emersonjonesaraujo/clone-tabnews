//importar o modulo. o require não transpila - Aula 28 pista lenta 1
const { exec } = require("node:child_process");

function checkPostgres() {
  exec("docker exec postgre-dev pg_isready --host localhost", handleReturn);

  function handleReturn(error, stdout) {
    if (stdout.search("accepting connections") === -1) {
      process.stdout.write(".");
      checkPostgres();
      return;
    }
    //emojis windows + ..
    console.log("\n🟢 Postgress está aceitando conexões!\n");
  }
}

process.stdout.write("\n\n🔴 Aguardando postgres");
checkPostgres();
