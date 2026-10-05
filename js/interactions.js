/**
 * LUCAS LENIAR — INTERACTIONS
 * Terminal Interativo, Chips de Execução Rápida, Abas do Hero, 
 * Simulador de Pensamento Computacional e Filtros Dinâmicos
 */

document.addEventListener('DOMContentLoaded', () => {
  initHeroShowcaseTabs();
  initTerminal();
  initCommandChips();
  initComputationalThinkingSimulator();
  initProjectFilters();
  initContactForm();
});

/**
 * 1. Abas do Hero Showcase (Terminal CLI / Matriz de Especialidades / Manifesto)
 */
function initHeroShowcaseTabs() {
  const tabBtns = document.querySelectorAll('.hero-tab-btn');
  const panes = document.querySelectorAll('.hero-pane');

  if (tabBtns.length === 0 || panes.length === 0) return;

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-hero-target');
      
      tabBtns.forEach(b => b.classList.remove('active'));
      panes.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const targetPane = document.getElementById(targetId);
      if (targetPane) {
        targetPane.classList.add('active');
      }
    });
  });
}

/**
 * 2. Terminal Interativo (CLI) & Chips de Comando
 */
function initTerminal() {
  const terminalInput = document.getElementById('terminal-cli-input');
  const terminalBody = document.getElementById('terminal-cli-body');
  if (!terminalInput || !terminalBody) return;

  const commands = {
    help: 'Comandos disponíveis:\n  - sobre: Biografia e atuação docente\n  - pilares: Os 4 pilares do Pensamento Computacional\n  - projetos: Principais projetos e softwares desenvolvidos\n  - utfpr: Formação acadêmica na Licenciatura em Computação\n  - skills: Matriz de competências técnicas e pedagógicas\n  - hardware: Tecnologias IoT, Arduino Uno/Nano e ESP32\n  - artigos: Ensaios e publicações pedagógicas\n  - curriculo: Abrir currículo executivo completo\n  - contato: Informações e links diretos (Email / GitHub)\n  - whoami: Identidade no sistema\n  - date: Data e hora do servidor\n  - clear: Limpar terminal',
    sobre: 'Lucas Mercer Leniar — Professor de Computação e Tecnologia Educacional em Ponta Grossa - PR.\nFormação: Licenciatura em Computação (UTFPR).\nAtuação: Pensamento Computacional, Robótica Pedagógica, Desenvolvimento de Software e Infraestrutura NOC.',
    pilares: 'Os 4 Pilares do Pensamento Computacional (BNCC):\n  [1] Decomposição: Dividir problemas complexos em partes tratáveis.\n  [2] Reconhecimento de Padrões: Identificar similaridades e tendências.\n  [3] Abstração: Focar no essencial e desconsiderar ruídos.\n  [4] Algoritmos: Construir instruções passo a passo para a solução.',
    projetos: 'Projetos em destaque:\n  • NOC UTFPR — Monitoramento e Infraestrutura de Rede\n  • Plataforma de Pensamento Computacional Didático\n  • Simuladores de Algoritmos e Lógica para Sala de Aula\n  • Estações Meteorológicas IoT com ESP32 & Robótica Arduino',
    skills: 'Matriz de Habilidades:\n  • Pedagogia: PBL, BNCC Computação, Metodologias Ativas, Cultura Maker\n  • Desenvolvimento: JavaScript/TypeScript, Python, C/C++ (Arduino), Bash\n  • Hardware & IoT: ESP32 (Wi-Fi/BLE), Arduino, Sensores, Protocolos MQTT\n  • Infraestrutura: GNU/Linux (Debian/Ubuntu), Redes TCP/IP, Git/GitHub',
    utfpr: 'Licenciatura em Computação (LCOMP) — UTFPR Câmpus Ponta Grossa.\nIntegração entre Ciência da Computação, Engenharia de Software, Hardware e Pedagogia Digital.',
    hardware: 'Hardware & IoT: Arquitetura x86 e microcontroladores AVR/Xtensa (Arduino / ESP32), Sensores Analógicos/Digitais, I2C/SPI, Redes TCP/IP e Servidores Linux.',
    artigos: 'Publicações & Ensaios em Destaque:\n  [1] Como a BNCC Computação Transforma a Educação Básica\n  [2] Robótica de Baixo Custo com Arduino e ESP32 nas Escolas\n  [3] Metodologias Ativas e Pensamento Computacional no Ensino de Algoritmos',
    curriculo: () => {
      const cvModal = document.getElementById('curriculum-modal-backdrop');
      if (cvModal) {
        cvModal.classList.add('is-open');
        return 'Abrindo Currículo Executivo do Professor Lucas Leniar...';
      }
      return 'Para ver o currículo, visite a página /sobre.html ou use o botão de currículo.';
    },
    contato: 'Email: lucasleniar@gmail.com\nGitHub: https://github.com/lucasmercer\nLocalização: Ponta Grossa, Paraná, Brasil.',
    whoami: 'lucas@utfpr-noc:~$ [Acesso: Professor de Computação / Autorizado]',
    date: () => new Date().toLocaleString('pt-BR'),
    
    sudo: () => {
      document.body.classList.toggle('hacker-mode');
      if (document.body.classList.contains('hacker-mode')) {
        return '[ROOT] Privilégios elevados. Bem-vindo ao Laboratório Hacker, aluno.';
      } else {
        return 'Privilégios revogados. Modo Professor restaurado.';
      }
    },
    clear: () => {
      terminalBody.innerHTML = '';
      return '';
    }
  };

  window.executeTerminalCommand = (cmdText) => {
    const rawVal = cmdText.trim();
    if (!rawVal) return;

    // Linha digitada
    const userLine = document.createElement('div');
    userLine.className = 'terminal-line';
    userLine.innerHTML = `<span class="terminal-prompt">lucas@utfpr-noc:~$</span> ${escapeHTML(rawVal)}`;
    terminalBody.appendChild(userLine);

    const cmdKey = rawVal.toLowerCase();
    let response = '';

    if (commands[cmdKey]) {
      if (typeof commands[cmdKey] === 'function') {
        response = commands[cmdKey]();
      } else {
        response = commands[cmdKey];
      }
    } else {
      response = `Comando não reconhecido: "${escapeHTML(rawVal)}". Digite "help" para ver a lista completa.`;
    }

    if (response) {
      const respLine = document.createElement('div');
      respLine.className = 'terminal-output';
      respLine.style.whiteSpace = 'pre-wrap';
      respLine.textContent = response;
      terminalBody.appendChild(respLine);
    }

    terminalInput.value = '';
    terminalBody.scrollTop = terminalBody.scrollHeight;
  };

  terminalInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      window.executeTerminalCommand(terminalInput.value);
    }
  });
}

