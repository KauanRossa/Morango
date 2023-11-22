document.addEventListener('DOMContentLoaded', function() {
    const logoutLink = document.querySelector("#logoutLink");
  
    logoutLink.addEventListener('click', function(e) {
      e.preventDefault();
      localStorage.removeItem('token');
      alert('Você encerrou a sessão.');
      window.location.href = './login.html';
    });
  });