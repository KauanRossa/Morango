fetch("https://d797-189-28-184-55.ngrok-free.app/api/produtos/buscar-todos", {
  method: "GET",
  headers: {
    'Authorization': 'NoAuth',
    // Outros cabeçalhos, se necessário
  }
})
.then(response => {
  console.log(response); // Adicionando console.log para ver a resposta completa
  if (!response.ok) {
    throw new Error('Erro ao buscar os produtos!');
  }
  const contentType = response.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    return response.json(); // Transforma a resposta em JSON
  } else {
    throw new Error('Resposta não é do tipo JSON!');
  }
})
.then(data => {
  console.log('Produtos encontrados:', data);
  // Faça o que precisar com os dados dos produtos
})
.catch(error => {
  console.error('Ocorreu um erro:', error);
  // Trate adequadamente o erro
});
