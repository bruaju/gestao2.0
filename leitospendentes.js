 // Recuperar os leitos pendentes do localStorage e exibi-los
 const leitosPendentes = JSON.parse(localStorage.getItem('leitosPendentes')) || [];
 const leitosGrid = document.getElementById('leitosPendentes');

 // Exibir os leitos pendentes
 leitosPendentes.forEach((leito, index) => {
     if (leito && leito.numero) { // Verifica se o leito existe e tem número
         const leitoDiv = document.createElement('div');
         leitoDiv.classList.add('leito-item');
         leitoDiv.innerHTML = `
             <span>Leito ${leito.numero} (Pendente desde ${leito.pendenteDesde || 'N/A'})</span>
             <input type="text" id="nomeResponsavel${index}" class="input-responsavel" placeholder="Nome do Funcionário" />
             <button onclick="concluirLeito(${index})">Concluir</button>
         `;
         leitosGrid.appendChild(leitoDiv);
     }
 });

 // Função para concluir o leito e mover para os disponíveis
 function concluirLeito(index) {
     const nomeResponsavel = document.getElementById(`nomeResponsavel${index}`).value; 

     if (nomeResponsavel) {
         const leito = leitosPendentes[index]; 
         let leitosDisponiveis = JSON.parse(localStorage.getItem('leitosDisponiveis')) || [];

         // Atualiza o responsável e move o leito para disponíveis
         leito.responsavel = nomeResponsavel;
         leitosDisponiveis.push(leito);
         leitosPendentes.splice(index, 1); 
         localStorage.setItem('leitosPendentes', JSON.stringify(leitosPendentes));
         localStorage.setItem('leitosDisponiveis', JSON.stringify(leitosDisponiveis));
         location.reload(); 
     } else {
         alert("O leito não pode ser concluído sem o nome do responsável.");
     }
 }