//aula 29 estabilizar test.js
import retry from "async-retry";

async function waitForAllServices() {
  await waitForWebService();

  async function waitForWebService() {
    //tenta acessar o endpoint ate dar certo
    return retry(fechSatautsPage);

    async function fechSatautsPage() {
      const response = await fetch("http://localhost:3000/api/v1/status");
    }
  }
}

//para importar na bateria de testes
export default {
  waitForAllServices,
};
