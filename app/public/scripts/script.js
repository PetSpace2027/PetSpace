
// =====================================
// PETSPICE - JAVASCRIPT
// =====================================

const body = document.body;

const themeToggler = document.querySelector("#theme-toggler");

const menuBtn = document.querySelector("#menu-btn");

const closeBtn = document.querySelector("#close-btn");

const sidebar = document.querySelector("#sidebar-container");

const sidebarMenu = document.querySelector("#sidebar-menu");

const logoutBtn = document.querySelector("#logout-btn");

const dateInput = document.querySelector("#dashboard-date");


// =====================================
// 1. TEMA CLARO E ESCURO
// =====================================

const temaSalvo = localStorage.getItem("petspice-tema");

if (temaSalvo === "escuro") {
    body.classList.add("dark-theme");
}

if (themeToggler) {

    themeToggler.addEventListener("click", () => {

        body.classList.toggle("dark-theme");

        const temaAtual = body.classList.contains("dark-theme")
            ? "escuro"
            : "claro";

        localStorage.setItem("petspice-tema", temaAtual);

    });

}


// =====================================
// 2. ABRIR MENU
// =====================================

function abrirMenu() {

    if (!sidebar || !menuBtn) return;

    sidebar.classList.add("show");

    menuBtn.setAttribute("aria-expanded", "true");

    menuBtn.setAttribute("aria-label", "Fechar menu");

}


// =====================================
// 3. FECHAR MENU
// =====================================

function fecharMenu() {

    if (!sidebar || !menuBtn) return;

    sidebar.classList.remove("show");

    menuBtn.setAttribute("aria-expanded", "false");

    menuBtn.setAttribute("aria-label", "Abrir menu");

}


// =====================================
// 4. CLIQUE NO HAMBÚRGUER
// =====================================

if (menuBtn) {

    menuBtn.addEventListener("click", () => {

        const menuAberto = sidebar.classList.contains("show");

        if (menuAberto) {
            fecharMenu();
        } else {
            abrirMenu();
        }

    });

}


// =====================================
// 5. BOTÃO DE FECHAR
// =====================================

if (closeBtn) {

    closeBtn.addEventListener("click", fecharMenu);

}


// =====================================
// 6. FECHAR AO CLICAR EM UM LINK
// =====================================

if (sidebarMenu) {

    const linksMenu = sidebarMenu.querySelectorAll("a");

    linksMenu.forEach((link) => {

        link.addEventListener("click", fecharMenu);

    });

}


// =====================================
// 7. FECHAR COM A TECLA ESC
// =====================================

document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {
        fecharMenu();
    }

});


// =====================================
// 8. FECHAR AO VOLTAR PARA DESKTOP
// =====================================

window.addEventListener("resize", () => {

    if (window.innerWidth > 768) {
        fecharMenu();
    }

});


// =====================================
// 9. MARCAR PÁGINA ATUAL NO MENU
// =====================================

if (sidebarMenu) {

    const links = sidebarMenu.querySelectorAll("a[href]");

    const paginaAtual = window.location.pathname;

    links.forEach((link) => {

        const endereco = new URL(link.href).pathname;

        if (endereco === paginaAtual) {

            links.forEach((item) => {

                item.classList.remove("active");

                item.removeAttribute("aria-current");

            });

            link.classList.add("active");

            link.setAttribute("aria-current", "page");

        }

    });

}


// =====================================
// 10. PREENCHER DATA ATUAL
// =====================================

if (dateInput) {

    const hoje = new Date();

    const ano = hoje.getFullYear();

    const mes = String(hoje.getMonth() + 1).padStart(2, "0");

    const dia = String(hoje.getDate()).padStart(2, "0");

    dateInput.value = `${ano}-${mes}-${dia}`;

}


// =====================================
// 11. BOTÃO SAIR
// =====================================

if (logoutBtn) {

    logoutBtn.addEventListener("click", (event) => {

        event.preventDefault();

        alert(
            "A função de sair será conectada ao sistema de login quando integrarmos o projeto ao Node.js e Express."
        );

    });

}


// =====================================
// 12. ANIMAÇÃO DOS CARDS
// =====================================

const cards = document.querySelectorAll(".insights article");

cards.forEach((card, index) => {

    card.style.animationDelay = `${index * 0.15}s`;

});


// =====================================
// 13. INICIALIZAÇÃO
// =====================================

console.log("PetSpice Admin iniciado com sucesso! 🐾");

