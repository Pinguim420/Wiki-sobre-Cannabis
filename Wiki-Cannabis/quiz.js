const todasPerguntas = [
    {
      pergunta: "Qual é o principal componente psicoativo da cannabis?",
      opcoes: ["CBD", "THC", "CBN", "CBG"],
      resposta: 1
    },
    {
      pergunta: "Qual parte da planta de cannabis é normalmente usada para fins recreativos?",
      opcoes: ["Raiz", "Folha", "Sementes", "Flores"],
      resposta: 3
    },
    {
      pergunta: "Qual destes países descriminalizou totalmente o uso recreativo da cannabis?",
      opcoes: ["Brasil", "Uruguai", "Portugal", "Argentina"],
      resposta: 1
    },
    {
      pergunta: "O que significa a sigla CBD?",
      opcoes: [
        "Cannabidiol",
        "Cannabidioide",
        "Canabinol de Base Dupla",
        "Cannabis Baseada em Dados"
      ],
      resposta: 0
    },
    {
      pergunta: "O uso medicinal da cannabis é legalizado no Brasil?",
      opcoes: [
        "Não, é totalmente proibido",
        "Sim, com prescrição médica",
        "Sim, mas só em farmácias",
        "Apenas para pacientes com câncer"
      ],
      resposta: 1
    },
    {
      pergunta: "Qual órgão brasileiro regula o uso medicinal da cannabis?",
      opcoes: ["ANVISA", "OMS", "MAPA", "FUNAI"],
      resposta: 0
    },
    {
      pergunta: "Qual dessas condições pode ser tratada com derivados da cannabis?",
      opcoes: [
        "Autismo",
        "Epilepsia",
        "Doença de Parkinson",
        "Todas as anteriores"
      ],
      resposta: 3
    },
    {
      pergunta: "Quantas espécies principais de cannabis existem?",
      opcoes: ["1", "2", "3", "4"],
      resposta: 2
    },
    {
      pergunta: "O que significa o termo 'maconha medicinal'?",
      opcoes: [
        "Uso da planta inteira para tratar doenças",
        "Uso recreativo com acompanhamento médico",
        "Uso de compostos específicos da cannabis para fins terapêuticos",
        "Uso de cigarro de maconha em hospitais"
      ],
      resposta: 2
    },
    {
      pergunta: "Qual é uma preocupação comum sobre o uso excessivo de THC?",
      opcoes: [
        "Aumento da inteligência",
        "Dependência química e psicose",
        "Crescimento capilar",
        "Perda de peso extrema"
      ],
      resposta: 1
    },
    {
      pergunta: "Cannabis ruderalis é conhecida por quê?",
      opcoes: [
        "Alta concentração de THC",
        "Auto-florescimento",
        "Ser venenosa",
        "Origem africana"
      ],
      resposta: 1
    },
    {
      pergunta: "Qual é o método mais comum de extração de CBD?",
      opcoes: ["Fermentação", "Destilação com álcool", "CO2 supercrítico", "Infusão em óleo"],
      resposta: 2
    },
    {
      pergunta: "Qual é a legislação que permite o uso medicinal da cannabis no Brasil?",
      opcoes: ["Lei Maria da Penha", "RDC 327/2019", "PL 420", "Constituição"],
      resposta: 1
    },
    {
      pergunta: "O que é o sistema endocanabinoide?",
      opcoes: [
        "Um tipo de órgão sensorial",
        "Sistema regulador do corpo que interage com canabinoides",
        "Nome alternativo para sistema digestivo",
        "Substância da maconha"
      ],
      resposta: 1
    },
    {
      pergunta: "A cannabis pode ajudar no controle de:",
      opcoes: ["Ansiedade", "Dor crônica", "Insônia", "Todas as anteriores"],
      resposta: 3
    },
    {
      pergunta: "Qual destes é um efeito colateral do uso excessivo de cannabis?",
      opcoes: ["Hipervigilância", "Sonolência", "Fome", "Alucinações severas"],
      resposta: 3
    },
    {
      pergunta: "O que significa 'recreativo' no uso da cannabis?",
      opcoes: [
        "Uso em festas religiosas",
        "Uso em terapias alternativas",
        "Uso para relaxamento e lazer",
        "Uso por atletas profissionais"
      ],
      resposta: 2
    },
    {
      pergunta: "Qual dessas plantas é parente da cannabis?",
      opcoes: ["Camomila", "Lúpulo", "Alecrim", "Sálvia"],
      resposta: 1
    },
    {
      pergunta: "É possível cultivar cannabis legalmente no Brasil?",
      opcoes: [
        "Sim, qualquer um pode",
        "Não, é crime",
        "Sim, com autorização judicial",
        "Somente para pesquisas"
      ],
      resposta: 2
    },
    {
      pergunta: "O que é o cânhamo industrial?",
      opcoes: [
        "Cannabis com baixo THC usada para tecidos, papel e alimentos",
        "Um fertilizante agrícola",
        "Cannabis usada apenas para rituais religiosos",
        "Cannabis misturada com tabaco"
      ],
      resposta: 0
    }
  ];
  
  // Embaralha perguntas e seleciona 10 aleatórias
  let perguntasSelecionadas = [];
  let perguntaAtual = 0;
  let pontos = 0;
  let vidas = 3;
  
  const perguntaEl = document.getElementById("pergunta");
  const opcoesEl = document.getElementById("opcoes");
  const pontosEl = document.getElementById("pontos");
  const vidasEl = document.getElementById("vidas");
  const reiniciarBtn = document.getElementById("reiniciar");
  
  function embaralharPerguntas() {
    const copia = [...todasPerguntas];
    for (let i = copia.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copia[i], copia[j]] = [copia[j], copia[i]];
    }
    return copia.slice(0, 10);
  }
  
  function carregarPergunta() {
    if (vidas <= 0 || perguntaAtual >= perguntasSelecionadas.length) {
      mostrarResultado();
      return;
    }
  
    const atual = perguntasSelecionadas[perguntaAtual];
    perguntaEl.textContent = atual.pergunta;
    opcoesEl.innerHTML = "";
  
    atual.opcoes.forEach((opcao, index) => {
      const btn = document.createElement("button");
      btn.textContent = opcao;
      btn.onclick = () => verificarResposta(index);
      opcoesEl.appendChild(btn);
    });
  }
  
  function verificarResposta(indice) {
    const correta = perguntasSelecionadas[perguntaAtual].resposta;
    if (indice === correta) {
      pontos += 10;
    } else {
      vidas -= 1;
    }
    atualizarStatus();
    perguntaAtual++;
    carregarPergunta();
  }
  
  function atualizarStatus() {
    pontosEl.textContent = `Pontos: ${pontos}`;
    vidasEl.textContent = "❤️".repeat(vidas);
  }
  
  function mostrarResultado() {
    perguntaEl.textContent = vidas > 0
      ? `Quiz finalizado! Pontuação: ${pontos}`
      : "Você perdeu todas as vidas. 😢";
    opcoesEl.innerHTML = "";
    reiniciarBtn.style.display = "block";
  }
  
  reiniciarBtn.addEventListener("click", () => {
    perguntaAtual = 0;
    pontos = 0;
    vidas = 3;
    perguntasSelecionadas = embaralharPerguntas();
    reiniciarBtn.style.display = "none";
    atualizarStatus();
    carregarPergunta();
  });
  
  document.addEventListener("DOMContentLoaded", () => {
    perguntasSelecionadas = embaralharPerguntas();
    atualizarStatus();
    carregarPergunta();
  });
  