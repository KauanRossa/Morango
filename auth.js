document.addEventListener('DOMContentLoaded', function() {
  const cadastroLink = document.querySelector("#cadastroLink");
  const token = localStorage.getItem('token');

  if (token) {
    // Usuário está logado
    cadastroLink.addEventListener('click', function(e) {
      e.preventDefault();
      // Redireciona para a página de edição
      window.location.href = './editar.html';
    });
  } else {
    // Usuário não está logado
    cadastroLink.addEventListener('click', function(e) {
      e.preventDefault();
      // Redireciona para a página de cadastro
      window.location.href = './cadastro.html';
    });
  }
});
