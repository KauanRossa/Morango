document.addEventListener('DOMContentLoaded', function() {
  const formularioLogin = document.querySelector("form");
  const inputEmail = document.querySelector("#email");
  const inputSenha = document.querySelector("#senha");

  function limparCampos() {
    inputEmail.value = '';
    inputSenha.value = '';
  }

  async function realizarLogin() {
    const dadosLogin = {
      email: inputEmail.value,
      senha: inputSenha.value
    };

    try {
      const response = await fetch('https://33d6-189-28-184-55.ngrok-free.app/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dadosLogin)
      });

      if (!response.ok) {
        throw new Error('Credenciais inválidas. Verifique seu email e senha.');
      }

      const data = await response.json();

      // Armazena o token no localStorage
      localStorage.setItem('token', data.token);
      console.log('Login realizado:', data);

      // Obter tipo de usuário
      const tipoUsuario = await obterTipoUsuario();

      // Redireciona para a página correspondente com base no tipo de usuário
      if (tipoUsuario === 'ADMINISTRADOR') {
        window.location.href = './index_admin.html';
      } else if (tipoUsuario === 'CLIENTE') {
        window.location.href = './index.html';
      }

    } catch (error) {
      console.error('Erro ao realizar login:', error);
      // Exibe um alerta para o usuário quando as credenciais estiverem incorretas
      alert(error.message);
      // Limpa os campos do formulário
      limparCampos();
    }
  }

  async function obterTipoUsuario() {
    const token = localStorage.getItem('token');

    try {
      const response = await fetch('https://33d6-189-28-184-55.ngrok-free.app/api/usuarios/buscar-por-token', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Erro ao obter as informações do usuário');
      }

      const usuarioLogado = await response.json();
      return usuarioLogado.tipoUsuario;

    } catch (error) {
      console.error('Erro ao obter as informações do usuário:', error);
      throw error;
    }
  }

  formularioLogin.addEventListener('submit', function(event){
    event.preventDefault();
    realizarLogin();
  });
});
