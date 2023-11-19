document.addEventListener('DOMContentLoaded', function() {
  const formularioLogin = document.querySelector("form");
  const inputEmail = document.querySelector("#email");
  const inputSenha = document.querySelector("#senha");

  function limparCampos() {
    inputEmail.value = '';
    inputSenha.value = '';
  }

  function realizarLogin() {
    const dadosLogin = {
      email: inputEmail.value,
      senha: inputSenha.value
    };

    fetch('https://33d6-189-28-184-55.ngrok-free.app/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dadosLogin)
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Credenciais inválidas. Verifique seu email e senha.');
      }
    })
    .then(data => {
      // Armazena o token no localStorage
      localStorage.setItem('token', data.token);
      console.log('Login realizado:', data);
      // Redireciona para a página index.html após o login
      window.location.href = './index.html';
      // Altera o ícone para logout
      const cadastroLink = document.querySelector("#cadastroLink");
      if (cadastroLink) {
        cadastroLink.innerHTML = '<ion-icon name="log-out-outline"></ion-icon>';
        cadastroLink.addEventListener('click', function(e) {
          e.preventDefault();
          // Remove o token do localStorage (simulando o logout)
          localStorage.removeItem('token');
          // Exibe o alerta informando que o usuário foi deslogado
          alert('Você foi deslogado da sua conta.');
          // Redireciona para a página de login
          window.location.href = './login.html';
        });
      }
      // Limpa os campos do formulário
      limparCampos();
    })
    .catch(error => {
      console.error('Erro ao realizar login:', error);
      // Exibe um alerta para o usuário quando as credenciais estiverem incorretas
      alert(error.message);
      // Limpa os campos do formulário
      limparCampos();
    });
  }

  formularioLogin.addEventListener('submit', function(event){
    event.preventDefault();
    realizarLogin();
  });
});
