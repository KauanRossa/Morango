document.addEventListener('DOMContentLoaded', async function() {
    const endpointBuscarProdutos = 'https://33d6-189-28-184-55.ngrok-free.app/api/produto/buscar-produtos';
    const endpointAlterarProduto = 'https://33d6-189-28-184-55.ngrok-free.app/api/produto';

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
        const tbody = document.getElementById('produtos-table-body');
        const produtos = await buscarProdutos();
        if (produtos) {
            tbody.innerHTML = '';
            produtos.forEach(produto => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td data-label="Nome do Produto"><input type="text" value="${produto.nome}"></td>
                    <td data-label="Quantidade"><input type="number" value="${produto.quantidade}"></td>
                    <td data-label="Descrição"><input type="text" value="${produto.descricao}"></td>
                    <td data-label="Preço"><input type="number" value="${produto.preco}" step="0.01"></td>
                    <td data-label="Ações">
                        <button class="edit">Editar</button>
                        <button class="delete">Excluir</button>
                    </td>
                `;
                tr.setAttribute('data-id', produto.id);
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
                const idProduto = tr.getAttribute('data-id');
                const inputs = tr.querySelectorAll('input');

                const novoNome = inputs[0].value;
                const novaQuantidade = inputs[1].value;
                const novaDescricao = inputs[2].value;
                const novoPreco = inputs[3].value;

                try {
                    const response = await fetch(`${endpointAlterarProduto}/${idProduto}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                            'ngrok-skip-browser-warning': 'true'
                        },
                        body: JSON.stringify({
                            nome: novoNome,
                            quantidade: novaQuantidade,
                            descricao: novaDescricao,
                            preco: novoPreco
                        })
                    });

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
                const idProduto = botao.parentElement.parentElement.getAttribute('data-id');
                if (confirm('Tem certeza que deseja excluir o produto?')) {
                    try {
                        const response = await fetch(`${endpointAlterarProduto}/${idProduto}`, {
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
