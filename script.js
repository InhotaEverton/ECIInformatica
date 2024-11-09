// Função para exibir os cadastros armazenados no LocalStorage
function exibirCadastros() {
    let cadastros = JSON.parse(localStorage.getItem('dadosCadastros')) || [];

    // Seleciona o contêiner onde os cadastros serão exibidos
    const lista = document.getElementById('lista-cadastros');
    lista.innerHTML = ''; // Limpa o conteúdo atual

    // Itera sobre os cadastros e cria a estrutura HTML para cada um
    cadastros.forEach((cadastro, index) => {
        const div = document.createElement('div');
        div.classList.add('cadastro-item');
        
        div.innerHTML = `
            <p><strong>Nome:</strong> ${cadastro.nome}</p>
            <p><strong>Segmento:</strong> ${cadastro.nomeEmpresa}</p>
            <p><strong>Email:</strong> ${cadastro.email}</p>
            <p><strong>Telefone:</strong> ${cadastro.telefone}</p>
            <p><strong>Endereço:</strong> ${cadastro.endereco}</p>
            <p><strong>Cidade:</strong> ${cadastro.cidade}</p>
            <p><strong>Estado:</strong> ${cadastro.estado}</p>
            
            <button onclick="editarCadastro(${index})">Editar</button>
            <button onclick="excluirCadastro(${index})">Excluir</button>
        `;
        
        lista.appendChild(div);
    });
}

// Função para editar um cadastro
function editarCadastro(index) {
    let cadastros = JSON.parse(localStorage.getItem('dadosCadastros')) || [];
    const cadastro = cadastros[index];

    // Preencher os campos com os dados do cadastro
    document.getElementById('nome').value = cadastro.nome;
    document.getElementById('nome-empresa').value = cadastro.nomeEmpresa;
    document.getElementById('email').value = cadastro.email;
    document.getElementById('telefone').value = cadastro.telefone;
    document.getElementById('endereco').value = cadastro.endereco;
    document.getElementById('cidade').value = cadastro.cidade;
    document.getElementById('estado').value = cadastro.estado;

    // Alterar a função do botão de envio para atualizar o cadastro
    const form = document.getElementById('form-cadastro');
    form.onsubmit = function(event) {
        event.preventDefault();
        salvarCadastro(index);
    };
}

// Função para salvar ou atualizar um cadastro
function salvarCadastro(index = null) {
    const nome = document.getElementById('nome').value;
    const nomeEmpresa = document.getElementById('nome-empresa').value;
    const email = document.getElementById('email').value;
    const telefone = document.getElementById('telefone').value;
    const endereco = document.getElementById('endereco').value;
    const cidade = document.getElementById('cidade').value;
    const estado = document.getElementById('estado').value;

    const cadastro = { nome, nomeEmpresa, email, telefone, endereco, cidade, estado };
    let cadastros = JSON.parse(localStorage.getItem('dadosCadastros')) || [];

    if (index !== null) {
        // Atualizar o cadastro existente
        cadastros[index] = cadastro;
    } else {
        // Adicionar um novo cadastro
        cadastros.push(cadastro);
    }

    // Salvar no LocalStorage
    localStorage.setItem('dadosCadastros', JSON.stringify(cadastros));

    // Redirecionar para a lista de cadastros
    window.location.href = 'listadecadastro.html';
}

// Função para excluir um cadastro
function excluirCadastro(index) {
    let cadastros = JSON.parse(localStorage.getItem('dadosCadastros')) || [];
    cadastros.splice(index, 1); // Remove o cadastro

    // Atualizar o LocalStorage
    localStorage.setItem('dadosCadastros', JSON.stringify(cadastros));

    // Atualizar a lista de cadastros
    exibirCadastros();
}

// Chama a função para exibir os cadastros assim que a página carregar
window.onload = exibirCadastros;
