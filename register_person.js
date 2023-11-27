const formulario = document.querySelector("form");
const inome = document.querySelector(".nome");
const iemail = document.querySelector(".email");
const idataNasc = document.querySelector(".dataNasc");
const itelefone = document.querySelector(".telefone");
const isenha = document.querySelector(".senha");

function inverterData(data) {
  const partes = data.split('/');
  if (partes.length === 3) {
    const dia = partes[0];
    const mes = partes[1];
    const ano = partes[2];
    const dataInvertida = `${ano}-${mes}-${dia}`;
    return dataInvertida;
  } else {
    return data;
  }
}

function enviarDados() {
  const dataOriginal = idataNasc.value;
  const dataInvertida = inverterData(dataOriginal);

  return {
    nome: inome.value,
    email: iemail.value,
    dataNasc: dataInvertida,
    telefone: itelefone.value,
    senha: isenha.value
  };
}

function cadastrarUsuario() {
  const dadosFormulario = enviarDados();
  fetch('https://e8dd-189-28-184-45.ngrok-free.app/api/cadastrar', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(dadosFormulario)
  })
  .then(response => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error('Erro ao cadastrar usuário');
    }
  })
  .then(data => {
    console.log('Usuário cadastrado:', data);
    window.location.href = './login.html';
  })
  .catch(error => {
    console.error('Erro ao cadastrar usuário:', error);
  });
}

function limpar(){
  inome.value = "";
  iemail.value = "";
  idataNasc.value = "";
  itelefone.value = "";
  isenha.value = "";
}

formulario.addEventListener('submit', function(event){
  event.preventDefault();
  cadastrarUsuario();
  limpar();
});
