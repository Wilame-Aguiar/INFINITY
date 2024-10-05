const apiKey = 'asat_fee1aee109c64cb5936deb76b3eaac15';
const baseUrl = 'https://fakestoreapi.com/products';

const fetchProducts = async (query = '') => {
    try {
        const response = await fetch(baseUrl);
        if (!response.ok) throw new Error('Erro ao buscar produtos');
        
        const data = await response.json();
        const filteredData = query
            ? data.filter(product => product.title.toLowerCase().includes(query.toLowerCase()))
            : data;

        if (query && filteredData.length === 0) {
            showError('Nenhum item encontrado.');
            setTimeout(() => {
                location.reload();
            }, 3000);
        } else {
            displayProducts(filteredData);
        }
    } catch (error) {
        console.error('Erro ao buscar produtos:', error);
        showError('Ocorreu um erro ao carregar os produtos. Tente novamente mais tarde.');
    }
};

const displayProducts = (products) => {
    const productList = document.querySelector('#product-list');
    productList.innerHTML = '';
    products.forEach(product => {
        const productElement = `
            <div class="product">
                <img src="${product.image}" alt="${product.title}" style="max-width: 100%; height: auto;">
                <h3>${product.title}</h3>
                <p>${product.description}</p>
                <p><strong>Preço:</strong> R$${product.price}</p>
                <input type="number" id="quantity-${product.id}" value="1" min="1" max="10">
                <button onclick="addToCart(${product.id}, '${product.title}', ${product.price}); viewCartAfterAdd();">Adicionar ao Carrinho</button>
            </div>
        `;
        productList.innerHTML += productElement;
    });
};

const showError = (message) => {
    const errorElement = document.createElement('div');
    errorElement.textContent = message;
    errorElement.style.backgroundColor = '#ffcccc';
    errorElement.style.color = '#ff0000';
    errorElement.style.padding = '10px';
    errorElement.style.margin = '10px 0';
    document.body.prepend(errorElement);
    setTimeout(() => {
        errorElement.remove();
    }, 3000);
};

let cart = JSON.parse(localStorage.getItem('cart')) || [];
let users = JSON.parse(localStorage.getItem('users')) || [];

const addToCart = (id, title, price) => {
    const quantityInput = document.querySelector(`#quantity-${id}`);
    const quantity = parseInt(quantityInput.value);
    
    const itemIndex = cart.findIndex(item => item.id === id);
    if (itemIndex > -1) {
        cart[itemIndex].quantity += quantity;
    } else {
        cart.push({ id, title, price, quantity });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
};

const viewCartAfterAdd = () => {
    viewCart();
};

const viewCart = () => {
    const cartSummary = document.querySelector('#cart-summary');
    const cartItems = document.querySelector('#cart-items');
    const cartTotal = document.querySelector('#cart-total');
    cartSummary.style.display = 'block';
    cartItems.innerHTML = '';

    let total = 0;
    cart.forEach(item => {
        const itemTotal = item.quantity * item.price;
        total += itemTotal;
        const cartItem = `
            <li>
                ${item.title} - Quantidade: ${item.quantity} - Preço Unitário: R$${item.price} 
                - Total: R$${itemTotal.toFixed(2)}
            </li>
        `;
        cartItems.innerHTML += cartItem;
    });

    cartTotal.textContent = `Total do Carrinho: R$${total.toFixed(2)}`;
};

const clearCart = () => {
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    viewCart();
};

const removeFromCart = () => {
    let itemNames = cart.map(item => item.title).join(', ');
    let itemToRemove = prompt(`Qual item você deseja remover? Itens: ${itemNames}`);
    const itemIndex = cart.findIndex(item => item.title === itemToRemove);
    
    if (itemIndex > -1) {
        cart.splice(itemIndex, 1);
        alert(`${itemToRemove} foi removido do carrinho.`);
    } else {
        alert('Item não encontrado no carrinho.');
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    viewCart();
};

const checkout = () => {
    if (cart.length === 0) {
        alert('Você não pode finalizar a compra com o carrinho vazio.');
        return;
    }
    alert('Pedido confirmado! Você receberá uma notificação em breve.');
    clearCart();
};

const handleLogin = () => {
    const email = document.querySelector('#loginEmail').value;
    const password = document.querySelector('#loginPassword').value;
    const user = users.find(user => user.email === email && user.password === password);
    if (user) {
        alert('Login realizado com sucesso!');
        closeLoginModal();
    } else {
        alert('Usuário ou senha incorretos.');
    }
};

const handleRegister = () => {
    const email = document.querySelector('#registerEmail').value;
    const password = document.querySelector('#registerPassword').value;
    if (!users.some(user => user.email === email)) {
        users.push({ email, password });
        localStorage.setItem('users', JSON.stringify(users));
        alert('Cadastro realizado com sucesso!');
        closeRegisterModal();
    } else {
        alert('Usuário já cadastrado.');
    }
};

const handleForgotPassword = () => {
    const email = document.querySelector('#forgotEmail').value;
    const user = users.find(user => user.email === email);
    if (user) {
        alert('Link de recuperação de senha enviado para ' + email);
        closeForgotPasswordModal();
    } else {
        alert('Email não encontrado.');
    }
};

const closeLoginModal = () => {
    document.querySelector('#loginModal').style.display = 'none';
};

const closeRegisterModal = () => {
    document.querySelector('#registerModal').style.display = 'none';
};

const closeForgotPasswordModal = () => {
    document.querySelector('#forgotPasswordModal').style.display = 'none';
};

const closeCart = () => {
    document.querySelector('#cart-summary').style.display = 'none';
};

const backToTopBtn = document.querySelector('#backToTop');
window.addEventListener('scroll', () => {
    if (window.scrollY > 200) {
        backToTopBtn.style.display = 'block';
    } else {
        backToTopBtn.style.display = 'none';
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

document.querySelector('#searchBtn').addEventListener('click', () => {
    const query = document.querySelector('#searchInput').value;
    fetchProducts(query);
    document.querySelector('#searchInput').value = '';
});

document.querySelector('#searchInput').addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        document.querySelector('#searchBtn').click();
    }
});

document.querySelector('#btnViewCart').addEventListener('click', viewCart);
document.querySelector('#btnLogin').addEventListener('click', () => {
    document.querySelector('#loginModal').style.display = 'block';
});
document.querySelector('#btnRegister').addEventListener('click', () => {
    document.querySelector('#registerModal').style.display = 'block';
});
document.querySelector('#btnForgotPassword').addEventListener('click', () => {
    document.querySelector('#forgotPasswordModal').style.display = 'block';
});
document.querySelector('#clear-cart-btn').addEventListener('click', clearCart);
document.querySelector('#remove-item-btn').addEventListener('click', removeFromCart);
document.querySelector('#checkout-btn').addEventListener('click', checkout);
document.querySelector('#loginSubmit').addEventListener('click', handleLogin);
document.querySelector('#registerSubmit').addEventListener('click', handleRegister);
document.querySelector('#forgotSubmit').addEventListener('click', handleForgotPassword);
document.querySelector('#closeLoginModal').addEventListener('click', closeLoginModal);
document.querySelector('#closeRegisterModal').addEventListener('click', closeRegisterModal);
document.querySelector('#closeForgotPasswordModal').addEventListener('click', closeForgotPasswordModal);
document.querySelector('#closeCart').addEventListener('click', closeCart);

fetchProducts();
