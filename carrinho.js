document.addEventListener('DOMContentLoaded', async function() {
    const endpointBuscarCarrinho = 'http://localhost:8080/api/carrinhos/adcionarProduto'; // Substitua pelo endpoint correto

    async function buscarCarrinho() {
        try {
            const response = await fetch(endpointBuscarCarrinho, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'ngrok-skip-browser-warning': 'true'
                }
            });
            
            if (!response.ok) {
                throw new Error('Erro ao buscar carrinho');
            }

            const carrinho = await response.json();
            return carrinho;
        } catch (error) {
            console.error('Erro ao buscar carrinho:', error);
        }
    }

    async function exibirCarrinho() {
        const tbody = document.getElementById('carrinho-table-body');
        const totalValue = document.getElementById('total-value');
        
        const carrinho = await buscarCarrinho();
        
        if (carrinho) {
            tbody.innerHTML = '';
            totalValue.textContent = `R$ ${carrinho.total.toFixed(2)}`;

            carrinho.produtos.forEach(produto => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${produto.nome}</td>
                    <td>R$ ${produto.preco.toFixed(2)}</td>
                    <td>
                        <button class="remove" data-id="${produto.idProduto}">Remover</button>
                    </td>
                `;
                tbody.appendChild(tr);
            });

            configurarBotoes();
        }
    }

    function configurarBotoes() {
        const botoesRemover = document.querySelectorAll('.remove');
        
        botoesRemover.forEach(botao => {
            botao.addEventListener('click', async function() {
                const produtoId = botao.getAttribute('data-id');
                
                try {
                    const response = await fetch(`http://localhost:8080/api/carrinhos/remover-produto/${produtoId}`, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json',
                            'ngrok-skip-browser-warning': 'true'
                        }
                    });

                    if (response.ok) {
                        exibirCarrinho();
                        console.log('Produto removido do carrinho com sucesso!');
                    } else {
                        throw new Error('Erro ao remover produto do carrinho');
                    }
                } catch (error) {
                    console.error('Erro ao remover produto do carrinho:', error);
                }
            });
        });
    }
    document.addEventListener('DOMContentLoaded', function() {
        const removeButtons = document.querySelectorAll('.remove');
        const plusButtons = document.querySelectorAll('.bx-plus');
        const minusButtons = document.querySelectorAll('.bx-minus');
 
        removeButtons.forEach(button => {
          button.addEventListener('click', function() {
            const item = button.closest('tr');
            item.remove();
            calcularTotal();
          });
        });

        plusButtons.forEach(button => {
          button.addEventListener('click', function() {
            const qtyElement = button.parentElement.querySelector('span');
            let qty = parseInt(qtyElement.textContent);
            qty++;
            qtyElement.textContent = qty;
            calcularTotal();
          });
        });

        minusButtons.forEach(button => {
          button.addEventListener('click', function() {
            const qtyElement = button.parentElement.querySelector('span');
            let qty = parseInt(qtyElement.textContent);
            if (qty > 1) {
              qty--;
              qtyElement.textContent = qty;
              calcularTotal();
            }
          });
        });
      
        function calcularTotal() {
          const produtos = document.querySelectorAll('tbody tr');
          let total = 0;
      
          produtos.forEach(produto => {
            const preco = parseFloat(produto.querySelector('td:nth-child(4)').textContent.slice(3));
            const quantidade = parseInt(produto.querySelector('.qty span').textContent);
            total += preco * quantidade;
          });
      
          const totalElement = document.querySelector('.summary footer span:last-child');
          totalElement.textContent = `R$ ${total.toFixed(2)}`;
        }
      });
      

    exibirCarrinho();
});