const urlParams = new URLSearchParams(window.location.search);
        const leito = urlParams.get('leito');
        document.getElementById('leitoSelecionado').innerText = `Leito ${leito}`;

        document.getElementById('concluirLimpezaBtn').addEventListener('click', function() {
            const responsavelLimpeza = document.getElementById('responsavelLimpeza').value.trim();

            if (!responsavelLimpeza) {
                alert('Por favor, insira o nome do responsável pela limpeza.');
                return;
            }

            let leitosPendentes = JSON.parse(localStorage.getItem('leitosPendentes')) || [];
            let leitosDisponiveis = JSON.parse(localStorage.getItem('leitosDisponiveis')) || [];

            leitosPendentes = leitosPendentes.filter(item => item.leito !== parseInt(leito));

            const horarioLimpeza = new Date().toLocaleTimeString();
            leitosDisponiveis.push({
                leito: parseInt(leito),
                horario: horarioLimpeza,
                responsavel: responsavelLimpeza
            });

            localStorage.setItem('leitosPendentes', JSON.stringify(leitosPendentes));
            localStorage.setItem('leitosDisponiveis', JSON.stringify(leitosDisponiveis));

            alert('Limpeza concluída com sucesso!');
            window.location.href = 'leitosdisponiveis.html';
        });