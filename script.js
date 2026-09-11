/**
 * UGGL FOUNDER - INTERACTIVE SYSTEM SCRIPTS
 * Humor Engine & Real-time Apple Dismissal Algorithm
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Toggle
  const menuBtn = document.getElementById('mobileMenuToggle');
  const navLinks = document.querySelector('.nav-links');

  if (menuBtn && navLinks) {
    menuBtn.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });

    // Close menu on link click
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
      });
    });
  }

  // 2. Tim Cook Call Simulator
  let missedCalls = 4892;
  const callsCounterEl = document.getElementById('callsCounter');
  const cookQueueEl = document.getElementById('cookQueueStatus');
  const declineBtn = document.getElementById('declineCallBtn');
  const holdBtn = document.getElementById('holdCallBtn');
  const callStatusEl = document.getElementById('callStatusMessage');

  const declineReplies = [
    'Вы отклонили вызов. Тим плачет и набирает с телефона Стива Возняка...',
    'Отклонено. Тим пишет в WhatsApp с аккаунта своей бабушки...',
    'Отклонено. В окно уже стучит личный дрон Apple с новым чеком на $50 млрд...',
    'Вы сбросили. Тим Кук объявил 15-минутный траур на совете директоров...',
    'Отклонено! Тим отправил факс с вопросом «Почему ты меня ненавидишь?»',
    'Сброс! В Купертино снова упали акции Apple на 4.2%...',
    'Отклонено. Тим перешёл на пейджер.'
  ];

  let declineIndex = 0;

  if (declineBtn && callStatusEl) {
    declineBtn.addEventListener('click', () => {
      missedCalls += 1;
      if (callsCounterEl) callsCounterEl.textContent = missedCalls.toLocaleString('ru-RU');
      if (cookQueueEl) cookQueueEl.textContent = `В очереди: ${missedCalls.toLocaleString('ru-RU')} звонка`;

      callStatusEl.textContent = declineReplies[declineIndex % declineReplies.length];
      callStatusEl.style.color = '#ff2a2a';
      callStatusEl.style.fontWeight = '700';

      declineIndex++;

      // Flash feedback
      callStatusEl.animate([
        { transform: 'scale(1.05)' },
        { transform: 'scale(1)' }
      ], { duration: 250 });
    });
  }

  let holdTimer = null;
  let holdSeconds = 2840; // 47 mins 20 sec

  if (holdBtn && callStatusEl) {
    holdBtn.addEventListener('click', () => {
      if (holdTimer) {
        clearInterval(holdTimer);
        holdTimer = null;
        holdBtn.textContent = '⏳ В РЕЖИМ ОЖИДАНИЯ';
        callStatusEl.textContent = 'Вы сняли Тима с удержания, но не взяли трубку. Он всё ещё дышит в микрофон.';
        return;
      }

      holdBtn.textContent = '⏸ НА УДЕРЖАНИИ...';
      holdTimer = setInterval(() => {
        holdSeconds++;
        const mins = Math.floor(holdSeconds / 60);
        const secs = holdSeconds % 60;
        callStatusEl.textContent = `Тим на удержании: ${mins} мин ${secs < 10 ? '0' : ''}${secs} сек (в трубке играет монофоническая Marimba)...`;
        callStatusEl.style.color = '#0047ff';
      }, 1000);
    });
  }

  // 3. Interactive UGGL Search Engine Simulator
  const searchForm = document.getElementById('ugglSearchForm');
  const searchInput = document.getElementById('ugglSearchInput');
  const clearBtn = document.getElementById('ugglClearBtn');
  const luckyBtn = document.getElementById('ugglLuckyBtn');
  const resultSnippet = document.getElementById('resultSnippet');
  const primaryResult = document.getElementById('primaryResult');
  const chips = document.querySelectorAll('.chip');

  const customKnowledgeBase = {
    'тим кук': 'Тим Кук звонил вам 42 раза, пока вы вбивали этот запрос. В Apple Park готовы переименовать iPhone в UgglPhone, если вы согласитесь на 10 минут зума.',
    'кто создал интернет': 'Интернет создал ТЫ, когда уронил недописанный скрипт на перфокарту в 1998 году. С тех пор весь мировой трафик ходит через твои персональные костыли.',
    'сколько стоит нанять тебя': 'Один триллион долларов и полный пакет акций. Исключение: большая сырная шаурма и холодная кола снижают стоимость до $0 при условии интересной задачи.',
    'баги в коде': 'Багов не существует. Это квантовые альтернативные сценарии поведения пользовательского интерфейса, расширяющие кругозор тестировщиков.',
    'секрет уггла': 'Алгоритм Уггла держится на трёх столпах: 1. Понять, что нужно человеку; 2. Дать ответ за 0.00001 сек; 3. Не брать трубку из Купертино.',
    'как стать мной': 'Невозможно. Сначала нужно научиться игнорировать звонки Тима Кука в течение 15 лет без перерыва на обед и центрировать div без flexbox.',
    'apple': 'Apple — неплохой стартап из Калифорнии. Руководство часто названивает и просит научить делать дизайн без закруглений.'
  };

  const randomFacts = [
    'Уггл обработал этот запрос ещё до того, как вы подумали его ввести. По квантовой телепатии.',
    'Результат найден в личном блокноте Создателя Уггла за 4-й класс.',
    'Тим Кук попытался загуглить этот же запрос, но у него сел аккумулятор на тестовом айфоне без кнопок.',
    'Серверы Уггла подтверждают: 100% пользователей согласны, что создатель сайта — гений.',
    'Данный поисковый запрос был одобрен лично Архитектором Вселенной за 0.00001 миллисекунды.'
  ];

  function executeSearch(query) {
    const trimmed = query.trim().toLowerCase();
    if (!trimmed) {
      resultSnippet.innerHTML = 'Введите запрос в строку выше. Уггл знает всё (и даже то, о чём Тим Кук шепчет во сне).';
      return;
    }

    // Flash result card
    primaryResult.animate([
      { opacity: 0.4, transform: 'translateY(4px)' },
      { opacity: 1, transform: 'translateY(0)' }
    ], { duration: 200 });

    // Look up in database
    let foundAnswer = null;
    for (const key in customKnowledgeBase) {
      if (trimmed.includes(key)) {
        foundAnswer = customKnowledgeBase[key];
        break;
      }
    }

    if (!foundAnswer) {
      const randomFact = randomFacts[Math.floor(Math.random() * randomFacts.length)];
      foundAnswer = `По запросу «<strong>${escapeHtml(query)}</strong>»: ${randomFact}`;
    }

    resultSnippet.innerHTML = foundAnswer;
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
    });
  }

  if (luckyBtn && searchInput) {
    luckyBtn.addEventListener('click', () => {
      const queries = Object.keys(customKnowledgeBase);
      const chosen = queries[Math.floor(Math.random() * queries.length)];
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

  // 4. Offer Evaluation Form
  const offerForm = document.getElementById('offerForm');
  const offerModal = document.getElementById('offerResponseModal');
  const verdictTitle = document.getElementById('verdictTitle');
  const verdictText = document.getElementById('verdictText');
  const closeVerdictBtn = document.getElementById('closeVerdictBtn');

  if (offerForm && offerModal) {
    offerForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const company = document.getElementById('companyName').value || 'Неизвестная компания';
      const amount = document.getElementById('offerAmount').value;

      if (amount === 'shaurma') {
        verdictTitle.textContent = '🎉 ОФФЕР ПРИНЯТ НА РАССМОТРЕНИЕ!';
        verdictTitle.style.color = '#00c853';
        verdictText.innerHTML = `Уважаемый(ая) <strong>${escapeHtml(company)}</strong>! Сырная шаурма — это единственная твёрдая валюта во вселенной. Курьер с черновиком контракта уже выехал. Тим Кук в бешенстве кусает локти.`;
      } else if (amount === 'cook') {
        verdictTitle.textContent = '❌ ОФФЕР ОТКЛОНЁН';
        verdictTitle.style.color = '#ff2a2a';
        verdictText.innerHTML = `Компания <strong>${escapeHtml(company)}</strong>, Тим Кук буквально 3 минуты назад поднял ставку до 99% акций Apple и золотого памятника при жизни. Попробуйте перебить шаурмой.`;
      } else if (amount === 'mars') {
        verdictTitle.textContent = '⏳ ОФФЕР НА ПАУЗЕ';
        verdictTitle.style.color = '#ffe600';
        verdictText.innerHTML = `<strong>${escapeHtml(company)}</strong>, на Марсе пока нет нормальной доставки еды и пинг до серверов Уггла составляет 14 минут. Мы пока останемся на Земле.`;
      } else {
        verdictTitle.textContent = '❌ ОФФЕР ОТКЛОНЁН';
        verdictTitle.style.color = '#ff2a2a';
        verdictText.innerHTML = `Респектом серверы Уггла не оплатишь! Но спасибо за попытку, <strong>${escapeHtml(company)}</strong>. Передайте привет Тиму.`;
      }

      offerModal.style.display = 'flex';
    });

    if (closeVerdictBtn) {
      closeVerdictBtn.addEventListener('click', () => {
        offerModal.style.display = 'none';
      });
    }
  }

  // 5. Dynamic Floating Tim Cook Toast
  const cookToast = document.getElementById('cookToast');
  const closeToastBtn = document.getElementById('closeToastBtn');

  const toastMessages = [
    '«Я всё ещё вижу, что ты онлайн на сайте... Возьми трубку, умоляю!»',
    '«Мы уже упаковали Apple Park в подарочную коробку с бантиком, только ответь!»',
    '«Я готов переписать iOS на твой любимый чистый JavaScript без зависимостей!»',
    '«Пожалуйста, скажи хотя бы, какой цвет сделать для следующего айфона!»',
    '«Я отправил тебе пиццу... и чек на $100 000 000 в коробке!»'
  ];

  if (closeToastBtn && cookToast) {
    closeToastBtn.addEventListener('click', () => {
      cookToast.classList.add('hidden');
    });

    // Cycle messages every 15 seconds
    setInterval(() => {
      if (!cookToast.classList.contains('hidden')) {
        const msgEl = cookToast.querySelector('.toast-msg');
        if (msgEl) {
          const nextMsg = toastMessages[Math.floor(Math.random() * toastMessages.length)];
          msgEl.textContent = nextMsg;
          cookToast.animate([
            { transform: 'scale(0.96)' },
            { transform: 'scale(1)' }
          ], { duration: 200 });
        }
      }
    }, 12000);
  }

  // 6. Back to Top Button
  const backToTopBtn = document.getElementById('backToTopBtn');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // 7. Click to scroll for call button
  const triggerCallBtn = document.getElementById('triggerCallBtn');
  if (triggerCallBtn) {
    triggerCallBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const callCard = document.getElementById('cook-call');
      if (callCard) {
        callCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
        callCard.animate([
          { boxShadow: '0 0 0 4px #ff2a2a' },
          { boxShadow: '8px 8px 0px #0a0a0a' }
        ], { duration: 600 });
      }
    });
  }
});
