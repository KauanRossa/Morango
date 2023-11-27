async function adicionarProdutoAoCarrinho(produtoId) {
    try {
        const token = localStorage.getItem('token');
       
        const response = await fetch('http://localhost:8080/api/carrinhos/adicionar-produto', {
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

        alert('Produto adicionado ao carrinho com sucesso!');

    } catch (error) {
        console.error('Erro ao adicionar produto ao carrinho:', error);
    }
}

async function obterDetalhesCarrinho() {
    try {
        const token = localStorage.getItem('token');
      
        const response = await fetch('http://localhost:8080/api/carrinhos/mostrar-carrinho', {
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

            let totalProduto = produto.preco * produto.quantidade; 

            const tdTotal = document.createElement('td');
            tdTotal.textContent = `R$ ${totalProduto}`;
            tr.appendChild(tdTotal);

            subTotal += totalProduto;

            tbody.appendChild(tr);
            const tdExcluir = document.createElement('td');
            const btnExcluir = document.createElement('button');
            btnExcluir.textContent = 'Excluir';
            btnExcluir.classList.add('excluir-produto');
            tdExcluir.appendChild(btnExcluir);
            tr.appendChild(tdExcluir);
            btnExcluir.setAttribute('data-product-id', produto.idProduto);
            const increaseQuantity = async () => {
                try {
                    const response = await fetch('http://localhost:8080/api/carrinhos/aumentar-quantidade', {
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
                        const response = await fetch('http://localhost:8080/api/carrinhos/diminuir-quantidade', {
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
            return; 
        }

        const response = await fetch(`http://localhost:8080/api/carrinho-produto/${produtoId}`, {
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

        window.location.reload();

    } catch (error) {
        console.error('Erro ao excluir o produto:', error);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    preencherCarrinho(); 

    document.querySelectorAll('.excluir-produto').forEach(btn => {
        btn.addEventListener('click', async (event) => {
            console.log('Botão de exclusão clicado');

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

function calcularTotal() {
    const produtosRows = document.querySelectorAll('#produtos tr');
    let total = 0;
  
    produtosRows.forEach(row => {
      const precoProduto = parseFloat(row.querySelector('td:nth-child(2)').textContent.replace('R$ ', ''));
      const quantidadeProduto = parseInt(row.querySelector('.qty span').textContent);
      total += precoProduto * quantidadeProduto;
    });
  
    return total.toFixed(2);
  }
  
  function enviarDetalhesWhatsApp() {
    const produtosDetalhes = [];
    const produtosRows = document.querySelectorAll('#produtos tr');
  
    produtosRows.forEach(row => {
      const nomeProduto = row.querySelector('.name').textContent;
      const precoProduto = row.querySelector('td:nth-child(2)').textContent.replace('R$ ', '');
      const quantidadeProduto = row.querySelector('.qty span').textContent;
      produtosDetalhes.push({ nome: nomeProduto, preco: precoProduto, quantidade: quantidadeProduto });
    });
  
    let mensagemProdutos = 'Detalhes da Compra:%0A';
  
    produtosDetalhes.forEach(produto => {
      mensagemProdutos += `Nome: ${produto.nome}%0APreço: R$ ${produto.preco}%0AQuantidade: ${produto.quantidade}%0A%0A`;
    });
  
    const totalCompra = calcularTotal();
  
    const mensagemFinal =
      `Olá! Segue a lista de produtos no carrinho:%0A%0A${mensagemProdutos}%0ATotal da Compra: R$ ${totalCompra}.`;
  
    window.open(`https://wa.me/5548991651183?text=${mensagemFinal}`, '_blank');
  }

document.addEventListener('DOMContentLoaded', preencherCarrinho);