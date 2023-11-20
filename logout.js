document.addEventListener('DOMContentLoaded', function() {
    const logoutLink = document.querySelector("#logoutLink");
  
    logoutLink.addEventListener('click', function(e) {
      e.preventDefault();
      // Remove o token do localStorage (simulando o logout)
      localStorage.removeItem('token');
      // Redireciona para a página de login
      window.location.href = './login.html';
    });
  });
  