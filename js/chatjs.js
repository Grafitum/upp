const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");
const optionBtns = document.querySelectorAll(".option-btn");

// Lista turbinada de materiais e respostas
const respostas = {
  "papel": "📄 Papel deve ser colocado na lixeira azul.",
  "plastico": "🧴 Plásticos vão na lixeira vermelha.",
  "plástico": "🧴 Plásticos vão na lixeira vermelha.",
  "vidro": "🍾 Vidros vão na lixeira verde.",
  "metal": "🥫 Metais vão na lixeira amarela.",
  "orgânico": "🍌 Restos de comida vão na lixeira marrom.",
  "organico": "🍌 Restos de comida vão na lixeira marrom.",
  "pilha": "🔋 Pilhas e baterias devem ir em pontos de coleta específicos!",
  "bateria": "🔋 Pilhas e baterias devem ir em pontos de coleta específicos!",
  "eletronico": "💻 Lixo eletrônico vai para ecopontos especializados.",
  "eletrônico": "💻 Lixo eletrônico vai para ecopontos especializados.",
  "óleo": "🛢️ Óleo de cozinha deve ser armazenado em garrafa PET e levado a pontos de coleta.",
  "roupa": "👕 Roupas em bom estado podem ser doadas. As velhas vão para ecopontos têxteis.",
  "fralda": "🚫 Fraldas não são recicláveis, vão para o lixo comum.",
  "seringa": "⚠️ Seringas devem ser descartadas em postos de saúde.",
  "tinta": "🎨 Restos de tinta precisam ser entregues em pontos de coleta especiais."
};

// Função para enviar mensagem
function sendMessage(message) {
  if (!message) return;
  addMessage(message, "user");

  let resposta = procurarRespostaParcial(message);

  setTimeout(() => {
    addMessage(resposta, "bot");
  }, 500);
}

// Procura palavra chave **parcial** na mensagem
function procurarRespostaParcial(frase) {
  frase = frase.toLowerCase();
  for (let palavra in respostas) {
    if (frase.includes(palavra) || palavra.includes(frase)) {
      return respostas[palavra];
    }
  }
  return "❓ Não sei sobre esse material. Tente outro ou consulte o ecoponto da sua cidade!";
}

// Adiciona mensagem no chat
function addMessage(text, sender) {
  const msg = document.createElement("div");
  msg.classList.add(sender === "user" ? "user-message" : "bot-message");
  msg.textContent = text;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}

// Evento de clique no botão de enviar
sendBtn.addEventListener("click", () => {
  sendMessage(userInput.value.trim());
  userInput.value = "";
  userInput.focus();
});

// Enter no teclado
userInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    sendMessage(userInput.value.trim());
    userInput.value = "";
  }
});

// Evento para botões de opção
optionBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    sendMessage(btn.textContent);
  });
});

// Mensagem inicial do robô
window.onload = () => {
  addMessage("Olá! 🤖 O que vamos reciclar hoje? Escolha um dos botões ou digite algo! ♻️", "bot");
};