/**
 * 3. Chips de Comando Clicáveis
 */
function initCommandChips() {
  const chips = document.querySelectorAll('.cmd-chip');
  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      const cmd = chip.getAttribute('data-cmd');
      if (cmd && window.executeTerminalCommand) {
        window.executeTerminalCommand(cmd);
      }
    });
  });
}

function escapeHTML(str) {
  return str.replace(/[&<>'"]/g, 
    tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
  );
}

/**
 * 4. Simulador de Pensamento Computacional
 */
function initComputationalThinkingSimulator() {
  const problemSelect = document.getElementById('sim-problem-selector');
  const tabs = document.querySelectorAll('.sim-tab-btn');
  const titleEl = document.getElementById('sim-step-title');
  const descEl = document.getElementById('sim-step-desc');
  const exampleEl = document.getElementById('sim-step-example');
  
  if (!problemSelect || !titleEl || !descEl || !exampleEl) return;

  const problemData = {
    semaforo: {
      decomposicao: {
        title: '1. Decomposição (Semáforo Inteligente)',
        desc: 'Dividimos o problema geral "Controlar cruzamento com tráfego dinâmico" em partes menores e isoladas.',
        example: '• Módulo 1: Leitura do sensor ultrassônico/presença na via secundária.\n• Módulo 2: Temporização do ciclo verde/amarelo/vermelho na via principal.\n• Módulo 3: Lógica de segurança para travessia de pedestres (botão).\n• Módulo 4: Acionamento físico dos LEDs e relés de potência.'
      },
      padroes: {
        title: '2. Reconhecimento de Padrões (Semáforo Inteligente)',
        desc: 'Identificamos repetições e semelhanças com ciclos anteriores e padrões de trânsito.',
        example: '• Padrão 1: O amarelo sempre precede o vermelho por exatamente 3 segundos.\n• Padrão 2: Em horários de pico (7h-8h / 18h-19h) o tempo de via principal é 40% maior.\n• Padrão 3: Sempre que o botão de pedestre é pressionado, inicia-se uma contagem regressiva.'
      },
      abstracao: {
        title: '3. Abstração (Semáforo Inteligente)',
        desc: 'Filtramos o que é crucial para a lógica e descartamos detalhes irrelevantes.',
        example: '• Essencial: Há veículo esperando? (SIM/NÃO), Tempo decorrido (segundos), Cor atual da luz.\n• Irrelevante para o algoritmo: Cor dos carros, modelo dos veículos, temperatura ambiente externa.'
      },
      algoritmo: {
        title: '4. Algoritmo (Semáforo Inteligente)',
        desc: 'Construímos o fluxo sequencial de decisões passo a passo.',
        example: '1. Inicializar pinos do Arduino como SAÍDA (Vermelho, Amarelo, Verde).\n2. Luz Verde da via principal LIGADA por padrão.\n3. SE sensor detectar carro na via secundária POR MAIS DE 5s:\n   a. Luz Verde principal APAGA.\n   b. Luz Amarela principal ACENDE por 3s.\n   c. Luz Vermelha principal ACENDE e Verde secundária ACENDE por 15s.\n4. Retornar ao ciclo principal em loop contínuo.'
      }
    },
    robo: {
      decomposicao: {
        title: '1. Decomposição (Robô Seguidor de Linha)',
        desc: 'Dividir a navegação autônoma em submódulos de sensoriamento, cálculo e motricidade.',
        example: '• Leitura dos sensores ópticos reflexivos infravermelhos (TCRT5000).\n• Determinação do erro de centralização sobre a fita preta.\n• Controle diferencial de velocidade para motor esquerdo e direito.\n• Tratamento de encruzilhadas e fim de pista.'
      },
      padroes: {
        title: '2. Reconhecimento de Padrões (Robô Seguidor de Linha)',
        desc: 'Mapear comportamentos esperados com base no estado dos sensores.',
        example: '• Ambos os sensores no branco: Seguir em frente com velocidade máxima.\n• Sensor esquerdo no preto: Curva acentuada à esquerda (reduzir motor esquerdo).\n• Sensor direito no preto: Curva acentuada à direita (reduzir motor direito).\n• Ambos no preto: Linha transversal (parada ou contagem de checkpoint).'
      },
      abstracao: {
        title: '3. Abstração (Robô Seguidor de Linha)',
        desc: 'Modelar apenas as variáveis matemáticas essenciais.',
        example: '• Foco: Valor binário ou analógico do sensor (0 a 1023) e PWM dos motores (0 a 255).\n• Ignorado: Peso da carcaça do robô, cor da madeira da mesa fora da pista.'
      },
      algoritmo: {
        title: '4. Algoritmo (Robô Seguidor de Linha)',
        desc: 'Lógica em malha fechada executada a cada ciclo de 10ms.',
        example: '1. Ler SensorEsquerdo e SensorDireito.\n2. SE (SensorEsquerdo == 0 E SensorDireito == 0) ENTÃO:\n   MotorEsquerdo = 200; MotorDireito = 200;\n3. SENÃO SE (SensorEsquerdo == 1 E SensorDireito == 0) ENTÃO:\n   MotorEsquerdo = 50; MotorDireito = 200; // Correção esquerda\n4. SENÃO SE (SensorEsquerdo == 0 E SensorDireito == 1) ENTÃO:\n   MotorEsquerdo = 200; MotorDireito = 50; // Correção direita\n5. Repetir loop infinito.'
      }
    },
    escola: {
      decomposicao: {
        title: '1. Decomposição (Gestão de Presença Escolar)',
        desc: 'Dividir o sistema de chamada escolar em componentes independentes.',
        example: '• Cadastro de turmas, disciplinas e alunos.\n• Mecanismo de registro de presença (RFID ou aplicativo web).\n• Cálculo automático de porcentagem de faltas conforme LDB.\n• Notificação automática aos responsáveis em caso de falta consecutiva.'
      },
      padroes: {
        title: '2. Reconhecimento de Padrões (Gestão de Presença Escolar)',
        desc: 'Identificar comportamentos recorrentes nos dados de frequência.',
        example: '• Faltas concentradas em sextas-feiras ou primeiras aulas.\n• Correlação entre índice de faltas e queda de rendimento em avaliações.\n• Padrão sazonal em épocas de inverno ou provas bimestrais.'
      },
      abstracao: {
        title: '3. Abstração (Gestão de Presença Escolar)',
        desc: 'Criar o modelo de dados sem carregar ruídos.',
        example: '• Dados necessários: ID_Aluno, Data, Aula_ID, Presente (Booleano).\n• Dados irrelevantes para o algoritmo de chamada: Número do calçado, time de futebol.'
      },
      algoritmo: {
        title: '4. Algoritmo (Gestão de Presença Escolar)',
        desc: 'Fluxo para processamento do diário de classe.',
        example: '1. Professor abre turma no sistema.\n2. Para cada aluno na lista:\n   SE cartão RFID aproximado OU marcado presente: Status = "P";\n   SENÃO: Status = "F";\n3. Calcular FaltasAcumuladas do aluno.\n4. SE FaltasAcumuladas > 25% da carga horária: Disparar alerta de risco de evasão.\n5. Salvar registro com timestamp no banco de dados.'
      }
    }
  };

  let currentProblem = 'semaforo';
  let currentPillar = 'decomposicao';

  const updateView = () => {
    const data = problemData[currentProblem][currentPillar];
    titleEl.textContent = data.title;
    descEl.textContent = data.desc;
    exampleEl.textContent = data.example;
  };

  problemSelect.addEventListener('change', (e) => {
    currentProblem = e.target.value;
    updateView();
  });

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      currentPillar = tab.getAttribute('data-pillar');
      updateView();
    });
  });

  updateView();
}