if (document.querySelector("#client-form")) {
/* =====================================
   PETSPICE - GERENCIAMENTO DE CLIENTES
===================================== */

/* ELEMENTOS DO HTML */

const clientForm = document.querySelector("#client-form");
const clientDialog = document.querySelector("#client-dialog");

const openFormButton = document.querySelector("#open-client-form");
const closeFormButton = document.querySelector("#close-client-form");
const cancelFormButton = document.querySelector("#cancel-client-form");

const dialogTitle = document.querySelector("#dialog-title");

const clientIdInput = document.querySelector("#client-id");
const clientNameInput = document.querySelector("#client-name");
const clientEmailInput = document.querySelector("#client-email");
const clientPhoneInput = document.querySelector("#client-phone");
const clientCityInput = document.querySelector("#client-city");
const clientAddressInput = document.querySelector("#client-address");

const clientsList = document.querySelector("#clients-list");
const searchInput = document.querySelector("#search-client");
const clearSearchButton = document.querySelector("#clear-search");

const totalClientsElement = document.querySelector("#total-clients");
const newClientsElement = document.querySelector("#new-clients");
const clientsCountElement = document.querySelector("#clients-count");
const emptyClientsElement = document.querySelector("#empty-clients");

const clientToast = document.querySelector("#client-toast");

/* =====================================
   ARMAZENAMENTO
===================================== */

const STORAGE_KEY = "petspice-clientes";

let clients = [];

try {
    const savedClients = localStorage.getItem(STORAGE_KEY);
    const parsedClients = savedClients ? JSON.parse(savedClients) : [];

    clients = Array.isArray(parsedClients) ? parsedClients : [];
} catch (error) {
    console.error("Erro ao carregar os clientes:", error);
    clients = [];
}

/* =====================================
   SALVAR CLIENTES
===================================== */

function saveClients() {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(clients));
        return true;
    } catch (error) {
        console.error("Erro ao salvar os clientes:", error);
        showToast("Não foi possível salvar os dados neste navegador.");
        return false;
    }
}

/* =====================================
   NOTIFICAÇÕES
===================================== */

let toastTimer;

function showToast(message) {
    clientToast.textContent = message;
    clientToast.classList.add("show");

    clearTimeout(toastTimer);

    toastTimer = setTimeout(() => {
        clientToast.classList.remove("show");
    }, 3000);
}

/* =====================================
   FORMATAÇÃO
===================================== */

function formatDate(date) {
    if (!date) return "—";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
        return "—";
    }

    return parsedDate.toLocaleDateString("pt-BR");
}

function getInitials(name) {
    return name
        .trim()
        .split(/\s+/)
        .slice(0, 2)
        .map(part => part[0].toUpperCase())
        .join("");
}

/* =====================================
   ATUALIZAR INDICADORES
===================================== */

function updateSummary() {
    totalClientsElement.textContent = clients.length;

    const now = new Date();

    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(now.getDate() - 30);

    const recentClients = clients.filter(client => {
        const createdAt = new Date(client.createdAt);

        return (
            !Number.isNaN(createdAt.getTime()) &&
            createdAt >= thirtyDaysAgo &&
            createdAt <= now
        );
    });

    newClientsElement.textContent = recentClients.length;
}

/* =====================================
   CRIAR BOTÃO DE AÇÃO
===================================== */

function createActionButton(icon, label, action, id, extraClass = "") {
    const button = document.createElement("button");

    button.type = "button";
    button.className = `client-action-btn ${extraClass}`;
    button.setAttribute("aria-label", label);
    button.title = label;
    button.dataset.action = action;
    button.dataset.id = id;

    const iconElement = document.createElement("span");

    iconElement.className = "material-symbols-outlined";
    iconElement.textContent = icon;

    button.appendChild(iconElement);

    return button;
}

/* =====================================
   EXIBIR CLIENTES
===================================== */

function renderClients() {
    clientsList.replaceChildren();

    const searchTerm = searchInput.value
        .trim()
        .toLowerCase();

    const filteredClients = clients.filter(client => {
        const name = (client.name || "").toLowerCase();
        const email = (client.email || "").toLowerCase();
        const phone = (client.phone || "").toLowerCase();

        return (
            name.includes(searchTerm) ||
            email.includes(searchTerm) ||
            phone.includes(searchTerm)
        );
    });

    filteredClients.forEach(client => {
        const row = document.createElement("tr");

        /* CLIENTE */

        const nameCell = document.createElement("td");

        const person = document.createElement("div");
        person.className = "client-person";

        const avatar = document.createElement("span");
        avatar.className = "client-avatar";
        avatar.textContent = getInitials(client.name || "?");

        const name = document.createElement("strong");
        name.textContent = client.name;

        person.append(avatar, name);
        nameCell.appendChild(person);

        /* EMAIL */

        const emailCell = document.createElement("td");
        emailCell.className = "client-email";
        emailCell.textContent = client.email;

        /* TELEFONE */

        const phoneCell = document.createElement("td");
        phoneCell.textContent = client.phone;

        /* CIDADE */

        const cityCell = document.createElement("td");
        cityCell.textContent = client.city;

        /* DATA DE CADASTRO */

        const dateCell = document.createElement("td");
        dateCell.textContent = formatDate(client.createdAt);

        /* AÇÕES */

        const actionsCell = document.createElement("td");

        const actions = document.createElement("div");
        actions.className = "client-actions";

        const editButton = createActionButton(
            "edit",
            "Editar cliente",
            "edit",
            client.id
        );

        const deleteButton = createActionButton(
            "delete",
            "Excluir cliente",
            "delete",
            client.id,
            "delete"
        );

        actions.append(editButton, deleteButton);
        actionsCell.appendChild(actions);

        row.append(
            nameCell,
            emailCell,
            phoneCell,
            cityCell,
            dateCell,
            actionsCell
        );

        clientsList.appendChild(row);
    });

    /* ESTADO VAZIO */

    emptyClientsElement.hidden = filteredClients.length > 0;

    if (clients.length === 0) {
        emptyClientsElement.querySelector("h3").textContent =
            "Nenhum cliente cadastrado";

        emptyClientsElement.querySelector("p").textContent =
            "Clique em Novo cliente para realizar o primeiro cadastro.";
    } else {
        emptyClientsElement.querySelector("h3").textContent =
            "Nenhum cliente encontrado";

        emptyClientsElement.querySelector("p").textContent =
            "Tente pesquisar por outro nome, e-mail ou telefone.";
    }

    /* CONTADOR DA TABELA */

    clientsCountElement.textContent =
        `Mostrando ${filteredClients.length} de ${clients.length} clientes`;

    updateSummary();
}

