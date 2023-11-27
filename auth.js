document.addEventListener('DOMContentLoaded', function() {
  const cadastroLink = document.querySelector("#cadastroLink");
  const token = localStorage.getItem('token');

  if (token) {
    cadastroLink.addEventListener('click', function(e) {
      e.preventDefault();
      window.location.href = './editar.html';
    });
  } else {
    cadastroLink.addEventListener('click', function(e) {
      e.preventDefault();
      window.location.href = './cadastro.html';
    });
  }
});