/**
 * 5. Filtros e Busca Dinâmica de Projetos
 */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.project-filter-btn');
  const projectCards = document.querySelectorAll('[data-project-category]');
  const searchInput = document.getElementById('project-search-input');
  
  if (filterBtns.length === 0 || projectCards.length === 0) return;

  let activeFilter = 'all';
  let searchQuery = '';

  const applyFilters = () => {
    projectCards.forEach(card => {
      const categories = card.getAttribute('data-project-category').split(' ');
      const text = card.textContent.toLowerCase();
      
      const matchesCategory = (activeFilter === 'all' || categories.includes(activeFilter));
      const matchesSearch = (!searchQuery || text.includes(searchQuery));

      if (matchesCategory && matchesSearch) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    });
  };

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeFilter = btn.getAttribute('data-filter');
      applyFilters();
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.toLowerCase().trim();
      applyFilters();
    });
  }
}

/**
 * 6. Formulário de Contato Acessível
 */
function initContactForm() {
  const contactForm = document.getElementById('contact-form');
  const feedback = document.getElementById('contact-form-feedback');
  if (!contactForm || !feedback) return;

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    if (!contactForm.checkValidity()) {
      contactForm.reportValidity();
      return;
    }

    const name = document.getElementById('contact-name').value;
    const email = document.getElementById('contact-email').value;
    const subject = document.getElementById('contact-subject').value;
    const message = document.getElementById('contact-message').value;

    const mailtoUrl = `mailto:lucasleniar@gmail.com?subject=${encodeURIComponent(`[Contato Site] ${subject} - de ${name}`)}&body=${encodeURIComponent(`Nome: ${name}\nEmail: ${email}\n\nMensagem:\n${message}`)}`;

    feedback.innerHTML = `<strong>Mensagem preparada com sucesso!</strong><br>Você pode enviar diretamente pelo seu cliente de email padrão através do link abaixo ou enviar manualmente para <code>lucasleniar@gmail.com</code>.<br><br><a href="${mailtoUrl}" class="btn btn-primary btn-sm" style="margin-top: 0.5rem;">Abrir Email para Enviar</a>`;
    feedback.className = 'form-feedback success';
    feedback.style.display = 'block';

    contactForm.reset();
  });
}

