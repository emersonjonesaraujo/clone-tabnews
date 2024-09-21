function status(request, response) {
  response.status(200).json({ chave: "valorização" });
}

export default status;