/* =====================================
   ABRIR FORMULÁRIO
===================================== */

function openClientForm() {
    clientForm.reset();

    clientIdInput.value = "";
    dialogTitle.textContent = "Cadastrar cliente";

    clientDialog.showModal();

    clientNameInput.focus();
}

openFormButton.addEventListener("click", openClientForm);

/* =====================================
   FECHAR FORMULÁRIO
===================================== */

function closeClientForm() {
    clientDialog.close();
    clientForm.reset();
    clientIdInput.value = "";
}

closeFormButton.addEventListener("click", closeClientForm);
cancelFormButton.addEventListener("click", closeClientForm);

/* =====================================
   CADASTRAR OU EDITAR
===================================== */

clientForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const id = clientIdInput.value;

    const name = clientNameInput.value.trim();
    const email = clientEmailInput.value.trim().toLowerCase();
    const phone = clientPhoneInput.value.trim();
    const city = clientCityInput.value.trim();
    const address = clientAddressInput.value.trim();

    if (!name || !email || !phone || !city) {
        showToast("Preencha todos os campos obrigatórios.");
        return;
    }

    if (name.length < 3) {
        showToast("O nome precisa ter pelo menos 3 caracteres.");
        clientNameInput.focus();
        return;
    }

    const existingEmail = clients.some(client => {
        return (
            client.email.toLowerCase() === email &&
            client.id !== id
        );
    });

    if (existingEmail) {
        showToast("Já existe um cliente cadastrado com esse e-mail.");
        clientEmailInput.focus();
        return;
    }

    if (id) {
        /* EDITAR CLIENTE */

        const index = clients.findIndex(client => client.id === id);

        if (index === -1) {
            showToast("Cliente não encontrado.");
            return;
        }

        const updatedClient = {
            ...clients[index],
            name,
            email,
            phone,
            city,
            address,
            updatedAt: new Date().toISOString()
        };

        clients[index] = updatedClient;

        if (!saveClients()) return;

        showToast("Cliente atualizado com sucesso!");

    } else {
        /* NOVO CLIENTE */

        const newClient = {
            id: crypto.randomUUID
                ? crypto.randomUUID()
                : `${Date.now()}-${Math.random().toString(16).slice(2)}`,

            name,
            email,
            phone,
            city,
            address,

            createdAt: new Date().toISOString()
        };

        clients.push(newClient);

        if (!saveClients()) {
            clients.pop();
            return;
        }

        showToast("Cliente cadastrado com sucesso!");
    }

    closeClientForm();
    renderClients();
});

/* =====================================
   EDITAR CLIENTE
===================================== */

function editClient(id) {
    const client = clients.find(item => item.id === id);

    if (!client) {
        showToast("Cliente não encontrado.");
        return;
    }

    clientIdInput.value = client.id;

    clientNameInput.value = client.name;
    clientEmailInput.value = client.email;
    clientPhoneInput.value = client.phone;
    clientCityInput.value = client.city;
    clientAddressInput.value = client.address || "";

    dialogTitle.textContent = "Editar cliente";

    clientDialog.showModal();

    clientNameInput.focus();
}

/* =====================================
   EXCLUIR CLIENTE
===================================== */

function deleteClient(id) {
    const client = clients.find(item => item.id === id);

    if (!client) {
        showToast("Cliente não encontrado.");
        return;
    }

    const confirmation = confirm(
        `Tem certeza que deseja excluir o cadastro de ${client.name}?`
    );

    if (!confirmation) return;

    const previousClients = [...clients];

    clients = clients.filter(item => item.id !== id);

    if (!saveClients()) {
        clients = previousClients;
        return;
    }

    renderClients();
    showToast("Cliente excluído com sucesso!");
}

/* =====================================
   CLIQUES NAS AÇÕES DA TABELA
===================================== */

clientsList.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-action]");

    if (!button) return;

    const id = button.dataset.id;
    const action = button.dataset.action;

    if (action === "edit") {
        editClient(id);
    }

    if (action === "delete") {
        deleteClient(id);
    }
});

/* =====================================
   PESQUISAR CLIENTES
===================================== */

searchInput.addEventListener("input", renderClients);

/* =====================================
   LIMPAR PESQUISA
===================================== */

clearSearchButton.addEventListener("click", () => {
    searchInput.value = "";
    renderClients();
    searchInput.focus();
});

/* =====================================
   INICIALIZAR A PÁGINA
===================================== */

renderClients();}

if (document.querySelector("#order-form")) {
/* =====================================
   PEDIDOS - PETSPICE
===================================== */

const STORAGE_KEY = "petspice-pedidos";

const orderForm = document.getElementById("order-form");
const orderDialog = document.getElementById("order-dialog");
const detailsDialog = document.getElementById("details-dialog");

const ordersList = document.getElementById("orders-list");
const searchInput = document.getElementById("search-order");
const statusFilter = document.getElementById("filter-status");
const emptyOrders = document.getElementById("empty-orders");
const toast = document.getElementById("order-toast");

let orders = loadOrders();

/* =====================================
   ARMAZENAMENTO
===================================== */

function loadOrders() {
    try {
        const savedOrders = JSON.parse(localStorage.getItem(STORAGE_KEY));
        return Array.isArray(savedOrders) ? savedOrders : [];
    } catch {
        return [];
    }
}

function saveOrders() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
}

