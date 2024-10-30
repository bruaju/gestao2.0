 // Recuperar os leitos disponíveis do localStorage e exibi-los
 const leitosDisponiveis = JSON.parse(localStorage.getItem('leitosDisponiveis')) || [];
 const leitosGrid = document.getElementById('leitosDisponiveis');

 // Função para exibir leitos disponíveis
 function exibirLeitos() {
     leitosGrid.innerHTML = ''; 
     leitosDisponiveis.forEach((leito, index) => {
         const leitoDiv = document.createElement('div');
         leitoDiv.classList.add('leito-item');
         leitoDiv.innerHTML = `
             <span>Leito ${leito.numero || 'N/A'} - Limpo por <strong>${leito.responsavel || 'N/A'}</strong> às <strong>${leito.horario || 'N/A'}</strong></span>
             <button onclick="marcarComoPendente(${index})">Marcar como Pendente</button>
         `;
         leitosGrid.appendChild(leitoDiv);
     });
 }

 // Exibir os leitos ao carregar a página
 exibirLeitos();

 // Função para marcar o leito como pendente
 function marcarComoPendente(index) {
     const leito = leitosDisponiveis[index]; 
     if (leito && leito.numero) { 
         leito.pendenteDesde = new Date().toLocaleString('pt-BR'); 
         let horarioLimpeza = leito.horario || new Date().toLocaleString('pt-BR'); 
         leito.horario = horarioLimpeza; 
         leitosDisponiveis.splice(index, 1); 
         let leitosPendentes = JSON.parse(localStorage.getItem('leitosPendentes')) || [];
         leitosPendentes.push(leito); 
         localStorage.setItem('leitosDisponiveis', JSON.stringify(leitosDisponiveis));
         localStorage.setItem('leitosPendentes', JSON.stringify(leitosPendentes));
         exibirLeitos(); 
     } else {
         // Se o leito não tem número, removê-lo do localStorage
         if (leito) {
             alert(`Leito inválido encontrado. Removendo leito: ${JSON.stringify(leito)}`);
             leitosDisponiveis.splice(index, 1); // Remove o leito inválido
             localStorage.setItem('leitosDisponiveis', JSON.stringify(leitosDisponiveis));
             exibirLeitos(); 
         } else {
             console.error("Leito não encontrado.");
         }
     }
 }