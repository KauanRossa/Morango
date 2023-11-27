async function adicionarProdutoAoCarrinho(produtoId) {
    try {
        const token = localStorage.getItem('token');
       
        const response = await fetch('https://e8dd-189-28-184-45.ngrok-free.app/api/carrinhos/adicionar-produto', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
                'ngrok-skip-browser-warning': 'true'
            },
            body: JSON.stringify({
                "idProduto": produtoId
            })
        });

        if (!response.ok) {
            throw new Error('Erro ao adicionar produto ao carrinho');
        }

        // Lógica adicional após adicionar o produto ao carrinho, se necessário
        alert('Produto adicionado ao carrinho com sucesso!');
        // Qualquer ação adicional após adicionar o produto ao carrinho

    } catch (error) {
        console.error('Erro ao adicionar produto ao carrinho:', error);
    }
}

async function obterDetalhesCarrinho() {
    try {
        const token = localStorage.getItem('token');
      
        const response = await fetch('https://e8dd-189-28-184-45.ngrok-free.app/api/carrinhos/mostrar-carrinho', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
                'ngrok-skip-browser-warning': 'true'
            }
        });

        if (!response.ok) {
            throw new Error('Erro ao obter detalhes do carrinho');
        }

        const carrinho = await response.json();
        // Processar detalhes do carrinho, se necessário
        return carrinho;

    } catch (error) {
        console.error('Erro ao obter detalhes do carrinho:', error);
        return null;
    }
}

async function preencherCarrinho() {
    try {
        const token = localStorage.getItem('token');
        const carrinho = await obterDetalhesCarrinho();
         
        if (!carrinho || !carrinho.produtos || carrinho.produtos.length === 0) {
            console.log('O carrinho está vazio');
            return;
        }
        
        const tbody = document.getElementById('produtos');
        let subTotal = 0;

        carrinho.produtos.forEach(produto => {
            const tr = document.createElement('tr');

            const tdNome = document.createElement('td');
            const divProduto = document.createElement('div');
            divProduto.classList.add('product');
            const divInfo = document.createElement('div');
            divInfo.classList.add('info');
            const divNome = document.createElement('div');
            divNome.classList.add('name');
            divNome.textContent = produto.nome;

            divInfo.appendChild(divNome);
            divProduto.appendChild(divInfo);
            tdNome.appendChild(divProduto);
            tr.appendChild(tdNome);

            const tdPreco = document.createElement('td');
            tdPreco.textContent = `R$ ${produto.preco}`;
            tr.appendChild(tdPreco);

            const tdQuantidade = document.createElement('td');
            tdQuantidade.innerHTML = `
                <div class="qty">
                    <button class="minus-btn"><i class="bx bx-minus"></i></button>
                    <span>${produto.quantidade}</span>
                    <button class="plus-btn"><i class="bx bx-plus"></i></button>
                </div>
            `;
            tr.appendChild(tdQuantidade);

            let totalProduto = produto.preco * produto.quantidade; // Declaração movida para cá

            const tdTotal = document.createElement('td');
            tdTotal.textContent = `R$ ${totalProduto}`;
            tr.appendChild(tdTotal);

            subTotal += totalProduto;

            tbody.appendChild(tr);
            const tdExcluir = document.createElement('td');
            const btnExcluir = document.createElement('button');
            btnExcluir.textContent = 'Excluir';
            btnExcluir.classList.add('excluir-produto'); // Adicionando classe para identificação
            tdExcluir.appendChild(btnExcluir);
            tr.appendChild(tdExcluir);
            btnExcluir.setAttribute('data-product-id', produto.idProduto);
            const increaseQuantity = async () => {
                try {
                    const response = await fetch('https://e8dd-189-28-184-45.ngrok-free.app/api/carrinhos/aumentar-quantidade', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`,
                            'ngrok-skip-browser-warning': 'true'
                        },
                        body: JSON.stringify({
                            "idProduto": produto.idProduto,
                            "quantidade": 1
                        })
                    });

                    if (!response.ok) {
                        throw new Error('Erro ao aumentar a quantidade do produto');
                    }
                    window.location.reload();
                } catch (error) {
                    console.error('Erro ao aumentar a quantidade:', error);
                }
            };

            const decreaseQuantity = async () => {
                try {
                    if (produto.quantidade >= 1) {
                        const response = await fetch('https://e8dd-189-28-184-45.ngrok-free.app/api/carrinhos/diminuir-quantidade', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${token}`,
                                'ngrok-skip-browser-warning': 'true'
                            },
                            body: JSON.stringify({
                                "idProduto": produto.idProduto,
                                "quantidade": 1
                            })
                        });

                        if (!response.ok) {
                            throw new Error('Erro ao diminuir a quantidade do produto');
                        }
                        window.location.reload();
                    }

                } catch (error) {
                    console.error('Erro ao diminuir a quantidade:', error);
                }
            };

            tdQuantidade.querySelector('.plus-btn').addEventListener('click', increaseQuantity);
            tdQuantidade.querySelector('.minus-btn').addEventListener('click', decreaseQuantity);
        });

        const subtotalElement = document.querySelector('.summary .info div:nth-child(1) span:nth-child(2)');
        subtotalElement.textContent = `R$ ${subTotal}`;

        const totalElement = document.querySelector('.summary footer span:nth-child(2)');
        totalElement.textContent = `R$ ${carrinho.total}`;
        
async function excluirProdutoDoCarrinho(produtoId) {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            window.location.href = 'login.html';
            alert('Faça o cadastro para efetuar a compra');
            return; // Retorna caso não haja token
        }

        const response = await fetch(`https://e8dd-189-28-184-45.ngrok-free.app/api/carrinho-produto/${produtoId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
                'ngrok-skip-browser-warning': 'true'
            }
        });

        if (!response.ok) {
            throw new Error('Erro ao excluir o produto do carrinho');
        }

        // Atualizar a página após a exclusão
        window.location.reload();

    } catch (error) {
        console.error('Erro ao excluir o produto:', error);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    preencherCarrinho(); // Chama a função para preencher o carrinho

    document.querySelectorAll('.excluir-produto').forEach(btn => {
        btn.addEventListener('click', async (event) => {
            console.log('Botão de exclusão clicado'); // Verifica se o evento está sendo acionado

            const idProduto = event.target.dataset.productId; 
            console.log('ID do Produto:', idProduto); 

            if (idProduto) {
                await excluirProdutoDoCarrinho(idProduto);
            }
        });
    });
});
    } catch (error) {
        console.error('Erro ao preencher o carrinho:', error);
    }
}

document.addEventListener('DOMContentLoaded', preencherCarrinho);
