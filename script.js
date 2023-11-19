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

  const dadosFormulario = new FormData();
  dadosFormulario.append('nome', inome.value);
  dadosFormulario.append('email', iemail.value);
  dadosFormulario.append('dataNasc', dataInvertida);
  dadosFormulario.append('telefone', itelefone.value);
  dadosFormulario.append('senha', isenha.value);

  return dadosFormulario;
}
function cadastrarUsuario() {
  const dadosFormulario = enviarDados();
  fetch('https://d797-189-28-184-55.ngrok-free.app/api/cadastrar', {
    method: 'POST',
    body: dadosFormulario,
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