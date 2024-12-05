function chooseSpecialAbility() {
  // Obtém a habilidade especial escolhida pelo jogador
  const specialAbility = document.getElementById("specialAbility").value;
  const descriptionText = document.getElementById("descriptionText");

  // Exibe a descrição da habilidade selecionada
  switch (specialAbility) {
    case "special1":
      descriptionText.innerText = "Dá ao usario a habilidade de dar grandes quantidades de dinheiro para os outros.";
      break;
    case "special2":
      descriptionText.innerText = "Descrição detalhada da Habilidade Especial 2.";
      break;
    case "special3":
      descriptionText.innerText = "Descrição detalhada da Habilidade Especial 3.";
      break;
    case "special4":
      descriptionText.innerText = "Descrição detalhada da Habilidade Especial 4.";
      break;
    default:
      descriptionText.innerText = "Nenhuma habilidade selecionada.";
      break;
  }
}

// Rolagem de Dados
function rollAttribute(attributeId) {
  // Recupera o valor do atributo diretamente da página
  const attributeValue = parseInt(document.getElementById(attributeId).innerText, 10);

  // Verifica se o valor do atributo é maior que 0
  if (attributeValue <= 0) {
    alert("Você não tem pontos nesse atributo!");
    return;
  }

  // Array para armazenar os resultados das roladas
  const rolls = [];
  
  // Rola um dado para cada ponto de atributo
  for (let i = 0; i < attributeValue; i++) {
    rolls.push(Math.floor(Math.random() * 6) + 1); // Rola 1d6 para cada ponto
  }

  // Determina o maior valor da rolagem
  const highestRoll = Math.max(...rolls);

  // Exibe o resultado na tela
  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = `
    <p>Rolagem para <strong>${attributeId}</strong>: [${rolls.join(", ")}]</p>
    <p>Maior valor: <strong>${highestRoll}</strong></p>
  `;
}


function rollSkill(skillId) {
  const skillValue = parseInt(document.getElementById(skillId).value, 10) || 0;

  if (skillValue <= 0) {
    alert("Você não tem pontos nessa habilidade!");
    return;
  }

  const rolls = [];
  for (let i = 0; i < skillValue; i++) {
    rolls.push(Math.floor(Math.random() * 6) + 1); // Rola 1d6 para cada ponto
  }

  // Determina o maior valor da rolagem
  const highestRoll = Math.max(...rolls);

  // Exibe o resultado na tela
  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = `
    <p>Rolagem para <strong>${skillId}</strong>: [${rolls.join(", ")}]</p>
    <p>Maior valor: <strong>${highestRoll}</strong></p>
  `;
}

function updateAttributes() {
  // Grupos de habilidades e seus atributos
  const skills = {
    insight: ["hunt", "study", "survey", "tinker"],
    prowess: ["finesse", "prowl", "skirmish", "wreck"],
    resolve: ["attune", "command", "consort", "sway"],
  };

  // Função para calcular o valor de um atributo
  function calculateAttribute(group) {
    return group.reduce((total, skillId) => {
      const skillValue = parseInt(document.getElementById(skillId).value, 10) || 0;
      return total + (skillValue > 0 ? 1 : 0);
    }, 0);
  }

  // Calcular os valores dos atributos
  const insightValue = calculateAttribute(skills.insight);
  const prowessValue = calculateAttribute(skills.prowess);
  const resolveValue = calculateAttribute(skills.resolve);

  // Limitar os valores dos atributos a 4
  document.getElementById("insight").innerText = Math.min(insightValue, 4);
  document.getElementById("prowess").innerText = Math.min(prowessValue, 4);
  document.getElementById("resolve").innerText = Math.min(resolveValue, 4);
}


// Função para editar os campos
function editField(fieldId) {
  const field = document.getElementById(fieldId);
  
  if (field.contentEditable === "true") {
    field.contentEditable = "false"; // Desabilita a edição
  } else {
    field.contentEditable = "true"; // Habilita a edição
    field.focus();
  }
}

// Função para alternar o botão de edição
function toggleEdit(type) {
  const fieldName = type === 'heritage' ? 'heritage' : 'background';
  const nameField = document.getElementById(`${fieldName}-name`);
  const descriptionField = document.getElementById(`${fieldName}-description`);
  
  // Habilitar edição de nome e descrição
  editField(`${fieldName}-name`);
  editField(`${fieldName}-description`);
  
  // Alterar o texto do botão de edição
  const button = document.getElementById(`${fieldName}-edit-btn`);
  if (button.innerHTML === "Editar") {
    button.innerHTML = "Salvar";
  } else {
    button.innerHTML = "Editar";
  }
}

   function previewImage(event) {
      const imagePreview = document.getElementById('image-preview');
      const file = event.target.files[0];

      if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
          imagePreview.style.backgroundImage = `url('${e.target.result}')`;
          imagePreview.style.backgroundSize = 'cover';
          imagePreview.style.backgroundPosition = 'center';
        };
        reader.readAsDataURL(file);
      }
    }

// URL do webhook do Discord
const webhookURL = 'https://discord.com/api/webhooks/1155208119668969524/jnNYAxJPlOsd87h0Zbiyl6poQjW0b-Gxomu0A3B7WmgMaM29Ysof69pDD-WmTSx6Ylly';

// Função para enviar resultado da rolagem
function sendRollResult(characterName, skillName, rollResult) {
  if (!characterName || !skillName || rollResult === undefined) {
    console.error("Dados insuficientes para enviar ao webhook.");
    return;
  }

  // Mensagem personalizada
  const content = `${characterName} rolou um ${rollResult} no teste de ${skillName}.`;

  // Enviar o webhook usando Fetch API
  fetch(webhookURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  })
    .then(response => {
      if (response.ok) {
        console.log("Mensagem enviada com sucesso para o Discord!");
      } else {
        console.error("Erro ao enviar mensagem:", response.statusText);
      }
    })
    .catch(error => console.error("Erro na requisição:", error));
}

 sendRollResult(characterName, skillName, rollResult);