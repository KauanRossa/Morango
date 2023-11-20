document.addEventListener('DOMContentLoaded', async function() {
    const endpointBuscarProdutos = 'https://33d6-189-28-184-55.ngrok-free.app/api/produto/buscar-produtos';
    const endpointAlterarProduto = 'https://33d6-189-28-184-55.ngrok-free.app/api/produtos/alterar';
    const endpointExcluirProduto = 'https://33d6-189-28-184-55.ngrok-free.app/api/produtos/alterar';
  
    async function buscarProdutos() {
      try {
        const response = await fetch(endpointBuscarProdutos);
        if (!response.ok) {
          throw new Error('Erro ao buscar produtos');
        }
        const produtos = await response.json();
        return produtos;
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
      }
    }
  
    async function exibirProdutos() {
      const tbody = document.querySelector('tbody');
      const produtos = await buscarProdutos();
      if (produtos) {
        tbody.innerHTML = '';
        produtos.forEach(produto => {
          const tr = document.createElement('tr');
          tr.innerHTML = `
            <td data-label="Nome do Produto">${produto.nome}</td>
            <td data-label="Quantidade">${produto.quantidade}</td>
            <td data-label="Descrição">${produto.descricao}</td>
            <td data-label="Preço">$${produto.preco.toFixed(2)}</td>
            <td data-label="Ações">
                <button class="edit" data-id="${produto.id}">Editar</button>
                <button class="delete" data-id="${produto.id}">Excluir</button>
            </td>
          `;
          tbody.appendChild(tr);
        });
      }
      configurarBotoes();
    }
  
    async function configurarBotoes() {
      const botoesEditar = document.querySelectorAll('.edit');
      const botoesExcluir = document.querySelectorAll('.delete');
  
      botoesEditar.forEach(botao => {
        botao.addEventListener('click', async function() {
          const idProduto = botao.getAttribute('data-id');
          const novoNome = prompt('Digite o novo nome do produto:');
          if (novoNome !== null) {
            try {
              const response = await fetch(endpointAlterarProduto + `/${idProduto}`, {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json',
                  'ngrok-skip-browser-warning': 'true'
                },
                body: JSON.stringify({ nome: novoNome })
              });
  
              if (response.ok) {
                // Atualiza a lista de produtos após a edição
                exibirProdutos();
                console.log('Produto editado com sucesso!');
              } else {
                throw new Error('Erro ao editar o produto');
              }
            } catch (error) {
              console.error('Erro ao editar o produto:', error);
            }
          }
        });
      });
  
      botoesExcluir.forEach(botao => {
        botao.addEventListener('click', async function() {
          const idProduto = botao.getAttribute('data-id');
          if (confirm('Tem certeza que deseja excluir o produto?')) {
            try {
              const response = await fetch(endpointExcluirProduto + `/${idProduto}`, {
                method: 'DELETE'
              });
  
              if (response.ok) {
                // Atualiza a lista de produtos após a exclusão
                exibirProdutos();
                console.log('Produto excluído com sucesso!');
              } else {
                throw new Error('Erro ao excluir o produto');
              }
            } catch (error) {
              console.error('Erro ao excluir o produto:', error);
            }
          }
        });
      });
    }
  
    // Chama a função para exibir os produtos ao carregar a página
    exibirProdutos();
  });
  