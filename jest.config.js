//especifica manualmente qual é o arquivo com as variaveis de ambiente
const dotenv = require("dotenv");
dotenv.config({
  path: ".env.development",
});

//import da forma antiga para não haver problema de compatilidade
//Este import é para trazer para dentro do Jest as funcionalidades do NEXT
const nextJest = require("next/jest");

//Factory de objetos
const createJestConfig = nextJest({
  dir: ".", //especifica que o projeto está na raiz
});

//No array moduleDirectories é infrmado ao JEST onde estão os arquivos node_modules
//e também para o JEST resolver os módulos a partir da raiz do projeto ->"<rootDir>
const jestConfig = createJestConfig({
  moduleDirectories: ["node_modules", "<rootDir>"],
});

module.exports = jestConfig;
