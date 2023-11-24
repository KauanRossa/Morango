document.addEventListener('DOMContentLoaded', async function() {
    const endpointBuscarProdutos = 'http://localhost:8080/api/produtos/buscar-todos';
    const endpointAlterarProduto = 'http://localhost:8080/api/produtos/alterar';
    const endpointDeletarProduto = 'http://localhost:8080/api/produtos';

    const token = localStorage.getItem('token');

    async function buscarProdutos() {
        try {
            const response = await fetch(endpointBuscarProdutos,{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'ngrok-skip-browser-warning': 'true'
                }
            });
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
        const tbody = document.getElementById('produtos-table-body');
        const produtos = await buscarProdutos();
        if (produtos) {
            tbody.innerHTML = '';
            produtos.forEach(produto => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td data-label="Nome do Produto"><input type="text" value="${produto.nome}"></td>
                    <td data-label="Quantidade"><input type="number" value="${produto.quant}"></td>
                    <td data-label="Descrição"><input type="text" value="${produto.descricao}"></td>
                    <td data-label="Preço"><input type="number" value="${produto.preco}" step="0.01"></td>
                    <td data-label="Ações">
                    <button class="edit" data-id="${produto.idProduto}">Alterar</button>
                        <button class="delete" data-id="${produto.idProduto}">Excluir</button>
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
                const tr = botao.parentElement.parentElement;
             
                const inputs = tr.querySelectorAll('input');
                const token = localStorage.getItem('token');
                const novoNome = inputs[0].value;
                const novaQuantidade = inputs[1].value;
                const novaDescricao = inputs[2].value;
                const novoPreco = inputs[3].value;
                const idProduto = botao.getAttribute('data-id')
                try {
                    
                    const response = await fetch(`${endpointAlterarProduto}/${idProduto}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`,
                            'ngrok-skip-browser-warning': 'true'
                        },
                        body: JSON.stringify({
                            nome: novoNome,
                            quant: novaQuantidade,
                            descricao: novaDescricao,
                            preco: novoPreco
                        })
                    });
                        console.log(idProduto);
                    if (response.ok) {
                        exibirProdutos();
                        console.log('Produto editado com sucesso!');
                    } else {
                        throw new Error('Erro ao editar o produto');
                    }
                } catch (error) {
                    console.error('Erro ao editar o produto:', error);
                }
            });
        });

        botoesExcluir.forEach(botao => {
            botao.addEventListener('click', async function() {
                const idProduto = botao.getAttribute('data-id')
                if (confirm('Tem certeza que deseja excluir o produto?')) {
                    try {
                        const response = await fetch(`${endpointDeletarProduto}/${idProduto}`, {
                            method: 'DELETE'
                        });

                        if (response.ok) {
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

    exibirProdutos();
});