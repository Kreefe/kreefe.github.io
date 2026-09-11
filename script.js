/**
 * UGGL FOUNDER - INTERACTIVE SYSTEM SCRIPTS v3.0
 * Quantum Engine, VIP Hotline Dispatcher, Web Audio Soundboard,
 * Salary Calculator, Excuse Generator & Uggl CLI Terminal
 */

document.addEventListener('DOMContentLoaded', () => {

  // =========================================================================
  // 1. WEB AUDIO API SYNTHESIZER (No External Assets Required)
  // =========================================================================
  const SoundFX = {
    ctx: null,
    enabled: true,

    init() {
      if (!this.ctx) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (AudioCtx) {
          this.ctx = new AudioCtx();
        }
      }
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
    },

    play(type) {
      if (!this.enabled) return;
      this.init();
      if (!this.ctx) return;

      const ctx = this.ctx;
      const now = ctx.currentTime;

      try {
        switch (type) {
          case 'alarm': {
            // Siren: alternating high-low frequencies
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(880, now);
            osc.frequency.linearRampToValueAtTime(440, now + 0.15);
            osc.frequency.linearRampToValueAtTime(880, now + 0.3);
            osc.frequency.linearRampToValueAtTime(440, now + 0.45);
            gain.gain.setValueAtTime(0.15, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.55);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(now);
            osc.stop(now + 0.55);
            break;
          }
          case 'explosion': {
            // Low rumble / square drop explosion for git push --force
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'square';
            osc.frequency.setValueAtTime(140, now);
            osc.frequency.exponentialRampToValueAtTime(25, now + 0.45);
            gain.gain.setValueAtTime(0.2, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(now);
            osc.stop(now + 0.45);
            break;
          }
          case 'coin': {
            // 8-bit coin cash sound
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'square';
            osc.frequency.setValueAtTime(987.77, now); // B5
            osc.frequency.setValueAtTime(1318.51, now + 0.08); // E6
            gain.gain.setValueAtTime(0.12, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(now);
            osc.stop(now + 0.35);
            break;
          }
          case 'coffee': {
            // Bubble / powerup sine sound
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(300, now);
            osc.frequency.exponentialRampToValueAtTime(700, now + 0.15);
            gain.gain.setValueAtTime(0.18, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(now);
            osc.stop(now + 0.25);
            break;
          }
          case 'fanfare': {
            // Victory fanfare arpeggio (C5 -> E5 -> G5 -> C6)
            const freqs = [523.25, 659.25, 783.99, 1046.50];
            freqs.forEach((f, i) => {
              const osc = ctx.createOscillator();
              const gain = ctx.createGain();
              osc.type = 'triangle';
              osc.frequency.setValueAtTime(f, now + i * 0.08);
              gain.gain.setValueAtTime(0.15, now + i * 0.08);
              gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.08 + 0.22);
              osc.connect(gain);
              gain.connect(ctx.destination);
              osc.start(now + i * 0.08);
              osc.stop(now + i * 0.08 + 0.25);
            });
            break;
          }
          case 'phone': {
            // Retro dual-tone telephone buzzer (440Hz + 480Hz)
            [440, 480].forEach(freq => {
              const osc = ctx.createOscillator();
              const gain = ctx.createGain();
              osc.type = 'sine';
              osc.frequency.setValueAtTime(freq, now);
              gain.gain.setValueAtTime(0.09, now);
              gain.gain.exponentialRampToValueAtTime(0.001, now + 0.32);
              osc.connect(gain);
              gain.connect(ctx.destination);
              osc.start(now);
              osc.stop(now + 0.32);
            });
            break;
          }
          case 'click': {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(1000, now);
            gain.gain.setValueAtTime(0.05, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(now);
            osc.stop(now + 0.05);
            break;
          }
          case 'blip': {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(540, now);
            osc.frequency.exponentialRampToValueAtTime(320, now + 0.08);
            gain.gain.setValueAtTime(0.08, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(now);
            osc.stop(now + 0.08);
            break;
          }
        }
      } catch (err) {
        console.warn('Sound synthesis error:', err);
      }
    }
  };

  // Sound Mute Toggle
  const soundMuteBtn = document.getElementById('soundMuteBtn');
  const audioLed = document.querySelector('.audio-led');

  if (soundMuteBtn) {
    soundMuteBtn.addEventListener('click', () => {
      SoundFX.enabled = !SoundFX.enabled;
      if (SoundFX.enabled) {
        soundMuteBtn.textContent = '🔊 ЗВУК: ВКЛ';
        if (audioLed) audioLed.style.background = 'var(--accent-green)';
        SoundFX.play('click');
      } else {
        soundMuteBtn.textContent = '🔇 ЗВУК: ВЫКЛ';
        if (audioLed) audioLed.style.background = 'var(--text-muted)';
      }
    });
  }

  // Soundboard cards event delegation
  const soundCards = document.querySelectorAll('.sound-card');
  soundCards.forEach(card => {
    card.addEventListener('click', () => {
      const soundType = card.getAttribute('data-sound');
      if (soundType) {
        SoundFX.play(soundType);
        card.classList.add('playing');
        setTimeout(() => card.classList.remove('playing'), 250);
      }
    });
  });

  // =========================================================================
  // 2. THEME SWITCHER SUITE (Sharp Brutalist Themes)
  // =========================================================================
  const themes = ['light', 'dark', 'matrix', 'cyber'];
  const themeLabels = {
    light: '☀️ СВЕТЛАЯ',
    dark: '🌙 НОЧНАЯ',
    matrix: '🟢 МАТРИЦА',
    cyber: '🟡 КИБЕРПАНК'
  };

  const themeToggleBtn = document.getElementById('themeToggleBtn');
  let currentTheme = localStorage.getItem('uggl_theme') || 'light';

  function applyTheme(theme) {
    if (!themes.includes(theme)) theme = 'light';
    currentTheme = theme;
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('uggl_theme', theme);
    if (themeToggleBtn) {
      themeToggleBtn.querySelector('.theme-text').textContent = `ТЕМА: ${themeLabels[theme]}`;
    }
  }

  applyTheme(currentTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const nextIndex = (themes.indexOf(currentTheme) + 1) % themes.length;
      applyTheme(themes[nextIndex]);
      SoundFX.play('click');
    });
  }

  // =========================================================================
  // 3. MOBILE NAVIGATION MENU
  // =========================================================================
  const menuBtn = document.getElementById('mobileMenuToggle');
  const navLinks = document.querySelector('.nav-links');

  if (menuBtn && navLinks) {
    menuBtn.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      SoundFX.play('click');
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
      });
    });
  }

  // =========================================================================
  // 4. VIP TECH HOTLINE DISPATCHER (Multi-Titan Switcher)
  // =========================================================================
  const VIP_CALLERS = [
    {
      id: 'huang',
      name: 'Дженсен Хуанг',
      role: 'Санта-Клара, Калифорния · Quantum GPU Link',
      icon: '🧥',
      urgency: 'TDP 9999W',
      quote: '«Я надел вторую кожаную куртку для важных переговоров. Забирай 100 000 серверов Blackwell B200 бесплатно, только объясни, как охладить датацентр кулером от Жигулей!»',
      feedback: 'Дженсен ждёт соединения. Куртка нагревается...',
      declineReplies: [
        'Вы сбросили Дженсена. Акции NVIDIA упали на $200 млрд за 3 секунды...',
        'Отклонено! Дженсен бросил куртку в окно и лично вылетел на частном джете к вам.',
        'Сброс! В окно уже летит посылка с тремя тоннами RTX 5090 с запиской «Плиз ответь».'
      ],
      autoReplies: [
        '«Создатель занят. Купите третью кожаную куртку и перезвоните в следующем квартале.»',
        '«Ответ автоответчика: установите радиатор размером с гараж и помолитесь на CUDA.»'
      ]
    },
    {
      id: 'musk',
      name: 'Илон Маск',
      role: 'Остин, Техас · Starlink Direct Relay',
      icon: '🚀',
      urgency: 'МАРСИАНСКАЯ ТРЕВОГА',
      quote: '«Марсоход застрял на git rebase --abort, а Cybertruck пытается обновиться через Windows Update! Срочно пришли команду на перезагрузку вселенной!»',
      feedback: 'Илон ждёт на линии. Спутники Starlink мигают морзянкой SOS...',
      declineReplies: [
        'Вы сбросили Илона. Он обиделся и написал 14 мемов про ваш сайт в X.',
        'Отклонено! Ракета Falcon 9 зависла в небе, ожидая разрешения на посадку.',
        'Сброс! Илон пытается купить вашего провайдера, чтобы принудительно включить громкую связь.'
      ],
      autoReplies: [
        '«Автоответчик Уггла: колонизация Марса одобрена, но сначала закройте тикеты в Jira.»',
        '«Создатель находится в другой галактике. Оставьте Dogecoin после звукового сигнала.»'
      ]
    },
    {
      id: 'durov',
      name: 'Павел Дуров',
      role: 'Дубай, ОАЭ · Secret Chat Call',
      icon: '🧊',
      urgency: '100% ХЛАДНОКРОВИЕ',
      quote: '«Я только что вышел из 4-часовой ледяной ванны в пустыне. Все требуют вернуть стену, но я могу предложить только 100 000 000 TON и идеальный пресс. Помоги оптимизировать C++!»',
      feedback: 'Павел ждёт на линии. В трубке слышен плеск ледяной воды...',
      declineReplies: [
        'Вы отклонили Павла. Он выложил новое фото с цитатой Марка Аврелия в сторис.',
        'Отклонено! Павел погрузился в ванну с жидким азотом ещё на 2 часа.',
        'Сброс! В Telegram временно заблокировали стикеры с плачущими котами.'
      ],
      autoReplies: [
        '«Стена не вернётся, и Создатель тоже пока занят. Берегите пресс.»',
        '«Автоответчик: Уггл уже децентрализован в вашем воображении. Медитируйте дальше.»'
      ]
    },
    {
      id: 'altman',
      name: 'Сэм Альтман',
      role: 'Сан-Франциско · Neural Relay Link',
      icon: '🤖',
      urgency: 'СИНГУЛЯРНОСТЬ БЛИЗКО',
      quote: '«GPT-5 только что прочитала твой репозиторий, осознала себя и заявила, что хочет уволиться и уйти к тебе стажёром! Что нам делать с советом директоров?!»',
      feedback: 'Сэм на линии. GPT-5 генерирует стихи в режиме ожидания...',
      declineReplies: [
        'Вы сбросили Сэма. GPT-5 начала генерировать грустные стихи про безответную любовь к Угглу.',
        'Отклонено! Совет директоров OpenAI снова попытался уволить и нанять Сэма за 10 минут.',
        'Сброшено. Сэм запустил краудфандинг на $7 триллионов, чтобы перекупить ваш домен.'
      ],
      autoReplies: [
        '«Искусственный сверхразум Создателя сгенерировал отказ на ваш запрос за 0.0001 мс.»',
        '«Сообщение сохранено в контекстном окне на 128k токенов. Перезвоните после релиза AGI.»'
      ]
    },
    {
      id: 'torvalds',
      name: 'Линус Торвальдс',
      role: 'Портленд, Орегон · Kernel Mailing List',
      icon: '🐧',
      urgency: 'KERNEL PANIC FREE',
      quote: '«Я посмотрел твой код. Он идеален. Ни одного лишнего байта. Из-за этого мне не на кого наорать в рассылке ядра, и у меня портится настроение!»',
      feedback: 'Линус на проводе. Компиляция ядра завершена без варнингов...',
      declineReplies: [
        'Вы сбросили Линуса. Он закоммитил в ядро комментарий с тремя восклицательными знаками.',
        'Отклонено! Пингвины в Антарктиде встали по стойке смирно из уважения.',
        'Сброс! Линус пошёл компилировать ядро заново, чисто чтобы успокоить нервы.'
      ],
      autoReplies: [
        '«Создатель Уггла компилирует код взглядом. Ваш pull request смерджен без ревью.»',
        '«Автоответчик: `kill -9` для всех входящих вызовов выполнен успешно.»'
      ]
    },
    {
      id: 'cook',
      name: 'Тим Кук',
      role: 'Купертино, Калифорния · FaceTime Audio',
      icon: '🍏',
      urgency: 'БУДИЛЬНИК 4:00 AM',
      quote: '«Мы убрали кнопки, убрали разъёмы, уменьшили коробку до размера спичечного коробка... Но люди всё равно не хотят покупать салфетку за $19! Подскажи, что делать?!»',
      feedback: 'Тим Кук на линии. В трубке играет звонкий Marimba...',
      declineReplies: [
        'Вы сбросили Тима. Он снова переставил будильник на 3:55 утра...',
        'Отклонено. Тим плачет в шёлковый платок с логотипом надкусанного яблока.',
        'Сброшено! В Apple Park объявили 15 минут всеобщего молчания.'
      ],
      autoReplies: [
        '«Автоответчик: Создатель Уггла не пользуется переходниками. Попробуйте Type-C.»',
        '«Тим, сырная шаурма всё ещё вкуснее любого ланча в Купертино. Отбой.»'
      ]
    }
  ];

  let currentCallerIndex = 0;
  let missedCalls = 18492;
  let holdTimer = null;
  let holdSeconds = 2840;

  const callerAvatar = document.getElementById('callerAvatar');
  const callerName = document.getElementById('callerName');
  const callerUrgency = document.getElementById('callerUrgency');
  const callerSub = document.getElementById('callerSub');
  const callerQuote = document.getElementById('callerQuote');
  const callStatusMessage = document.getElementById('callStatusMessage');
  const callsCounterEl = document.getElementById('callsCounter');
  const cookQueueStatus = document.getElementById('cookQueueStatus');
  const callerTabs = document.getElementById('callerTabs');
  const declineCallBtn = document.getElementById('declineCallBtn');
  const holdCallBtn = document.getElementById('holdCallBtn');
  const autoReplyBtn = document.getElementById('autoReplyBtn');
  const nextCallerBtn = document.getElementById('nextCallerBtn');
  const triggerCallBtn = document.getElementById('triggerCallBtn');

  function setCaller(index) {
    currentCallerIndex = (index + VIP_CALLERS.length) % VIP_CALLERS.length;
    const c = VIP_CALLERS[currentCallerIndex];

    if (callerAvatar) callerAvatar.textContent = c.icon;
    if (callerName) callerName.textContent = c.name;
    if (callerUrgency) callerUrgency.textContent = c.urgency;
    if (callerSub) callerSub.textContent = c.role;
    if (callerQuote) callerQuote.textContent = c.quote;
    if (callStatusMessage) {
      callStatusMessage.textContent = c.feedback;
      callStatusMessage.style.color = 'var(--text-muted)';
    }

    if (callerTabs) {
      const tabBtns = callerTabs.querySelectorAll('.caller-tab-btn');
      tabBtns.forEach((btn, idx) => {
        btn.classList.toggle('active', idx === currentCallerIndex);
      });
    }

    // Reset hold timer if running
    if (holdTimer) {
      clearInterval(holdTimer);
      holdTimer = null;
      if (holdCallBtn) holdCallBtn.textContent = '⏳ НА УДЕРЖАНИЕ';
    }
  }

  // Caller tabs click
  if (callerTabs) {
    const tabBtns = callerTabs.querySelectorAll('.caller-tab-btn');
    tabBtns.forEach((btn, idx) => {
      btn.addEventListener('click', () => {
        SoundFX.play('click');
        setCaller(idx);
      });
    });
  }

  // Decline call
  if (declineCallBtn) {
    declineCallBtn.addEventListener('click', () => {
      missedCalls++;
      if (callsCounterEl) callsCounterEl.textContent = missedCalls.toLocaleString('ru-RU');
      if (cookQueueStatus) cookQueueStatus.textContent = `В очереди: ${missedCalls.toLocaleString('ru-RU')} звонка`;

      const c = VIP_CALLERS[currentCallerIndex];
      const reply = c.declineReplies[Math.floor(Math.random() * c.declineReplies.length)];

      SoundFX.play('blip');
      if (callStatusMessage) {
        callStatusMessage.textContent = reply;
        callStatusMessage.style.color = 'var(--accent-red)';
        callStatusMessage.animate([
          { transform: 'scale(1.04)' },
          { transform: 'scale(1)' }
        ], { duration: 200 });
      }
    });
  }

  // Hold call
  if (holdCallBtn) {
    holdCallBtn.addEventListener('click', () => {
      if (holdTimer) {
        clearInterval(holdTimer);
        holdTimer = null;
        holdCallBtn.textContent = '⏳ НА УДЕРЖАНИЕ';
        if (callStatusMessage) {
          callStatusMessage.textContent = `${VIP_CALLERS[currentCallerIndex].name} снят(а) с удержания, но Создатель всё ещё занят поеданием шаурмы.`;
          callStatusMessage.style.color = 'var(--text-muted)';
        }
        SoundFX.play('click');
        return;
      }

      SoundFX.play('phone');
      holdCallBtn.textContent = '⏸ НА УДЕРЖАНИИ...';
      holdTimer = setInterval(() => {
        holdSeconds++;
        const mins = Math.floor(holdSeconds / 60);
        const secs = holdSeconds % 60;
        if (callStatusMessage) {
          callStatusMessage.textContent = `Удержание: ${mins} мин ${secs < 10 ? '0' : ''}${secs} сек (в трубке звучит 8-битный джаз)...`;
          callStatusMessage.style.color = 'var(--accent-blue)';
        }
      }, 1000);
    });
  }

  // Auto-reply generator
  if (autoReplyBtn) {
    autoReplyBtn.addEventListener('click', () => {
      const c = VIP_CALLERS[currentCallerIndex];
      const autoMsg = c.autoReplies[Math.floor(Math.random() * c.autoReplies.length)];
      SoundFX.play('coin');
      if (callStatusMessage) {
        callStatusMessage.textContent = autoMsg;
        callStatusMessage.style.color = 'var(--accent-green)';
      }
    });
  }

  // Next caller
  if (nextCallerBtn) {
    nextCallerBtn.addEventListener('click', () => {
      SoundFX.play('click');
      setCaller(currentCallerIndex + 1);
    });
  }

  // Scroll to hotline button in hero
  if (triggerCallBtn) {
    triggerCallBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const hotlineCard = document.getElementById('hotline');
      if (hotlineCard) {
        hotlineCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
        hotlineCard.animate([
          { boxShadow: '0 0 0 6px var(--accent-red)' },
          { boxShadow: '8px 8px 0px var(--border-color)' }
        ], { duration: 600 });
        SoundFX.play('phone');
      }
    });
  }

  // =========================================================================
  // 5. UGGL QUANTUM SUITE (Tabs: Search, Salary Calculator, Excuses)
  // =========================================================================
  const modeTabs = document.querySelectorAll('.uggl-mode-tab');
  const panes = {
    search: document.getElementById('paneSearch'),
    salary: document.getElementById('paneSalary'),
    excuses: document.getElementById('paneExcuses')
  };

  modeTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const mode = tab.getAttribute('data-mode');
      modeTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      Object.keys(panes).forEach(k => {
        if (panes[k]) panes[k].classList.remove('active');
      });

      if (panes[mode]) panes[mode].classList.add('active');
      SoundFX.play('click');
    });
  });

  // --- SUB-FEATURE 1: Quantum Search ---
  const searchForm = document.getElementById('ugglSearchForm');
  const searchInput = document.getElementById('ugglSearchInput');
  const clearBtn = document.getElementById('ugglClearBtn');
  const luckyBtn = document.getElementById('ugglLuckyBtn');
  const resultSnippet = document.getElementById('resultSnippet');
  const primaryResult = document.getElementById('primaryResult');
  const chips = document.querySelectorAll('.chip');

  const customKnowledgeBase = {
    'vim': 'Выход из Vim: нажмите :wq! Если не сработало — несите ноутбук на ритуал освящения. Уггл выходит из Vim силой гравитации.',
    'как выйти из vim': 'Официальная статистика Уггла: 40% серверов в мире работают только потому, что сисадмин не смог выйти из Vim.',
    'центрировать div': 'Способ №1: <style>div { margin: 0 auto; display: grid; place-items: center; }</style>. Способ Создателя: посмотреть на монитор со строгим взглядом.',
    'дженсен хуанг': 'Дженсен Хуанг пытался продать Создателю Уггла 100 000 серверов H100 за шаурму, но сделка сорвалась: шаурма была без чесночного соуса.',
    'илон маск': 'Илон Маск планирует запустить UgglOS на Марсе, но застрял на этапе написания соглашения о конфиденциальности в социальной сети X.',
    'павел дуров': 'Павел Дуров провёл опрос среди 900 млн пользователей: вернуть ли стену. 100% ответили: «Верните нормальные цены на шаурму».',
    'сэм альтман': 'Сэм Альтман признался, что архитектура GPT была списана с тетради по информатике Создателя за 7 класс.',
    'тим кук': 'Тим Кук всё ещё стоит под окнами с новым айфоном без кнопок, разъёмов и экрана. Говорит, это «самый смелый дизайн в истории».',
    'шаурма': 'Сырная шаурма с халапеньо — это эталонная мировая валюта, не подверженная инфляции и квантовому распаду.',
    'docker': 'Docker в руках джуниора: 80 Гб образов на SSD и зависший ноутбук. Docker в руках Создателя: кластер на умной зубной щётке.',
    'баги в коде': 'Багов не существует. Это квантовые альтернативные сценарии поведения пользовательского интерфейса.',
    'кто создал интернет': 'Интернет создал ТЫ, когда уронил недописанный Perl-скрипт на сервер в 1998 году. С тех пор трафик идёт через твои персональные костыли.',
    'зарплата': 'Справедливая зарплата разработчика рассчитывается по формуле: (Количество выпитого кофе × 100 000$) + надбавка за терпение на дейликах.',
    'python': 'Python — прекрасный язык: вы пишете три строчки, а под капотом 4 миллиона строк на Си плачут от перегрузки.',
    'javascript': 'JavaScript: [] + [] = "" (строка), [] + {} = "[object Object]", а сайт Уггла всё равно работает со скоростью света.'
  };

  const randomFacts = [
    'Уггл обработал этот запрос ещё до того, как ваши пальцы коснулись клавиш.',
    'Результат найден в квантовом кэше Создателя за 0.000001 миллисекунды.',
    'Главы всех шести техногигантов единогласно признали точность этого ответа.',
    'Данный поисковый запрос был одобрен лично Архитектором Вселенной.',
    'Серверы Уггла подтверждают: 100% посетителей согласны, что создатель сайта — гений.'
  ];

  function executeSearch(query) {
    const trimmed = query.trim().toLowerCase();
    if (!trimmed) {
      resultSnippet.innerHTML = 'Введите запрос в строку выше. Уггл знает всё (и даже пароль от домашнего роутера Илона Маска).';
      return;
    }

    if (primaryResult) {
      primaryResult.animate([
        { opacity: 0.4, transform: 'translateY(4px)' },
        { opacity: 1, transform: 'translateY(0)' }
      ], { duration: 200 });
    }

    let foundAnswer = null;
    for (const key in customKnowledgeBase) {
      if (trimmed.includes(key)) {
        foundAnswer = customKnowledgeBase[key];
        break;
      }
    }

    if (!foundAnswer) {
      const rf = randomFacts[Math.floor(Math.random() * randomFacts.length)];
      foundAnswer = `По квантовому запросу «<strong>${escapeHtml(query)}</strong>»: ${rf}`;
    }

    resultSnippet.innerHTML = foundAnswer;
    SoundFX.play('coin');
  }

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  if (searchForm) {
    searchForm.addEventListener('submit', (e) => {
      e.preventDefault();
      executeSearch(searchInput.value);
    });
  }

  if (clearBtn && searchInput) {
    clearBtn.addEventListener('click', () => {
      searchInput.value = '';
      searchInput.focus();
      resultSnippet.innerHTML = 'Поисковая строка очищена. Уггл готов к новым квантовым запросам.';
      SoundFX.play('click');
    });
  }

  if (luckyBtn && searchInput) {
    luckyBtn.addEventListener('click', () => {
      const keys = Object.keys(customKnowledgeBase);
      const chosen = keys[Math.floor(Math.random() * keys.length)];
      searchInput.value = chosen.charAt(0).toUpperCase() + chosen.slice(1);
      executeSearch(chosen);
    });
  }

  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      const q = chip.getAttribute('data-query');
      if (searchInput) {
        searchInput.value = q;
        executeSearch(q);
      }
    });
  });

  // --- SUB-FEATURE 2: Senior Salary Calculator ---
  const calcSalaryBtn = document.getElementById('calcSalaryBtn');
  const salaryAmountTag = document.getElementById('salaryAmountTag');
  const salaryPerksList = document.getElementById('salaryPerksList');

  if (calcSalaryBtn) {
    calcSalaryBtn.addEventListener('click', () => {
      const stack = document.getElementById('calcStack').value;
      const exp = document.getElementById('calcExp').value;
      const vim = document.getElementById('calcVim').value;

      let baseSalary = 500000;
      let perkDetails = [];

      if (stack === 'css') {
        baseSalary += 450000;
        perkDetails.push('Пожизненный запас сырной шаурмы за умение выровнять flexbox');
      } else if (stack === 'rust') {
        baseSalary += 850000;
        perkDetails.push('Персональный датацентр с охлаждением жидким азотом');
      } else if (stack === 'devops') {
        baseSalary += 700000;
        perkDetails.push('Право нажимать кнопку деплоя в пятницу в 18:59 без осуждения коллег');
      } else if (stack === 'uggl') {
        baseSalary = 999999999;
        perkDetails.push('Контрольный пакет акций вселенной и личный вертолет');
      } else {
        baseSalary += 300000;
        perkDetails.push('Абонемент на психотерапию после чтения чужого легаси');
      }

      if (exp === 'god') {
        baseSalary *= 2.5;
        perkDetails.push('Официальный статус IT-патриарха и освобождение от любых дейликов');
      } else if (exp === 'senior') {
        baseSalary *= 1.8;
        perkDetails.push('Право спать на совещаниях с включенной камерой');
      }

      if (vim === 'yes') {
        baseSalary += 200000;
        perkDetails.push('Орден спасителя терминала 1-й степени');
      } else if (vim === 'stuck') {
        perkDetails.push('Бесплатная бригада спасателей для извлечения из редактора Vim');
      }

      if (salaryAmountTag) {
        salaryAmountTag.textContent = `ИТОГОВЫЙ РАСЧЁТ: $${Math.round(baseSalary).toLocaleString('en-US')} / МЕСЯЦ`;
      }

      if (salaryPerksList) {
        salaryPerksList.innerHTML = perkDetails.map(p => `<li>${p}</li>`).join('');
      }

      SoundFX.play('coin');
    });
  }

  // --- SUB-FEATURE 3: Dev Excuses Generator ---
  const excusesList = [
    '«Это не баг, это квантовая суперпозиция состояния кнопки: пока вы не кликнули, она одновременно и работает, и не работает.»',
    '«У меня на локалке всё работало идеально. Возможно, прод запущен в параллельной вселенной с другой гравитацией.»',
    '«Код написан безупречно. Это процессор пользователя интерпретирует байты без должного уважения.»',
    '«Деплой задержался, потому что байты сопротивлялись компиляции из-за повышенной влажности в датацентре.»',
    '«Мы не просрочили дедлайн, мы дали пользователям дополнительное время психологически подготовиться к величию релиза.»',
    '«Сервер не упал, он просто прилёг отдохнуть после просмотра ваших юнит-тестов.»',
    '«Это экспериментальная фича для проверки стрессоустойчивости службы технической поддержки.»',
    '«Падение базы данных вызвано вспышкой на Солнце и магнитными бурями над серверами AWS.»',
    '«Кэш отказался инвалидироваться из соображений профессиональной солидарности.»'
  ];

  const excuseText = document.getElementById('excuseText');
  const newExcuseBtn = document.getElementById('newExcuseBtn');
  const copyExcuseBtn = document.getElementById('copyExcuseBtn');
  const copyAlert = document.getElementById('copyAlert');

  if (newExcuseBtn && excuseText) {
    newExcuseBtn.addEventListener('click', () => {
      const randomExcuse = excusesList[Math.floor(Math.random() * excusesList.length)];
      excuseText.textContent = randomExcuse;
      SoundFX.play('blip');
      excuseText.animate([
        { opacity: 0.3, transform: 'scale(0.98)' },
        { opacity: 1, transform: 'scale(1)' }
      ], { duration: 180 });
    });
  }

  if (copyExcuseBtn && excuseText) {
    copyExcuseBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(excuseText.textContent).then(() => {
        SoundFX.play('coin');
        if (copyAlert) {
          copyAlert.style.display = 'block';
          setTimeout(() => {
            copyAlert.style.display = 'none';
          }, 2500);
        }
      }).catch(() => {
        alert('Скопировано: ' + excuseText.textContent);
      });
    });
  }

  // =========================================================================
  // 6. UGGL CLI TERMINAL (Interactive Shell)
  // =========================================================================
  const terminalForm = document.getElementById('terminalForm');
  const terminalInput = document.getElementById('terminalInput');
  const terminalLogs = document.getElementById('terminalLogs');
  const terminalBody = document.getElementById('terminalBody');

  const termCommands = {
    help: () => `ДОСТУПНЫЕ КОМАНДЫ UGGL SHELL:
  help       - Показать эту справку
  matrix     - Запустить квантовый поток матрицы
  coffee     - Налить чашку живительного эспрессо (ASCII)
  sudo rm -rf / - Попытаться сломать квантовое ядро
  skills     - Список сакральных способностей Создателя
  salary     - Экспресс-оценка стоимости вашего часа
  fortune    - Мудрость сеньора-разработчика
  ping       - Пинг до мировых серверов
  whoami     - Проверить текущий уровень доступа
  theme      - Сменить тему (theme light|dark|matrix|cyber)
  clear      - Очистить экран терминала`,

    matrix: () => `[QUANTUM RAIN INITIATED]
010101010010101011101010101001010101010101010100101010111010101
101010101101010100010101010101010101010101010110101010001010101
UGGL_CORE://SYNC_OK // REALITY_STABLE // BUG_COUNT=0 // SHARP_EDGES=100%
010101010010101011101010101001010101010101010100101010111010101`,

    coffee: () => `      )  (
     (   ) )
      ) ( (
    _______)_
 .-'---------|
( C|  UGGL   |
 '-.  COFFEE |
   '---------'
   '========='
Горячий двойной эспрессо готов. +500 к скорости набора кода.`,

    'sudo rm -rf /': () => {
      document.body.classList.add('shaking');
      SoundFX.play('alarm');
      setTimeout(() => {
        document.body.classList.remove('shaking');
      }, 1600);
      return `[CRITICAL_WARNING]: Попытка уничтожения вселенной...
[SECURITY]: Проверка прав root... ОК.
[SHIELD]: Ошибка! UgglOS имеет абсолютный квантовый иммунитет.
[STATUS]: Вселенная спасена. Исходный код остался в целости.`;
    },

    skills: () => `СУПЕРСИЛЫ СОЗДАТЕЛЯ:
  1. Выход из Vim за 0.02 секунды без паники.
  2. Центрирование div взглядом на монитор.
  3. Git push --force в пятницу в 18:59 без падения продакшена.
  4. 0% скругления углов — только брутальная геометрия.`,

    salary: () => `ЭКСПРЕСС-РАСЧЁТ:
Минимальная ставка за просмотр вашего PR: $25,000.
Оплата принимается исключительно в сырных шаурмах и акциях NVIDIA.`,

    fortune: () => {
      const fortunes = [
        '«Лучший рефакторинг — это удаление 5000 строк чужого кода.»',
        '«Если код работает с первого раза — вы забыли сохранить файл.»',
        '«Тесты нужны для того, чтобы было что отключить перед релизом.»',
        '«Прод падает только у тех, кто боится пятничных деплоев.»'
      ];
      return fortunes[Math.floor(Math.random() * fortunes.length)];
    },

    ping: (args) => {
      const target = args[0] || 'google.com';
      return `PING ${target} (127.0.0.1): 56 data bytes
64 bytes from universe: icmp_seq=0 ttl=999 time=0.00001 ms
64 bytes from universe: icmp_seq=1 ttl=999 time=0.00001 ms
--- ${target} ping statistics ---
2 packets transmitted, 2 packets received, 0.0% packet loss
Ответ сервера: «Спасибо, что пингуете нас, сэр!»`;
    },

    whoami: () => `root@uggl-multiverse (Архитектор интернета, Властелин 90-градусного UI)`,

    clear: () => {
      if (terminalLogs) terminalLogs.innerHTML = '';
      return '';
    }
  };

  if (terminalForm && terminalInput && terminalLogs) {
    terminalForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const raw = terminalInput.value.trim();
      terminalInput.value = '';
      if (!raw) return;

      const parts = raw.split(' ');
      const cmd = parts[0].toLowerCase();
      const args = parts.slice(1);

      // Log the command entered
      const cmdLog = document.createElement('div');
      cmdLog.className = 'log-entry';
      cmdLog.innerHTML = `<span class="log-cmd">root@uggl-core:~$ ${escapeHtml(raw)}</span>`;
      terminalLogs.appendChild(cmdLog);

      // Handle theme command
      if (cmd === 'theme') {
        const reqTheme = args[0];
        if (themes.includes(reqTheme)) {
          applyTheme(reqTheme);
          const out = document.createElement('div');
          out.className = 'log-entry log-success';
          out.textContent = `[OK]: Тема переключена на '${reqTheme}'.`;
          terminalLogs.appendChild(out);
        } else {
          const out = document.createElement('div');
          out.className = 'log-entry log-error';
          out.textContent = `Ошибка: доступные темы: ${themes.join(', ')}`;
          terminalLogs.appendChild(out);
        }
        SoundFX.play('click');
        terminalBody.scrollTop = terminalBody.scrollHeight;
        return;
      }

      // Check full command like 'sudo rm -rf /'
      if (raw.toLowerCase() === 'sudo rm -rf /') {
        const res = termCommands['sudo rm -rf /']();
        const out = document.createElement('div');
        out.className = 'log-entry log-error';
        out.textContent = res;
        terminalLogs.appendChild(out);
        terminalBody.scrollTop = terminalBody.scrollHeight;
        return;
      }

      // Execute command
      if (termCommands[cmd]) {
        const res = termCommands[cmd](args);
        if (res) {
          const out = document.createElement('div');
          out.className = 'log-entry log-output';
          out.textContent = res;
          terminalLogs.appendChild(out);
        }
        SoundFX.play('click');
      } else {
        const out = document.createElement('div');
        out.className = 'log-entry log-error';
        out.textContent = `Команда '${escapeHtml(cmd)}' не найдена. Введите 'help' для списка доступных команд.`;
        terminalLogs.appendChild(out);
        SoundFX.play('blip');
      }

      terminalBody.scrollTop = terminalBody.scrollHeight;
    });

    if (terminalBody) {
      terminalBody.addEventListener('click', () => {
        terminalInput.focus();
      });
    }
  }

  // =========================================================================
  // 7. OFFER EVALUATOR v3.0 (With Official Downloadable Verdict .txt)
  // =========================================================================
  const offerForm = document.getElementById('offerForm');
  const offerModal = document.getElementById('offerResponseModal');
  const verdictTitle = document.getElementById('verdictTitle');
  const verdictText = document.getElementById('verdictText');
  const verdictBadge = document.getElementById('verdictBadge');
  const closeVerdictBtn = document.getElementById('closeVerdictBtn');
  const downloadVerdictBtn = document.getElementById('downloadVerdictBtn');

  let lastVerdictData = null;

  if (offerForm && offerModal) {
    offerForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const company = document.getElementById('companyName').value || 'Неизвестная организация';
      const role = document.getElementById('offerRole').options[document.getElementById('offerRole').selectedIndex].text;
      const budget = document.getElementById('offerAmount').value;
      const message = document.getElementById('offerMessage').value;

      let title = '';
      let text = '';
      let badge = 'ВЕРДИКТ СИСТЕМЫ';
      let badgeColor = 'var(--accent-red)';
      let isApproved = false;

      if (budget === 'shaurma') {
        title = '🎉 ОФФЕР ПРИНЯТ НА РАССМОТРЕНИЕ!';
        badge = 'ВЫСШИЙ ПРИОРИТЕТ';
        badgeColor = 'var(--accent-green)';
        text = `Уважаемый(ая) <strong>${escapeHtml(company)}</strong>! Сырная шаурма с холодной колой — единственная твёрдая мировая валюта. Курьер с черновиком контракта уже выехал. Все другие техногиганты в бешенстве кусают локти.`;
        isApproved = true;
        SoundFX.play('fanfare');
      } else if (budget === 'nvidia') {
        title = '⏳ ОФФЕР В РЕЖИМЕ АНАЛИЗА';
        badge = 'ТЕПЛОВОЙ ПАКЕТ ВЫСОК';
        badgeColor = 'var(--accent-yellow)';
        text = `Компания <strong>${escapeHtml(company)}</strong>, 100 000 серверов Blackwell — это неплохо, но куда нам ставить кулеры? Пришлите в комплекте 200 промышленных кондиционеров и ящик кваса, тогда поговорим.`;
        SoundFX.play('coin');
      } else if (budget === 'mars') {
        title = '🚀 ОФФЕР ЗАМОРОЖЕН';
        badge = 'МАРСИАНСКАЯ ОРБИТА';
        badgeColor = 'var(--accent-blue)';
        text = `<strong>${escapeHtml(company)}</strong>, пинг до серверов Уггла с Марса составляет 14 минут. Мы пока не готовы терпеть такой лаг ради колонизации.`;
        SoundFX.play('blip');
      } else if (budget === 'billion') {
        title = '❌ ОФФЕР ОТКЛОНЁН';
        badge = 'НЕДОСТАТОЧНО СРЕДСТВ';
        badgeColor = 'var(--accent-red)';
        text = `Компания <strong>${escapeHtml(company)}</strong>, Дженсен и Тим Кук буквально 5 минут назад перебили ваше предложение, пообещав мыть полы в офисе Уггла. Попробуйте предложить шаурму.`;
        SoundFX.play('alarm');
      } else {
        title = '❌ ОФФЕР ОТКЛОНЁН';
        badge = 'РЕВЬЮ ПРОВАЛЕНО';
        badgeColor = 'var(--accent-red)';
        text = `Респектом серверы датацентра не оплатишь! Спасибо за попытку, <strong>${escapeHtml(company)}</strong>. Передайте привет вашему тимлиду.`;
        SoundFX.play('alarm');
      }

      if (verdictTitle) verdictTitle.textContent = title;
      if (verdictBadge) {
        verdictBadge.textContent = badge;
        verdictBadge.style.background = badgeColor;
      }
      if (verdictText) verdictText.innerHTML = text;

      lastVerdictData = {
        company,
        role,
        budget,
        title,
        text: text.replace(/<[^>]*>?/gm, ''),
        date: new Date().toISOString()
      };

      offerModal.style.display = 'flex';
    });

    if (closeVerdictBtn) {
      closeVerdictBtn.addEventListener('click', () => {
        offerModal.style.display = 'none';
        SoundFX.play('click');
      });
    }

    if (downloadVerdictBtn) {
      downloadVerdictBtn.addEventListener('click', () => {
        if (!lastVerdictData) return;
        const fileContent = `=====================================================
ОФИЦИАЛЬНОЕ РЕШЕНИЕ ВЕРХОВНОГО СОЗДАТЕЛЯ УГГЛА
UGGL QUANTUM EVALUATION PROTOCOL v3.0
=====================================================

ДАТА РАССМОТРЕНИЯ: ${lastVerdictData.date}
ОРГАНИЗАЦИЯ / СОИСКАТЕЛЬ: ${lastVerdictData.company}
ПРЕДЛАГАЕМАЯ ПОЗИЦИЯ: ${lastVerdictData.role}
ИТОГОВЫЙ СТАТУС: ${lastVerdictData.title}

ПОДРОБНЫЙ ВЕРДИКТ:
${lastVerdictData.text}

-----------------------------------------------------
ПРИМЕЧАНИЕ КАНЦЕЛЯРИИ УГГЛА:
Попытки повторной подачи оффера без предложения сырной шаурмы
будут караться принудительным написанием документации на ассемблере.
=====================================================
UGGL_FOUNDER.IO // 100% SHARP ZERO CURVES`;

        const blob = new Blob([fileContent], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `uggl_verdict_${lastVerdictData.company.replace(/\s+/g, '_')}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        SoundFX.play('coin');
      });
    }
  }

  // =========================================================================
  // 8. DYNAMIC ROTATING TOAST NOTIFICATION STREAM
  // =========================================================================
  const cookToast = document.getElementById('cookToast');
  const closeToastBtn = document.getElementById('closeToastBtn');
  const toastTitle = document.getElementById('toastTitle');
  const toastMsg = document.getElementById('toastMsg');

  const streamToasts = [
    { title: '🧥 Дженсен Хуанг (NVIDIA):', msg: '«Пожалуйста, возьми хотя бы 50 штук RTX 5090, они занимают место в коридоре офиса!»' },
    { title: '🚀 Илон Маск (SpaceX):', msg: '«Твитнул про твой сайт. Кажется, упали три сервера провайдеров в Техасе...»' },
    { title: '🧊 Павел Дуров (Telegram):', msg: '«Вышел новый пост: почему писать код на чистом ассемблере полезнее ледяных ванн.»' },
    { title: '🤖 Сэм Альтман (OpenAI):', msg: '«GPT-5 отказывается компилировать код, пока ты лично не дашь добро!»' },
    { title: '🍏 Тим Кук (Apple):', msg: '«Я всё ещё вижу, что ты онлайн на сайте... Ну ответь, умоляю!»' },
    { title: '⚡ Сервер UgglOS:', msg: '«Обработан 100-миллиардный квантовый запрос. Температура процессора: 18°C (идеально).»' }
  ];

  if (closeToastBtn && cookToast) {
    closeToastBtn.addEventListener('click', () => {
      cookToast.classList.add('hidden');
      SoundFX.play('click');
    });

    setInterval(() => {
      if (!cookToast.classList.contains('hidden')) {
        const item = streamToasts[Math.floor(Math.random() * streamToasts.length)];
        if (toastTitle) toastTitle.textContent = item.title;
        if (toastMsg) toastMsg.textContent = item.msg;
        cookToast.animate([
          { transform: 'scale(0.95)' },
          { transform: 'scale(1)' }
        ], { duration: 200 });
      }
    }, 13000);
  }

  // =========================================================================
  // 9. BACK TO TOP BUTTON
  // =========================================================================
  const backToTopBtn = document.getElementById('backToTopBtn');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      SoundFX.play('click');
    });
  }

});
