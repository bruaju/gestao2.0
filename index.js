// Senhas autorizadas
const senhasAutorizadas = ['123', '']; // Liste as senhas válidas aqui

document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Previne o comportamento padrão do formulário

    const senha = document.getElementById('senha').value;

    // Verifica se a senha é válida
    if (senhasAutorizadas.includes(senha)) {
        // Redireciona para a página de gestão
        window.location.href = 'gestao.html';
    } else {
        alert('Senha incorreta.'); // Mensagem de erro
    }
});
