document.addEventListener('DOMContentLoaded', function() {
    const logoutLink = document.querySelector("#logoutLink");
  
    logoutLink.addEventListener('click', function(e) {
      e.preventDefault();
      // Remove o token do localStorage (simulando o logout)
      localStorage.removeItem('token');
      alert('Você encerrou a sessão.');
      window.location.href = './login.html';
    });
  });