/* =====================================
   IDENTIFICAÇÃO DOS PEDIDOS
===================================== */

function generateOrderId() {
    let id;

    do {
        id = `PED-${Date.now().toString().slice(-8)}`;
    } while (orders.some(order => order.id === id));

    return id;
}

/* =====================================
   FORMATAÇÃO
===================================== */

function formatCurrency(value) {
    return Number(value).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

function formatDate(date) {
    if (!date) return "—";

    const [year, month, day] = date.split("-");
    return `${day}/${month}/${year}`;
}

function getStatusClass(status) {
    const classes = {
        "Pendente": "status-pendente",
        "Processando": "status-processando",
        "Enviado": "status-enviado",
        "Concluído": "status-concluido",
        "Cancelado": "status-cancelado"
    };

    return classes[status] || "";
}

/* =====================================
   NOTIFICAÇÕES
===================================== */

let toastTimeout;

function showToast(message) {
    toast.textContent = message;
    toast.classList.add("show");

    clearTimeout(toastTimeout);

    toastTimeout = setTimeout(() => {
        toast.classList.remove("show");
    }, 3000);
}

/* =====================================
   RESUMO DOS PEDIDOS
===================================== */

function updateSummary() {
    document.getElementById("total-orders").textContent = orders.length;

    document.getElementById("pending-orders").textContent =
        orders.filter(order => order.status === "Pendente").length;

    document.getElementById("shipping-orders").textContent =
        orders.filter(order =>
            order.status === "Processando" || order.status === "Enviado"
        ).length;

    document.getElementById("completed-orders").textContent =
        orders.filter(order => order.status === "Concluído").length;
}

/* =====================================
   RENDERIZAÇÃO DA TABELA
===================================== */

function renderOrders() {
    const search = searchInput.value.trim().toLowerCase();
    const selectedStatus = statusFilter.value;

    const filteredOrders = orders.filter(order => {
        const matchesSearch = [
            order.id,
            order.client,
            order.product
        ].some(value => value.toLowerCase().includes(search));

        const matchesStatus =
            selectedStatus === "todos" || order.status === selectedStatus;

        return matchesSearch && matchesStatus;
    });

    ordersList.replaceChildren();

    filteredOrders.forEach(order => {
        const row = document.createElement("tr");

        const values = [
            order.id,
            order.client,
            order.product,
            formatDate(order.date),
            formatCurrency(order.value)
        ];

        values.forEach((value, index) => {
            const cell = document.createElement("td");

            if (index === 0) {
                const number = document.createElement("span");
                number.className = "order-number";
                number.textContent = value;
                cell.appendChild(number);
            } else if (index === 4) {
                const amount = document.createElement("span");
                amount.className = "order-value";
                amount.textContent = value;
                cell.appendChild(amount);
            } else {
                cell.textContent = value;
            }

            row.appendChild(cell);
        });

        // STATUS
        const statusCell = document.createElement("td");
        const statusBadge = document.createElement("span");

        statusBadge.className = `order-status ${getStatusClass(order.status)}`;
        statusBadge.textContent = order.status;

        statusCell.appendChild(statusBadge);
        row.appendChild(statusCell);

        // AÇÕES
        const actionsCell = document.createElement("td");
        const actions = document.createElement("div");

        actions.className = "order-actions";

        actions.append(
            createActionButton("visibility", "Visualizar pedido", "view", order.id),
            createActionButton("edit", "Editar pedido", "edit", order.id),
            createActionButton("delete", "Excluir pedido", "delete", order.id, true)
        );

        actionsCell.appendChild(actions);
        row.appendChild(actionsCell);

        ordersList.appendChild(row);
    });

    emptyOrders.hidden = filteredOrders.length !== 0;

    document.getElementById("orders-count").textContent =
        `Mostrando ${filteredOrders.length} de ${orders.length} pedidos`;

    updateSummary();
}

/* =====================================
   BOTÕES DE AÇÃO
===================================== */

function createActionButton(icon, label, action, id, isDelete = false) {
    const button = document.createElement("button");

    button.type = "button";
    button.className = `order-action-btn${isDelete ? " delete" : ""}`;
    button.dataset.action = action;
    button.dataset.id = id;
    button.setAttribute("aria-label", label);
    button.title = label;

    const iconElement = document.createElement("span");
    iconElement.className = "material-symbols-outlined";
    iconElement.setAttribute("aria-hidden", "true");
    iconElement.textContent = icon;

    button.appendChild(iconElement);

    return button;
}

/* =====================================
   ABRIR FORMULÁRIO
===================================== */

function openOrderForm(order = null) {
    orderForm.reset();

    document.getElementById("order-id").value = order?.id || "";
    document.getElementById("order-client").value = order?.client || "";
    document.getElementById("order-product").value = order?.product || "";
    document.getElementById("order-value").value = order?.value ?? "";
    document.getElementById("order-date").value =
        order?.date || new Date().toLocaleDateString("en-CA");
    document.getElementById("order-status").value =
        order?.status || "Pendente";

    document.getElementById("order-dialog-title").textContent =
        order ? "Editar pedido" : "Cadastrar pedido";

    orderDialog.showModal();
}

/* =====================================
   CADASTRAR E EDITAR
===================================== */

orderForm.addEventListener("submit", event => {
    event.preventDefault();

    if (!orderForm.reportValidity()) return;

    const id = document.getElementById("order-id").value;

    const orderData = {
        id: id || generateOrderId(),
        client: document.getElementById("order-client").value.trim(),
        product: document.getElementById("order-product").value.trim(),
        value: Number(document.getElementById("order-value").value),
        date: document.getElementById("order-date").value,
        status: document.getElementById("order-status").value
    };

    if (!orderData.client || !orderData.product || orderData.value <= 0) {
        showToast("Confira os dados preenchidos.");
        return;
    }

    if (id) {
        const index = orders.findIndex(order => order.id === id);

        if (index !== -1) {
            orders[index] = orderData;
            showToast("Pedido atualizado com sucesso!");
        }
    } else {
        orders.unshift(orderData);
        showToast("Pedido cadastrado com sucesso!");
    }

    saveOrders();
    renderOrders();
    orderDialog.close();
});

/* =====================================
   VISUALIZAR DETALHES
===================================== */

function showOrderDetails(id) {
    const order = orders.find(item => item.id === id);

    if (!order) return;

    document.getElementById("details-order-number").textContent = order.id;

    const content = document.getElementById("order-details-content");
    content.replaceChildren();

    const details = [
        ["Cliente", order.client],
        ["Produto", order.product],
        ["Valor", formatCurrency(order.value)],
        ["Data", formatDate(order.date)],
        ["Situação", order.status]
    ];

    details.forEach(([label, value]) => {
        const wrapper = document.createElement("div");
        const term = document.createElement("dt");
        const description = document.createElement("dd");

        term.textContent = label;
        description.textContent = value;

        wrapper.append(term, description);
        content.appendChild(wrapper);
    });

    detailsDialog.showModal();
}

/* =====================================
   EXCLUIR PEDIDO
===================================== */

function deleteOrder(id) {
    const order = orders.find(item => item.id === id);

    if (!order) return;

    const confirmed = confirm(
        `Deseja realmente excluir o pedido ${order.id}?`
    );

    if (!confirmed) return;

    orders = orders.filter(item => item.id !== id);

    saveOrders();
    renderOrders();

    showToast("Pedido excluído com sucesso!");
}

/* =====================================
   AÇÕES DA TABELA
===================================== */

ordersList.addEventListener("click", event => {
    const button = event.target.closest("button[data-action]");

    if (!button) return;

    const { action, id } = button.dataset;

    const order = orders.find(item => item.id === id);

    if (!order) return;

    if (action === "view") {
        showOrderDetails(id);
    }

    if (action === "edit") {
        openOrderForm(order);
    }

    if (action === "delete") {
        deleteOrder(id);
    }
});

/* =====================================
   PESQUISA E FILTROS
===================================== */

searchInput.addEventListener("input", renderOrders);
statusFilter.addEventListener("change", renderOrders);

document.getElementById("clear-order-filters").addEventListener("click", () => {
    searchInput.value = "";
    statusFilter.value = "todos";

    renderOrders();
});

/* =====================================
   CONTROLES DOS MODAIS
===================================== */

document.getElementById("open-order-form").addEventListener("click", () => {
    openOrderForm();
});

document.getElementById("close-order-form").addEventListener("click", () => {
    orderDialog.close();
});

document.getElementById("cancel-order-form").addEventListener("click", () => {
    orderDialog.close();
});

document.getElementById("close-details").addEventListener("click", () => {
    detailsDialog.close();
});

document.getElementById("close-details-footer").addEventListener("click", () => {
    detailsDialog.close();
});

/* =====================================
   INICIALIZAÇÃO
===================================== */

renderOrders();}


