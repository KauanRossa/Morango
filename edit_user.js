document.addEventListener('DOMContentLoaded', async function() {
    async function preencherDadosUsuario() {
      const form = document.getElementById('editForm');
      const token = localStorage.getItem('token');
  
      try {
        const response = await fetch(`https://b1eb-189-28-184-45.ngrok-free.app/api/usuarios/buscar-por-token`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'ngrok-skip-browser-warning': 'true'
          }
        });
  console.log(response);
        if (!response.ok) {
          throw new Error('Erro ao buscar os dados do usuário');
        }
  
        const usuarioLogado = await response.json();
        document.getElementById('nome').value = usuarioLogado.nome;
        document.getElementById('telefone').value = usuarioLogado.telefone;
        document.getElementById('dataNasc').value = usuarioLogado.dataNasc;
      } catch (error) {
        console.error('Erro ao buscar os dados do usuário:', error);
      }
    }
  
    async function enviarAlteracoes(event) {
      event.preventDefault();
  
      const nome = document.getElementById('nome').value;
      const telefone = document.getElementById('telefone').value;
      const dataNasc = document.getElementById('dataNasc').value;
      const senha = document.getElementById('senha').value;
  
      const dadosAtualizados = { nome, telefone, dataNasc, senha };
      const token = localStorage.getItem('token');
  
      try {
        const response = await fetch(`https://b1eb-189-28-184-45.ngrok-free.app/api/usuarios/alterar`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(dadosAtualizados),
        });
  
        if (response.ok) {
          console.log('Alterações salvas com sucesso!');
          window.location.href = './index.html';
        } else {
          throw new Error('Erro ao salvar as alterações');
        }
      } catch (error) {
        console.error('Erro ao salvar as alterações:', error);
      }
    }

    await preencherDadosUsuario();

    const form = document.getElementById('editForm');
    form.addEventListener('submit', enviarAlteracoes);
  
    const logoutLink = document.getElementById('logoutLink');
    logoutLink.addEventListener('click', function(e) {
      e.preventDefault();
      localStorage.removeItem('token');
      alert('Você encerrou a sessão.');
      window.location.href = './login.html';
    });
  });