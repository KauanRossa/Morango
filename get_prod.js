async function carregarProdutos() {
    try {
        const response = await fetch('http://localhost:8080/api/produtos/buscar-todos', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'ngrok-skip-browser-warning': 'true'
            }
        });

        if (!response.ok) {
            throw new Error('Erro ao carregar os produtos');
        }

        const produtos = await response.json();
        const produtosContainer = document.getElementById('produtos-container');

        produtosContainer.innerHTML = '';

        const produtosFlexContainer = document.createElement('div');
        produtosFlexContainer.classList.add('produtos-flex');
        produtosContainer.appendChild(produtosFlexContainer);

        produtos.forEach(produto => {
            const produtoElement = document.createElement('div');
            produtoElement.classList.add('produto');

            const imagemProduto = document.createElement('img');
            imagemProduto.src = "https://images.unsplash.com/photo-1637916997616-c7002699b86a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fG1vcmFuZ28lMjBjYWl4YXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60";
            produtoElement.appendChild(imagemProduto);

            const nomeElement = document.createElement('h2');
            nomeElement.textContent = produto.nome;
            produtoElement.appendChild(nomeElement);

            const precoElement = document.createElement('h3');
            precoElement.innerHTML = `<strong>R$</strong>${produto.preco.toFixed(2)}`;
            produtoElement.appendChild(precoElement);

            const descricaoElement = document.createElement('p');
            descricaoElement.textContent = produto.descricao;
            produtoElement.appendChild(descricaoElement);

            const botaoComprar = document.createElement('button');
            botaoComprar.textContent = 'Comprar';
            produtoElement.appendChild(botaoComprar);

            botaoComprar.addEventListener('click', function() {
                if (estaLogado()) {
                    const nomeProdutoSelecionado = produto.nome;
                    const valorProdutoSelecionado = produto.preco;
                    exibirPopup();
                    preencherDetalhesProduto(nomeProdutoSelecionado, valorProdutoSelecionado);
                    adicionarAoCarrinho(nome, preco);
                } else {
                    window.location.href = 'login.html';
                    alert('Faça o cadastro para efetuar a compra');
                }
            });

            function estaLogado() {
                const token = localStorage.getItem('token');
                return !!token;
            }

            produtosFlexContainer.appendChild(produtoElement);
        });
    } catch (error) {
        console.error('Erro ao carregar os produtos:', error);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    carregarProdutos();
});

function exibirPopup() {
    var popup = document.getElementById('popup');
    popup.style.display = 'flex';
}

function preencherDetalhesProduto(nome, valor) {
    const nomeProdutoElement = document.getElementById('nomeProduto');
    nomeProdutoElement.textContent = nome;

    const valorProdutoElement = document.getElementById('valorProduto');
    valorProdutoElement.textContent = `Valor unitário: R$ ${valor.toFixed(2)}`;

    const quantidadeInput = document.getElementById('quantidadeProduto');
    quantidadeInput.addEventListener('input', calcularValorTotal);

    calcularValorTotal();
}

function calcularValorTotal() {
    const valorUnitario = parseFloat(document.getElementById('valorProduto').textContent.split(' ')[2]);
    const quantidade = parseInt(document.getElementById('quantidadeProduto').value);
    const valorTotal = valorUnitario * quantidade;

    const valorTotalElement = document.getElementById('valorTotalProduto');
    valorTotalElement.textContent = `Valor total: R$ ${valorTotal.toFixed(2)}`;
}

function finalizarCompra() {
    const nomeProduto = document.getElementById('nomeProduto').textContent;
    const valorUnitario = parseFloat(document.getElementById('valorProduto').textContent.split(' ')[2]);
    const quantidade = parseInt(document.getElementById('quantidadeProduto').value);
    const valorTotal = valorUnitario * quantidade;

    const enderecoRua = document.getElementById('enderecoRua').value;
    const enderecoBairro = document.getElementById('enderecoBairro').value;
    const enderecoCidade = document.getElementById('enderecoCidade').value;
    const numeroCasa = document.getElementById('numeroCasa').value;

    console.log(nomeProduto, valorTotal, enderecoRua, enderecoBairro, enderecoCidade, numeroCasa);

    fecharPopup();
}

function fecharPopup() {
    var popup = document.getElementById('popup');
    popup.style.display = 'none';
}