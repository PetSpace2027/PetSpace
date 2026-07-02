const produtos = [
    {
        id: 1,
        vendedor: "Pet Center",
        title: "Ração Golden Adulto 15kg",
        price: 119.90,
        categoria: "Ração",
        image: "./imagem/1.webp",
        estoque: 20,
        discount:15
    },
    {
        id: 2,
        vendedor: "Pet Center",
        title: "Brinquedo Mordedor ",
        price: 4.90,
        categoria: "Brinquedos",
        image: "./imagem/2.jpg",
        estoque: 15,
        discount:8
    },
    {
        id: 3,
        vendedor: "Mundo Pet",
        title: "Coleira Ajustável preto",
        price: 29.90,
        categoria: "Acessórios",
        image: "./imagem/coleira.webp",
        estoque: 10,
         discount:10
    },
    {
        id: 4,
        vendedor: "Pet Feliz",
        title: "Shampoo para Cães 500ml",
        price: 18.50,
        categoria: "Higiene",
        image: "./imagem/shampoo.webp",
        estoque: 25,
         discount:5
    },
    {
    id: 5,
    vendedor: "Pet Center",
    title: "Ração Premier Raças Pequenas 10kg",
    price: 159.90,
    categoria: "Ração",
    image: "./imagem/racaopequenas.webp",
    estoque: 12,
    discount: 12
},
{
    id: 6,
    vendedor: "Mundo Pet",
    title: "Cama Pet Conforto G",
    price: 79.90,
    categoria: "Camas",
    image: "./imagem/camaG.jpg",
    estoque: 8,
    discount: 10
},
{
    id: 7,
    vendedor: "Pet Feliz",
    title: "Comedouro Inox 500ml",
    price: 19.90,
    categoria: "Acessórios",
    image: "./imagem/comedouro.jpg",
    estoque: 20,
    discount: 5
},
{
    id: 8,
    vendedor: "Pet Center",
    title: "Bebedouro Automático Azul",
    price: 34.90,
    categoria: "Acessórios",
    image: "./imagem/bebedouro.webp",
    estoque: 15,
    discount: 15
},
{
    id: 9,
    vendedor: "Mundo Pet",
    title: "Bolinha de Borracha para Cães",
    price: 9.90,
    categoria: "Brinquedos",
    image: "./imagem/bolinhas.jpg",
    estoque: 30,
    discount: 8
},
{
    id: 10,
    vendedor: "Pet Feliz",
    title: "Arranhador para Gatos",
    price: 69.90,
    categoria: "Brinquedos",
    image: "./imagem/arranhador-para-gatos.jpg",
    estoque: 10,
    discount: 20
},
{
    id: 11,
    vendedor: "Pet Center",
    title: "Areia Higiênica para Gatos 12kg",
    price: 42.90,
    categoria: "Higiene",
    image: "./imagem/areia.webp",
    discount: 10
},
{
    id: 12,
    vendedor: "Mundo Pet",
    title: "Tapete Higiênico 30 Unidades",
    price: 49.90,
    categoria: "Higiene",
    image: "./imagem/tapete.webp",
    estoque: 18,
    discount: 15
},
{
    id: 13,
    vendedor: "Pet Feliz",
    title: "Banheira Para Calopsitas",
    price: 39.90,
    categoria: "Acessórios",
    image: "./imagem/banheiradecalopsita.jpg",
    estoque: 14,
    discount: 10
},
{
    id: 14,
    vendedor: "Pet Center",
    title: "Petisco Bifinho Sabor Carne",
    price: 12.90,
    categoria: "Petiscos",
    image: "./imagem/bifinho.jpg",
    estoque: 40,
    discount: 5
},
{
    id: 16,
    vendedor: "Pet Feliz",
    title: "Escova Removedora de Pelos",
    price: 24.90,
    categoria: "Higiene",
    image: "./imagem/escovadepelos.webp",
    estoque: 16,
    discount: 12
},
{
    id: 17,
    vendedor: "Pet Center",
    title: "Brinquedos Para Calopsitas",
    price: 18.25,
    categoria: "Brinquedos",
    image: "./imagem/brinquedosparacalopsita.webp",
    estoque: 10,
    discount: 20
}
];

//criar os cards / create

//colocar eles na tela / render

function formatPrice(price) {

    return price.toLocaleString('pt-BR',{ style: 'currency', currency: 'BRL'})

}



function criarProdutosCard(produtos) {
    

    return ` 
   <article class="produtos-card">
       <img src="${produtos.image}" alt="${produtos.title}" class="produtos-image">
                <article class="produtos-vendedor"> ${produtos.vendedor} </article>
        <h3 class="produtos-title"> ${produtos.title}</h3>
        <article class="produtos-price"> ${ formatPrice(produtos.price)} </article>
        <article class="produtos-discount"> ${produtos.discount}%OFF</article>




    </article>
    `
} 
function renderProdutos(produtos) {
    const grid = document.getElementById('productsGrid')
    grid.innerHTML = produtos.map(criarProdutosCard).join('')
//innerhtml => injetar colocar algo no html
//map => mapeia o produto por produto
//join => join junta td mundo
    
}

function searchProducts() {
    const searchInput = document
        .getElementById('searchInput')
        .value
        .toLowerCase();

    const filteredProducts = produtos.filter(produto =>
        produto.title.toLowerCase().includes(searchInput)
    );

    renderProdutos(filteredProducts);
}

//includes verifica se o txt passa no parametro
//filter filtra oque eu passar pra ele
//EventListener -ouvinte de eventos,ficade olho tudo que acontece por la no html
//DOM -Arvore de elementos do navegador| content loaded , quando a 
// pagina terminar de carregar

document.addEventListener('DOMContentLoaded', () => {
    renderProdutos(produtos);

    document
        .getElementById('searchBtn')
        .addEventListener('click', searchProducts);
});

/* <% if (!usuario) { %>

    <%- include("../partials/header-index") %>

<% } else if (usuario.premium) { %>

    <%- include("../partials/header-premium") %>

<% } else { %>

    <%- include("../partials/header-logado") %>

<% } %>


<header>
  <div class="container">
    <a href="/" class="logo">
      <i class="fa-solid fa-paw logo-icon"></i>
      <span class="logo-text">PetSpice</span>
    </a>

    <form class="search-container">
      <input type="search" class="search-input" placeholder="O que você procura?">
      <button class="search-btn" type="submit">
        <i class="fa-solid fa-magnifying-glass"></i>
      </button>
    </form>

    <nav>
      <ul>
        <li><a href="/">Início</a></li>
        <li><a href="#produtos" class="linkproduto">Produtos</a></li>
        <li><a href="/contato">Contato</a></li>
      </ul>
    </nav>

    <div class="nav-buttons">
      <a href="/login" class="btn-login">Entrar</a>
      <a href="/petguardioes" class="btn-pro"><i class="fa-solid fa-crown"></i> PetGuardião PRO</a>
    </div>
  </div>
</header> */