/* =====================================
   ANÁLISE DE DADOS - PETSPICE
===================================== */

if (document.querySelector("#revenue-chart")) {

    const periodFilter = document.querySelector("#analytics-period");

    const revenueCanvas = document.querySelector("#revenue-chart");
    const categoryCanvas = document.querySelector("#category-chart");
    const statusCanvas = document.querySelector("#status-chart");
    const productsCanvas = document.querySelector("#products-chart");

    const analyticsColors = {
        purple: "#8123fc",
        darkPurple: "#301266",
        gold: "#ffb413",
        green: "#2eaa70",
        red: "#e74c3c",
        gray: "#88818f"
    };

    function getChartTextColor() {
        return getComputedStyle(document.body)
            .getPropertyValue("--color-dark").trim();
    }

    function getChartGridColor() {
        return getComputedStyle(document.body)
            .getPropertyValue("--color-light").trim();
    }

    const periodData = {
        7: {
            labels: ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"],
            revenue: [850, 1200, 950, 1600, 1350, 2100, 1850]
        },

        30: {
            labels: ["Semana 1", "Semana 2", "Semana 3", "Semana 4"],
            revenue: [4200, 5800, 6900, 8340]
        },

        90: {
            labels: ["Mês 1", "Mês 2", "Mês 3"],
            revenue: [18200, 21500, 25240]
        },

        365: {
            labels: [
                "Jan", "Fev", "Mar", "Abr",
                "Mai", "Jun", "Jul", "Ago",
                "Set", "Out", "Nov", "Dez"
            ],
            revenue: [
                12000, 14500, 13800, 17200,
                18500, 21000, 19800, 22500,
                23000, 25240, 21800, 28000
            ]
        }
    };

    /* =====================================
       OPÇÕES GERAIS DOS GRÁFICOS
    ===================================== */

    function getCommonOptions() {
        return {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    labels: {
                        color: getChartTextColor(),
                        font: {
                            family: "Poppins",
                            size: 11
                        },
                        usePointStyle: true,
                        padding: 18
                    }
                }
            }
        };
    }

    /* =====================================
       1. GRÁFICO DE FATURAMENTO
    ===================================== */

    const revenueChart = new Chart(revenueCanvas, {
        type: "line",

        data: {
            labels: periodData[30].labels,

            datasets: [{
                label: "Faturamento",
                data: periodData[30].revenue,

                borderColor: analyticsColors.purple,
                backgroundColor: "rgba(129, 35, 252, 0.12)",

                borderWidth: 3,
                fill: true,
                tension: 0.4,

                pointRadius: 4,
                pointHoverRadius: 7,
                pointBackgroundColor: analyticsColors.gold
            }]
        },

        options: {
            ...getCommonOptions(),

            plugins: {
                legend: {
                    display: false
                },

                tooltip: {
                    callbacks: {
                        label(context) {
                            return " " + context.parsed.y.toLocaleString(
                                "pt-BR",
                                {
                                    style: "currency",
                                    currency: "BRL"
                                }
                            );
                        }
                    }
                }
            },

            scales: {
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        color: getChartTextColor()
                    }
                },

                y: {
                    beginAtZero: true,
                    grid: {
                        color: getChartGridColor()
                    },
                    ticks: {
                        color: getChartTextColor(),
                        callback(value) {
                            return "R$ " + value.toLocaleString("pt-BR");
                        }
                    }
                }
            }
        }
    });

    /* =====================================
       2. VENDAS POR CATEGORIA
    ===================================== */

    const categoryChart = new Chart(categoryCanvas, {
        type: "doughnut",

        data: {
            labels: [
                "Rações",
                "Acessórios",
                "Brinquedos",
                "Higiene",
                "Outros"
            ],

            datasets: [{
                data: [40, 25, 15, 12, 8],

                backgroundColor: [
                    analyticsColors.purple,
                    analyticsColors.gold,
                    analyticsColors.green,
                    "#b98bea",
                    analyticsColors.gray
                ],

                borderWidth: 0,
                hoverOffset: 8
            }]
        },

        options: {
            ...getCommonOptions(),

            cutout: "68%",

            plugins: {
                legend: {
                    position: "bottom",
                    labels: {
                        color: getChartTextColor(),
                        font: {
                            family: "Poppins",
                            size: 10
                        },
                        usePointStyle: true,
                        padding: 15
                    }
                }
            }
        }
    });

    /* =====================================
       3. SITUAÇÃO DOS PEDIDOS
    ===================================== */

    const statusChart = new Chart(statusCanvas, {
        type: "doughnut",

        data: {
            labels: [
                "Concluídos",
                "Pendentes",
                "Processando",
                "Enviados",
                "Cancelados"
            ],

            datasets: [{
                data: [145, 32, 28, 35, 8],

                backgroundColor: [
                    analyticsColors.green,
                    analyticsColors.gold,
                    analyticsColors.purple,
                    "#a77ad9",
                    analyticsColors.red
                ],

                borderWidth: 0,
                hoverOffset: 8
            }]
        },

        options: {
            ...getCommonOptions(),

            cutout: "68%",

            plugins: {
                legend: {
                    position: "bottom",
                    labels: {
                        color: getChartTextColor(),
                        font: {
                            family: "Poppins",
                            size: 10
                        },
                        usePointStyle: true,
                        padding: 12
                    }
                }
            }
        }
    });

    /* =====================================
       4. PRODUTOS MAIS VENDIDOS
    ===================================== */

    const productsChart = new Chart(productsCanvas, {
        type: "bar",

        data: {
            labels: [
                "Ração Premium",
                "Coleira",
                "Brinquedo",
                "Caminha",
                "Shampoo"
            ],

            datasets: [{
                label: "Unidades vendidas",
                data: [120, 95, 78, 62, 45],

                backgroundColor: [
                    analyticsColors.purple,
                    analyticsColors.gold,
                    analyticsColors.green,
                    "#b98bea",
                    "#d7b8f7"
                ],

                borderRadius: 8,
                borderSkipped: false
            }]
        },

        options: {
            ...getCommonOptions(),

            indexAxis: "y",

            plugins: {
                legend: {
                    display: false
                }
            },

            scales: {
                x: {
                    beginAtZero: true,
                    grid: {
                        color: getChartGridColor()
                    },
                    ticks: {
                        color: getChartTextColor(),
                        precision: 0
                    }
                },

                y: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        color: getChartTextColor(),
                        font: {
                            family: "Poppins",
                            size: 10
                        }
                    }
                }
            }
        }
    });

    /* =====================================
       FILTRO DE PERÍODO
    ===================================== */

    periodFilter.addEventListener("change", () => {

        const selectedPeriod = periodFilter.value;
        const data = periodData[selectedPeriod];

        revenueChart.data.labels = data.labels;
        revenueChart.data.datasets[0].data = data.revenue;

        revenueChart.update();

    });

    /* =====================================
       ATUALIZAR CORES NO TEMA ESCURO
    ===================================== */

    if (themeToggler) {

        themeToggler.addEventListener("click", () => {

            setTimeout(() => {

                const textColor = getChartTextColor();
                const gridColor = getChartGridColor();

                [
                    revenueChart,
                    categoryChart,
                    statusChart,
                    productsChart
                ].forEach(chart => {

                    if (chart.options.scales) {

                        Object.values(chart.options.scales).forEach(axis => {

                            if (axis.ticks) {
                                axis.ticks.color = textColor;
                            }

                            if (axis.grid && axis.grid.display !== false) {
                                axis.grid.color = gridColor;
                            }

                        });

                    }

                    if (chart.options.plugins.legend) {
                        chart.options.plugins.legend.labels.color = textColor;
                    }

                    chart.update();

                });

            }, 50);

        });

    }

    console.log("Análise de Dados iniciada com sucesso! 📊");

}

