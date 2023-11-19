document.addEventListener('DOMContentLoaded', function() {
    const cadastroLink = document.querySelector("#cadastroLink");
  
    // Verifica se o usuário está logado (verificando a existência do token no localStorage)
    const token = localStorage.getItem('token');
  
    if (token) {
      // Usuário está logado
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
    } else {
      // Usuário não está logado
      cadastroLink.href = './cadastro.html'; // Altera o href para cadastro.html
    }
  });
  