  // Função para atualizar a animação da caixa de leitos pendentes
  function updateLeitosPendentesAnimation() {
    const leitosPendentes = JSON.parse(localStorage.getItem('leitosPendentes')) || [];
    const leitosPendentesCard = document.getElementById('leitosPendentesCard');
    const notificationDot = document.getElementById('notificationDot');

    // Remove a classe de brilho se existir
    leitosPendentesCard.classList.remove('blink');

    // Verifica se há leitos pendentes e adiciona a classe de brilho se necessário
    if (leitosPendentes.length > 0) {
        leitosPendentesCard.classList.add('blink');
    }

    // Atualiza a bolinha de notificação
    if (leitosPendentes.length > 0) {
        notificationDot.style.display = 'block'; // Mostra a bolinha
    } else {
        notificationDot.style.display = 'none'; // Esconde a bolinha
    }
}

// Atualiza a animação ao carregar a página de gestão
updateLeitosPendentesAnimation();

document.getElementById('addLeitoButton').addEventListener('click', function() {
    const numeroLeito = prompt("Por favor, insira o número do leito:");

    if (numeroLeito) {
        // Recupera leitos existentes
        let leitosDisponiveis = JSON.parse(localStorage.getItem('leitosDisponiveis')) || [];

        // Verifica se o leito já existe
        const leitoExistente = leitosDisponiveis.find(leito => leito.numero == numeroLeito);
        if (leitoExistente) {
            alert("Este leito já existe. Por favor, insira um número de leito diferente.");
        } else {
            // Adiciona o novo leito
            const novoLeito = {
                numero: numeroLeito,
                responsavel: null,
                horario: null
            };
            leitosDisponiveis.push(novoLeito);
            localStorage.setItem('leitosDisponiveis', JSON.stringify(leitosDisponiveis));
            alert(`Leito ${numeroLeito} adicionado com sucesso!`);
        }
    } else {
        alert("Número do leito não pode estar vazio.");
    }

    // Atualiza a animação após adicionar o leito
    updateLeitosPendentesAnimation();
});

document.getElementById('removeLeitoButton').addEventListener('click', function() {
    const numeroLeito = prompt("Por favor, insira o número do leito a ser removido:");

    if (numeroLeito) {
        // Recupera leitos existentes
        let leitosDisponiveis = JSON.parse(localStorage.getItem('leitosDisponiveis')) || [];

        // Verifica se o leito existe
        const leitoIndex = leitosDisponiveis.findIndex(leito => leito.numero == numeroLeito);
        if (leitoIndex === -1) {
            alert("Este leito não existe.");
        } else {
            // Remove o leito
            leitosDisponiveis.splice(leitoIndex, 1);
            localStorage.setItem('leitosDisponiveis', JSON.stringify(leitosDisponiveis));
            alert(`Leito ${numeroLeito} removido com sucesso!`);
        }
    } else {
        alert("Número do leito não pode estar vazio.");
    }

    // Atualiza a animação após remover o leito
    updateLeitosPendentesAnimation();
});