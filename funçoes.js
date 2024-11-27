// Elementos do DOM
const form = document.getElementById('phoneForm');
const phoneInput = document.getElementById('phoneNumber');
const phoneTable = document.getElementById('phoneTable');

// Função para formatar o número durante a digitação
phoneInput.addEventListener('input', (e) => {
    let input = e.target.value.replace(/\D/g, ''); // Remove todos os caracteres não numéricos

    if (input.length > 11) input = input.slice(0, 11); // Limita a 11 caracteres

    // Adiciona o formato (XX) XXXXX-XXXX
    if (input.length > 6) {
        input = `(${input.slice(0, 2)}) ${input.slice(2, 7)}-${input.slice(7)}`;
    } else if (input.length > 2) {
        input = `(${input.slice(0, 2)}) ${input.slice(2)}`;
    } else if (input.length > 0) {
        input = `(${input}`;
    }

    e.target.value = input;
});

// Função para obter contatos do LocalStorage
function getContacts() {
    return JSON.parse(localStorage.getItem('contacts')) || [];
}

// Função para salvar contatos no LocalStorage
function saveContacts(contacts) {
    localStorage.setItem('contacts', JSON.stringify(contacts));
}

// Função para renderizar a tabela
function renderTable() {
    const contacts = getContacts();
    phoneTable.innerHTML = '';
    contacts.forEach((contact, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${contact.name}</td>
            <td>${contact.phone}</td>
            <td>
                <button class="btn btn-danger btn-sm" onclick="deleteContact(${index})"><i class="fas fa-trash-alt"></i> Excluir</button>
            </td>
        `;
        phoneTable.appendChild(row);
    });
}

// Função para adicionar um contato
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('contactName').value.trim();
    const phone = phoneInput.value.trim();

    if (name && phone) {
        const contacts = getContacts();
        contacts.push({ name, phone });
        saveContacts(contacts);
        renderTable();
        form.reset();
    } else {
        alert('Preencha todos os campos!');
    }
});

// Função para excluir um contato
function deleteContact(index) {
    const contacts = getContacts();
    contacts.splice(index, 1);
    saveContacts(contacts);
    renderTable();
}

// Renderizar a tabela na inicialização
renderTable();
