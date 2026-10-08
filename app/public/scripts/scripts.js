const produtos = [

    {
        id: 1,
        vendedor: "Pet Center",
        title: "Ração Golden Adulto 15kg",
        price: 119.90,
        categoria: "Ração",
        image: "./imagem/1.webp",
        estoque: 20,
        discount: 15
    },

    {
        id: 2,
        vendedor: "Pet Center",
        title: "Brinquedo Mordedor",
        price: 4.90,
        categoria: "Brinquedos",
        image: "./imagem/2.webp",
        estoque: 15,
        discount: 8
    },

    {
        id: 3,
        vendedor: "Mundo Pet",
        title: "Coleira Ajustável Preto",
        price: 29.90,
        categoria: "Acessórios",
        image: "./imagem/coleira.webp",
        estoque: 10,
        discount: 10
    },

    {
        id: 4,
        vendedor: "Pet Feliz",
        title: "Shampoo para Cães 500ml",
        price: 18.50,
        categoria: "Higiene",
        image: "./imagem/shampoo.webp",
        estoque: 25,
        discount: 5
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
        estoque: 10,
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
        title: "Banheira para Calopsitas",
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
        title: "Brinquedos para Calopsitas",
        price: 18.25,
        categoria: "Brinquedos",
        image: "./imagem/brinquedosparacalopsita.webp",
        estoque: 10,
        discount: 20
    }

];


// ============================================================
// FORMATAR PREÇO
// ============================================================

function formatPrice(price) {

    return Number(price).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });

}


// ============================================================
// NORMALIZAR TEXTO
// ============================================================
// Isso permite:
//
// "racao" encontrar "Ração"
// "RAÇÃO" encontrar "Ração"
// "calopsita" encontrar "Calopsitas"
// ============================================================

function normalizarTexto(texto) {

    return String(texto)
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .trim();

}


// ============================================================
// CRIAR CARD DO PRODUTO
// ============================================================

function criarProdutosCard(produto) {

    return `
        <article class="produtos-card">

            <img
                src="${produto.image}"
                alt="${produto.title}"
                class="produtos-image"
                loading="lazy"
            >

            <div class="produtos-vendedor">
                ${produto.vendedor}
            </div>

            <h3 class="produtos-title">
                ${produto.title}
            </h3>

            <div class="produtos-price">
                ${formatPrice(produto.price)}
            </div>

            <div class="produtos-discount">
                ${produto.discount}% OFF
            </div>

        </article>
    `;

}


// ============================================================
// RENDERIZAR PRODUTOS
// ============================================================

function renderProdutos(lista) {

    const grid = document.getElementById("productsGrid");


    if (!grid) {

        console.error(
            "ERRO: elemento #productsGrid não encontrado."
        );

        return;
    }


    // ========================================================
    // NENHUM RESULTADO
    // ========================================================

    if (lista.length === 0) {

        grid.innerHTML = `
            <section class="sem-resultados">

                <i class="fa-solid fa-paw"></i>

                <h2>
                    Nenhum produto encontrado
                </h2>


            </section>
        `;

        return;
    }


    // ========================================================
    // MOSTRAR PRODUTOS
    // ========================================================

    grid.innerHTML = lista
        .map(produto => criarProdutosCard(produto))
        .join("");

}


// ============================================================
// PESQUISAR PRODUTOS
// ============================================================

function pesquisarProdutos() {

    const searchInput =
        document.getElementById("searchInput");


    if (!searchInput) {

        console.error(
            "ERRO: elemento #searchInput não encontrado."
        );

        return;
    }


    // Texto digitado

    const pesquisa =
        normalizarTexto(searchInput.value);


    console.log(
        "Pesquisa:",
        pesquisa
    );


    // ========================================================
    // PESQUISA VAZIA
    // ========================================================

    if (pesquisa === "") {

        renderProdutos(produtos);

        return;
    }


    // ========================================================
    // FILTRAR PRODUTOS
    // ========================================================

    const resultados = produtos.filter(produto => {

        const titulo =
            normalizarTexto(produto.title);

        const vendedor =
            normalizarTexto(produto.vendedor);

        const categoria =
            normalizarTexto(produto.categoria);


        return (

            titulo.includes(pesquisa) ||

            vendedor.includes(pesquisa) ||

            categoria.includes(pesquisa)

        );

    });


    console.log(
        "Produtos encontrados:",
        resultados.length
    );


    // Mostrar resultado

    renderProdutos(resultados);

}


