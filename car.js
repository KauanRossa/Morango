// car.js

async function adicionarAoCarrinho(produtoId) {
    const token = localStorage.getItem('token');

    try {
        const response = await fetch(`https://seu-backend.com/api/carrinhos/adcionarProduto`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                produtoId: produtoId // Envie o ID do produto para ser adicionado ao carrinho
                // Outros dados necessários para adicionar o produto ao carrinho, se necessário
            })
        });

        if (response.ok) {
            // Produto adicionado com sucesso, redirecionar para a página do carrinho
            window.location.href = './carrinho.html';
        } else {
            throw new Error('Erro ao adicionar o produto ao carrinho');
        }
    } catch (error) {
        console.error('Erro ao adicionar o produto ao carrinho:', error);
    }
}