// =====================================
// PETSPICE - GERENCIAMENTO DE MENSAGENS
// =====================================

if (document.querySelector("#message-list")) {

    const messageList = document.querySelector("#message-list");
    const messageSearch = document.querySelector("#message-search");
    const messageFilter = document.querySelector("#message-filter");

    const totalMessages = document.querySelector("#total-messages");
    const unreadMessages = document.querySelector("#unread-messages");
    const readMessages = document.querySelector("#read-messages");

    const sidebarMessageCount = document.querySelector("#sidebar-message-count");

    const detailAvatar = document.querySelector("#detail-avatar");
    const detailName = document.querySelector("#detail-name");
    const detailEmail = document.querySelector("#detail-email");
    const detailSubject = document.querySelector("#detail-subject");
    const detailDate = document.querySelector("#detail-date");
    const detailBody = document.querySelector("#detail-body");

    const messageView = document.querySelector("#message-view");
    const messageEmpty = document.querySelector("#message-empty");
    const emptyMessages = document.querySelector("#empty-messages");

    const markAllReadButton = document.querySelector("#mark-all-read");
    const deleteMessageButton = document.querySelector("#delete-message");

    const replyForm = document.querySelector("#reply-form");
    const replyInput = document.querySelector("#reply-message");

    // MENSAGENS INICIAIS

    const defaultMessages = [
        {
            id: 1,
            name: "Denis Salgado",
            email: "denis@email.com",
            subject: "Dúvida sobre um pedido",
            preview: "Olá! Gostaria de saber como está o andamento...",
            body: "Olá, equipe PetSpice!\n\nGostaria de saber como está o andamento do meu pedido. Fiz a compra há alguns dias e ainda não recebi atualizações.\n\nAguardo retorno. Obrigado!",
            date: "18/11/2026",
            time: "14:30",
            initials: "DS",
            read: false
        },
        {
            id: 2,
            name: "Maria Oliveira",
            email: "maria@email.com",
            subject: "Problema no pagamento",
            preview: "Estou tentando finalizar minha compra...",
            body: "Olá!\n\nEstou tentando finalizar minha compra, mas o pagamento não está sendo aprovado. Poderiam me ajudar a resolver esse problema?\n\nObrigada!",
            date: "18/11/2026",
            time: "13:15",
            initials: "MO",
            read: false
        },
        {
            id: 3,
            name: "João Santos",
            email: "joao@email.com",
            subject: "Sugestão para a loja",
            preview: "Gostaria de sugerir novos produtos...",
            body: "Olá, pessoal!\n\nAdoro a loja de vocês e gostaria de sugerir a inclusão de mais opções de brinquedos para gatos.\n\nAcredito que seria muito interessante para os clientes!",
            date: "17/11/2026",
            time: "16:45",
            initials: "JS",
            read: false
        },
        {
            id: 4,
            name: "Ana Costa",
            email: "ana@email.com",
            subject: "Informações sobre doações",
            preview: "Gostaria de saber como funciona...",
            body: "Boa tarde!\n\nGostaria de saber como funciona o sistema de doações de produtos para animais. Tenho interesse em ajudar.\n\nObrigada pela atenção!",
            date: "17/11/2026",
            time: "10:20",
            initials: "AC",
            read: false
        },
        {
            id: 5,
            name: "Pedro Costa",
            email: "pedro@email.com",
            subject: "Elogio ao atendimento",
            preview: "Gostaria de agradecer pelo atendimento...",
            body: "Olá!\n\nGostaria de agradecer pelo ótimo atendimento que recebi. Minha experiência na PetSpice foi excelente!\n\nContinuem com esse trabalho incrível.",
            date: "16/11/2026",
            time: "15:00",
            initials: "PC",
            read: true
        },
        {
            id: 6,
            name: "Lucas Ferreira",
            email: "lucas@email.com",
            subject: "Dúvida sobre produtos",
            preview: "Tenho uma dúvida sobre a alimentação...",
            body: "Olá!\n\nGostaria de saber se vocês possuem rações específicas para cães de pequeno porte.\n\nAgradeço desde já!",
            date: "15/11/2026",
            time: "09:40",
            initials: "LF",
            read: true
        }
    ];

    // RECUPERAR MENSAGENS SALVAS

    let messages = [];

    try {
        const savedMessages = localStorage.getItem("petspice-mensagens");

        messages = savedMessages
            ? JSON.parse(savedMessages)
            : defaultMessages;

        if (!Array.isArray(messages)) {
            messages = defaultMessages;
        }

    } catch (error) {
        messages = defaultMessages;
    }

    let selectedMessageId = null;

    // SALVAR MENSAGENS

    function saveMessages() {
        localStorage.setItem(
            "petspice-mensagens",
            JSON.stringify(messages)
        );
    }

    // ATUALIZAR CONTADORES

    function updateMessageCounters() {

        const total = messages.length;

        const unread = messages.filter(
            message => !message.read
        ).length;

        const read = total - unread;

        totalMessages.textContent = total;
        unreadMessages.textContent = unread;
        readMessages.textContent = read;

        sidebarMessageCount.textContent = unread;

        sidebarMessageCount.hidden = unread === 0;
    }

    // CRIAR ITEM DA LISTA

    function createMessageItem(message) {

        const button = document.createElement("button");

        button.type = "button";
        button.className = "message-item";

        button.dataset.messageId = message.id;

        if (!message.read) {
            button.classList.add("unread");
        }

        if (message.id === selectedMessageId) {
            button.classList.add("active");
        }

        const avatar = document.createElement("span");
        avatar.className = "message-avatar";
        avatar.textContent = message.initials;

        const content = document.createElement("span");
        content.className = "message-item-content";

        const top = document.createElement("span");
        top.className = "message-item-top";

        const name = document.createElement("strong");
        name.textContent = message.name;

        const time = document.createElement("time");
        time.textContent = message.time;

        top.append(name, time);

        const subject = document.createElement("span");
        subject.className = "message-item-subject";
        subject.textContent = message.subject;

        const preview = document.createElement("span");
        preview.className = "message-item-preview";
        preview.textContent = message.preview;

        content.append(top, subject, preview);

        button.append(avatar, content);

        if (!message.read) {
            const dot = document.createElement("span");

            dot.className = "message-unread-dot";
            dot.setAttribute("aria-label", "Não lida");

            button.appendChild(dot);
        }

        return button;
    }

    // MOSTRAR LISTA DE MENSAGENS

    function renderMessages() {

        messageList.replaceChildren();

        const search = messageSearch.value
            .toLowerCase()
            .trim();

        const filter = messageFilter.value;

        const filteredMessages = messages.filter(message => {

            const matchesSearch =
                message.name.toLowerCase().includes(search) ||
                message.subject.toLowerCase().includes(search) ||
                message.preview.toLowerCase().includes(search);

            const matchesFilter =
                filter === "all" ||
                (filter === "unread" && !message.read) ||
                (filter === "read" && message.read);

            return matchesSearch && matchesFilter;
        });

        filteredMessages.forEach(message => {
            messageList.appendChild(
                createMessageItem(message)
            );
        });

        emptyMessages.hidden = filteredMessages.length !== 0;

        updateMessageCounters();
    }

    // ABRIR MENSAGEM

    function openMessage(id) {

        const message = messages.find(
            item => item.id === id
        );

        if (!message) return;

        selectedMessageId = id;

        message.read = true;

        detailAvatar.textContent = message.initials;
        detailName.textContent = message.name;
        detailEmail.textContent = message.email;

        detailSubject.textContent = message.subject;
        detailDate.textContent = `${message.date} às ${message.time}`;

        detailBody.textContent = message.body;

        messageView.hidden = false;
        messageEmpty.hidden = true;

        replyInput.value = "";

        saveMessages();

        renderMessages();
    }

    // CLICAR EM UMA MENSAGEM

    messageList.addEventListener("click", function (event) {

        const item = event.target.closest(".message-item");

        if (!item) return;

        const id = Number(item.dataset.messageId);

        openMessage(id);
    });

    // PESQUISAR MENSAGENS

    messageSearch.addEventListener("input", function () {

        renderMessages();

    });

    // FILTRAR MENSAGENS

    messageFilter.addEventListener("change", function () {

        renderMessages();

    });

    // MARCAR TODAS COMO LIDAS

    markAllReadButton.addEventListener("click", function () {

        messages.forEach(message => {
            message.read = true;
        });

        saveMessages();

        renderMessages();

    });

    // EXCLUIR MENSAGEM

    deleteMessageButton.addEventListener("click", function () {

        if (selectedMessageId === null) return;

        const confirmed = confirm(
            "Tem certeza que deseja excluir esta mensagem?"
        );

        if (!confirmed) return;

        messages = messages.filter(
            message => message.id !== selectedMessageId
        );

        selectedMessageId = null;

        saveMessages();

        messageView.hidden = true;
        messageEmpty.hidden = false;

        renderMessages();

    });

    // REGISTRAR RESPOSTA

    replyForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const response = replyInput.value.trim();

        if (response === "") {
            alert("Digite uma resposta antes de continuar.");
            return;
        }

        alert(
            "Resposta registrada na demonstração!\n\n" +
            "O envio real de e-mails será integrado posteriormente."
        );

        replyInput.value = "";

    });

    // INICIALIZAÇÃO

    function initializeMessages() {

        if (messages.length > 0) {

            const firstMessage = messages[0];

            openMessage(firstMessage.id);

        } else {

            messageView.hidden = true;
            messageEmpty.hidden = false;

            renderMessages();

        }

    }

    saveMessages();

    initializeMessages();

}