// ============================================================
// MENU MOBILE
// ============================================================

function iniciarMenuMobile() {

    const menuBtn =
        document.getElementById("menu-btn");

    const mobileMenu =
        document.getElementById("mobile-menu");


    if (!menuBtn || !mobileMenu) {

        console.log(
            "Menu mobile não encontrado."
        );

        return;
    }


    const icon =
        menuBtn.querySelector("i");


    // ========================================================
    // ABRIR / FECHAR
    // ========================================================

    menuBtn.addEventListener("click", () => {

        const aberto =
            mobileMenu.classList.toggle("active");


        menuBtn.setAttribute(
            "aria-expanded",
            aberto
        );


        mobileMenu.setAttribute(
            "aria-hidden",
            !aberto
        );


        if (icon) {

            if (aberto) {

                icon.classList.remove(
                    "fa-bars"
                );

                icon.classList.add(
                    "fa-xmark"
                );

            } else {

                icon.classList.remove(
                    "fa-xmark"
                );

                icon.classList.add(
                    "fa-bars"
                );

            }

        }

    });


    // ========================================================
    // FECHAR AO CLICAR EM UM LINK
    // ========================================================

    const links =
        mobileMenu.querySelectorAll("a");


    links.forEach(link => {

        link.addEventListener("click", () => {

            mobileMenu.classList.remove(
                "active"
            );


            menuBtn.setAttribute(
                "aria-expanded",
                "false"
            );


            mobileMenu.setAttribute(
                "aria-hidden",
                "true"
            );


            if (icon) {

                icon.classList.remove(
                    "fa-xmark"
                );

                icon.classList.add(
                    "fa-bars"
                );

            }

        });

    });

}


// ============================================================
// SISTEMA DE PESQUISA
// ============================================================

function iniciarPesquisa() {

    const searchInput =
        document.getElementById("searchInput");


    /*
     * Seu header possui:
     *
     * <form class="search-container">
     *
     * Por isso NÃO procuramos por #searchBtn.
     *
     * Pegamos diretamente o formulário.
     */

    const searchForm =
        document.querySelector(
            ".search-container"
        );


    // ========================================================
    // VERIFICAR INPUT
    // ========================================================

    if (!searchInput) {

        console.error(
            "ERRO: #searchInput não encontrado."
        );

        return;
    }


    // ========================================================
    // PESQUISAR ENQUANTO DIGITA
    // ========================================================

    searchInput.addEventListener(
        "input",
        () => {

            pesquisarProdutos();

        }
    );


    // ========================================================
    // CLICAR NA LUPA
    // ========================================================

    if (searchForm) {

        searchForm.addEventListener(
            "submit",
            (event) => {

                /*
                 * IMPORTANTE:
                 *
                 * Impede o formulário de
                 * recarregar a página.
                 */

                event.preventDefault();


                pesquisarProdutos();

            }
        );

    }


    // ========================================================
    // ENTER
    // ========================================================

    searchInput.addEventListener(
        "keydown",
        (event) => {

            if (event.key === "Enter") {

                event.preventDefault();

                pesquisarProdutos();

            }

        }
    );

}


// ============================================================
// INICIALIZAÇÃO
// ============================================================

document.addEventListener(
    "DOMContentLoaded",
    () => {

        console.log(
            "DOM carregado."
        );


        // ====================================================
        // MOSTRAR TODOS OS PRODUTOS
        // ====================================================

        renderProdutos(produtos);


        // ====================================================
        // INICIAR PESQUISA
        // ====================================================

        iniciarPesquisa();


        // ====================================================
        // INICIAR MENU MOBILE
        // ====================================================

        iniciarMenuMobile();


        console.log(
            "PetSpace iniciado com sucesso!"
        );

    }
);