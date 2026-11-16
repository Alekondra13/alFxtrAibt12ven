const d = "alekondra13.github.io";
const h = window.location.hostname;
if (h !== d && h !== "localhost" && h !== "127.0.0.1" && h !== "") {
    document.body.innerHTML = "<div style='background:#000;color:#FF453A;height:100vh;display:flex;justify-content:center;align-items:center;font-size:20px;'>⛔ ACCESS DENIED</div>";
    throw new Error("X");
}

function _0x4a2f() {
    var _x = document.getElementById('p_in').value;
    var _k = (function(){
        var _a = [94, -7, 199, -7, 201, -7, 58, -7, 59, -7];
        var _b = [50, -7, 250, -7, 9, -7, 179, -7, 219, -7];
        var _c = [221, -7, 211, -7, 166, -7, 232];
        var _d = [];
        for (var q = 0; q < _a.length; q++) if (_a[q] !== -7) _d.push(_a[q]);
        for (var w = 0; w < _b.length; w++) if (_b[w] !== -7) _d.push(_b[w]);
        for (var e = 0; e < _c.length; e++) if (_c[e] !== -7) _d.push(_c[e]);
        var _e = [];
        for (var i = 0; i < _d.length; i++) _e.push(_d[i] ^ ((55 + i * 11) % 256));
        var _f = [];
        for (var j = 0; j < _e.length; j++) _f.push((_e[j] - 19 + 256) % 256);
        var _g = [];
        for (var k = 0; k < _f.length; k++) _g.push(_f[k] ^ ((23 + k * 7) % 256));
        return String.fromCharCode.apply(null, _g);
    })();
    if (_x === _k) { document.getElementById('a1').style.display = 'none'; }
    else { alert('Ошибка доступа'); }
}

function _sk1() {
    const c = [116, 117, 99, 104, 107, 111, 118, 95, 97, 105, 95, 120, 55, 55];
    let s = '';
    for (let i = 0; i < c.length; i++) s += String.fromCharCode(c[i]);
    return s;
}

function encryptStr(txt) {
    if (!txt) return '';
    try {
        let xored = '';
        for (let i = 0; i < txt.length; i++) {
            xored += String.fromCharCode(txt.charCodeAt(i) ^ _sk1().charCodeAt(i % _sk1().length));
        }
        return 'enc:' + btoa(unescape(encodeURIComponent(xored)));
    } catch(e) { return txt; }
}

function decryptStr(txt) {
    if (!txt) return '';
    try {
        if (txt.startsWith('enc:')) {
            const raw = decodeURIComponent(escape(atob(txt.substring(4))));
            let out = '';
            for (let i = 0; i < raw.length; i++) {
                out += String.fromCharCode(raw.charCodeAt(i) ^ _sk1().charCodeAt(i % _sk1().length));
            }
            return out;
        }
        return txt;
    } catch(e) { return ''; }
}

function safeGet(k) { try { return localStorage.getItem(k); } catch(e) { return null; } }
function safeSet(k, v) { try { localStorage.setItem(k, v); } catch(e) {} }
function safeDel(k) { try { localStorage.removeItem(k); } catch(e) {} }

function getEncJson(k) {
    const raw = safeGet(k);
    if (!raw) return [];
    try {
        const dec = decryptStr(raw);
        if (!dec) return [];
        const arr = JSON.parse(dec);
        return Array.isArray(arr) ? arr : [];
    } catch(e) { return []; }
}
function setEncJson(k, arr) {
    safeSet(k, encryptStr(JSON.stringify(arr)));
}

const ASSETS = {
    EURUSD: { tvSym: 'FX:EURUSD', type:'forex', base:'EUR', quote:'USD', pip:0.0001, pipVal:10, dec:4, name:'EUR/USD', td:'EUR/USD' },
    GBPUSD: { tvSym: 'FX:GBPUSD', type:'forex', base:'GBP', quote:'USD', pip:0.0001, pipVal:10, dec:4, name:'GBP/USD', td:'GBP/USD' },
    USDJPY: { tvSym: 'FX:USDJPY', type:'forex', base:'USD', quote:'JPY', pip:0.01, pipValFn:p=>1000/p, dec:2, name:'USD/JPY', td:'USD/JPY' },
    XAUUSD: { tvSym: 'OANDA:XAUUSD', type:'crypto', pip:0.1, pipVal:10, dec:2, name:'XAU/USD', td:'XAU/USD' },
    BTCUSD: { tvSym: 'BINANCE:BTCUSDT', type:'crypto', pip:1, pipVal:1, dec:2, name:'BTC/USD', td:'BTC/USD' },
    ETHUSD: { tvSym: 'BINANCE:ETHUSDT', type:'crypto', pip:0.1, pipVal:0.1, dec:2, name:'ETH/USD', td:'ETH/USD' },
    SOLUSD: { tvSym: 'BINANCE:SOLUSDT', type:'crypto', pip:0.01, pipVal:0.01, dec:2, name:'SOL/USD', td:'SOL/USD' },
    BNBUSD: { tvSym: 'BINANCE:BNBUSDT', type:'crypto', pip:0.1, pipVal:0.1, dec:2, name:'BNB/USD', td:'BNB/USD' },
    XRPUSD: { tvSym: 'BINANCE:XRPUSDT', type:'crypto', pip:0.0001, pipVal:0.0001, dec:4, name:'XRP/USD', td:'XRP/USD' },
    ADAUSD: { tvSym: 'BINANCE:ADAUSDT', type:'crypto', pip:0.0001, pipVal:0.0001, dec:4, name:'ADA/USD', td:'ADA/USD' },
    DOGEUSD:{ tvSym: 'BINANCE:DOGEUSDT', type:'crypto', pip:0.0001, pipVal:0.0001, dec:4, name:'DOGE/USD', td:'DOGE/USD' },
    AVAXUSD:{ tvSym: 'BINANCE:AVAXUSDT', type:'crypto', pip:0.01, pipVal:0.01, dec:2, name:'AVAX/USD', td:'AVAX/USD' },
    LINKUSD:{ tvSym: 'BINANCE:LINKUSDT', type:'crypto', pip:0.001, pipVal:0.001, dec:3, name:'LINK/USD', td:'LINK/USD' }
};

const FALLBACK_PRICES = { EURUSD:1.05, GBPUSD:1.25, USDJPY:150, XAUUSD:2000, BTCUSD:60000, ETHUSD:3000, SOLUSD:150, BNBUSD:550, XRPUSD:0.5, ADAUSD:0.4, DOGEUSD:0.1, AVAXUSD:30, LINKUSD:15 };

let currentPrice = 0;
let isChartOpen = false;
let lastAnalysisContext = "";
let chatHistory = [];
let isAiTyping = false;
let autoInterval = null;
let lastAutoSignalDir = null;
let lastAutoSignalTime = 0;
let scannerResults = [];
let scannerFilter = 'all';
let tfCache = {};
let audioCtx = null;
let currentKeyIndex = 0;
let newsCache = {};
let newsCacheTime = 0;
let lastIndicators = {};

function getTwelveKeys() {
    const keys = getEncJson('_app_k1');
    return keys.filter(k => k && String(k).trim().length > 5);
}

function updateKeyStatus() {
    const keys = getTwelveKeys();
    const dot = document.getElementById('apiDot');
    if (dot) dot.style.display = keys.length > 0 ? 'none' : 'block';
    const status = document.getElementById('keyStatus');
    const text = document.getElementById('keyStatusText');
    if (status && text) {
        if (keys.length > 0) { status.classList.add('active'); text.textContent = 'Установлено ключей: ' + keys.length; }
        else { status.classList.remove('active'); text.textContent = 'Ключи не установлены'; }
    }
}

function isKeysLocked() { return safeGet('_app_l1') === '1'; }
function toggleKeysLock() {
    if (isKeysLocked()) {
        if (confirm('Разблокировать ключи?')) { safeSet('_app_l1', '0'); updateLockUI(); }
    } else { safeSet('_app_l1', '1'); updateLockUI(); }
}

function updateLockUI() {
    const locked = isKeysLocked();
    const btn = document.getElementById('lockBtn');
    const inputs = document.querySelectorAll('#settingsModal input[id^="twelveKeyInput"]');
    const hint = document.getElementById('lockHint');
    inputs.forEach(input => {
        input.readOnly = locked;
        input.style.opacity = locked ? '0.55' : '1';
        input.style.cursor = locked ? 'not-allowed' : 'text';
        input.style.background = locked ? 'rgba(0,0,0,0.15)' : 'rgba(0,0,0,0.35)';
    });
    if (btn) {
        btn.textContent = locked ? '🔒' : '🔓';
        btn.style.background = locked ? 'rgba(255,159,10,0.2)' : 'rgba(48,209,88,0.2)';
    }
    if (hint) hint.style.display = locked ? 'block' : 'none';
}

function openSettings() {
    try {
        const keys = getTwelveKeys();
        for (let i = 1; i <= 5; i++) {
            const el = document.getElementById('twelveKeyInput' + i);
            if (el) el.value = keys[i-1] || '';
        }
        updateKeyStatus();
        updateLockUI();
        document.getElementById('settingsModal').classList.add('active');
    } catch(e) { alert('Ошибка: ' + e.message); }
}

function saveSettings() {
    if (isKeysLocked()) { alert('🔒 Ключи заблокированы.'); return; }
    try {
        const keys = [];
        for (let i = 1; i <= 5; i++) {
            const val = (document.getElementById('twelveKeyInput' + i).value || '').trim();
            if (val) keys.push(val);
        }
        setEncJson('_app_k1', keys);
        tfCache = {};
        updateKeyStatus();
        closeModal('settingsModal');
        updateRisk();
        try { changePair(); } catch(e) {}
    } catch(e) { alert('Ошибка: ' + e.message); }
}

async function fetchTwelveData(endpoint, params, timeoutMs) {
    timeoutMs = timeoutMs || 12000;
    const keys = getTwelveKeys();
    if (keys.length === 0) throw new Error('Нет API ключей');
    let lastError = null;
    for (let i = 0; i < keys.length; i++) {
        const idx = (currentKeyIndex + i) % keys.length;
        const key = keys[idx];
        const url = 'https://api.twelvedata.com/' + endpoint + '?' + params + '&apikey=' + key;
        try {
            const controller = new AbortController();
            const timer = setTimeout(() => controller.abort(), timeoutMs);
            let res;
            try { res = await fetch(url, { signal: controller.signal }); }
            finally { clearTimeout(timer); }
            const data = await res.json();
            if (data.status === 'error' || data.code === 429) {
                lastError = data.message || 'Limit reached';
                continue;
            }
            currentKeyIndex = idx;
            return data;
        } catch(e) {
            lastError = e.name === 'AbortError' ? 'Таймаут' : e.message;
        }
    }
    throw new Error('Ключи исчерпаны. ' + (lastError || ''));
}

function showScan() {
    document.getElementById('scanOverlay').classList.add('active');
    updateScan(0, 'Инициализация...');
}
function updateScan(p, t) {
    document.getElementById('scanProgress').style.width = p + '%';
    document.getElementById('scanPercent').textContent = p + '%';
    if (t) document.getElementById('scanStep').textContent = t;
}
function hideScan() {
    document.getElementById('scanOverlay').classList.remove('active');
}
const sleep = ms => new Promise(r => setTimeout(r, ms));

function openScanner() { document.getElementById('scannerModal').classList.add('active'); }
function closeModal(id) { document.getElementById(id).classList.remove('active'); }

function getRiskPercent(b) { if (b <= 20) return 6.0; if (b <= 50) return 4.5; return 3.0; }

function calcAutoLot(key, balance, price) {
    const asset = ASSETS[key];
    if (!asset || !balance || balance <= 0) return 0.01;
    const p = price || FALLBACK_PRICES[key] || 1;
    const riskPct = getRiskPercent(balance);
    const riskMoney = balance * riskPct / 100;
    const slPct = asset.type === 'forex' ? 0.0025 : 0.02;
    const slPips = (p * slPct) / asset.pip;
    const pipVal = asset.pipValFn ? asset.pipValFn(p) : asset.pipVal;
    let lot = riskMoney / (slPips * pipVal);
    return Math.max(parseFloat(lot.toFixed(3)), 0.01);
}

function calcRealRisk(key, lot, price) {
    const asset = ASSETS[key];
    if (!asset || !lot) return 0;
    const p = price || FALLBACK_PRICES[key] || 1;
    const slPct = asset.type === 'forex' ? 0.0025 : 0.02;
    const slPips = (p * slPct) / asset.pip;
    const pipVal = asset.pipValFn ? asset.pipValFn(p) : asset.pipVal;
    return slPips * pipVal * lot;
}

function updateRisk() {
    const balRaw = document.getElementById('balanceInput').value;
    const bal = parseFloat(balRaw);
    const el = document.getElementById('riskValue');
    const lotEl = document.getElementById('autoLotValue');
    const hintEl = document.getElementById('lotHint');
    if (!isFinite(bal) || bal <= 0) {
        el.textContent = '—';
        lotEl.textContent = '—';
        hintEl.classList.remove('show');
        return;
    }
    const riskPct = getRiskPercent(bal);
    el.textContent = riskPct + '% ($' + (bal * riskPct / 100).toFixed(2) + ')';
    const key = document.getElementById('pairSelect').value;
    const calculatedLot = calcAutoLot(key, bal, currentPrice);
    lotEl.textContent = parseFloat(calculatedLot.toFixed(3));
    const realRisk = calcRealRisk(key, calculatedLot, currentPrice);
    const realRiskPct = bal > 0 ? (realRisk / bal * 100) : 0;
    if (calculatedLot === 0.01 && bal < 150) {
        hintEl.className = 'lot-hint show warn';
        hintEl.textContent = '⚠️ Мин. лот: риск $' + realRisk.toFixed(2) + ' (' + realRiskPct.toFixed(1) + '%)';
    } else {
        hintEl.className = 'lot-hint show';
        hintEl.textContent = 'Риск: $' + realRisk.toFixed(2) + ' (' + realRiskPct.toFixed(1) + '%)';
    }
}

function handleChatEnter(e) { if (e.key === 'Enter') sendChatMessage(); }
function quickAsk(text) {
    document.getElementById('chatInput').value = text;
    sendChatMessage();
}

async function sendChatMessage() {
    const input = document.getElementById('chatInput');
    const text = (input.value || '').trim();
    if (!text || isAiTyping) return;
    input.value = '';
    addChatMessage(text, 'user');
    chatHistory.push({ role: 'user', content: text });
    if (chatHistory.length > 30) chatHistory = chatHistory.slice(-30);
    await askAI();
}

function addChatMessage(text, type) {
    const container = document.getElementById('chatMessages');
    const msg = document.createElement('div');
    msg.className = 'chat-msg ' + type;
    const escaped = String(text)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/\n/g, '<br>');
    msg.innerHTML = escaped;
    container.appendChild(msg);
    container.scrollTop = container.scrollHeight;
}

async function askAI() {
    if (isAiTyping) return;
    isAiTyping = true;
    const container = document.getElementById('chatMessages');
    const typingMsg = document.createElement('div');
    typingMsg.className = 'chat-msg ai';
    typingMsg.id = 'aiTyping';
    typingMsg.textContent = '🧠 Анализирую...';
    container.appendChild(typingMsg);
    container.scrollTop = container.scrollHeight;
    try {
        const q = (chatHistory[chatHistory.length - 1]?.content || '').toLowerCase();
        await sleep(300 + Math.random() * 400);
        const reply = buildLocalAnswer(q);
        const typingEl = document.getElementById('aiTyping');
        if (typingEl) typingEl.remove();
        addChatMessage(reply, 'ai');
        chatHistory.push({ role: 'assistant', content: reply });
        if (chatHistory.length > 30) chatHistory = chatHistory.slice(-30);
    } finally {
        isAiTyping = false;
        const leftover = document.getElementById('aiTyping');
        if (leftover) leftover.remove();
    }
}

function buildLocalAnswer(q) {
    const has = (...words) => words.some(w => q.includes(w));
    const ind = lastIndicators || {};
    const assetKey = document.getElementById('pairSelect').value;
    const asset = ASSETS[assetKey];
    const assetName = asset ? asset.name : '—';
    const priceStr = document.getElementById('statPrice').textContent;
    const balanceVal = parseFloat(document.getElementById('balanceInput').value) || 0;
    const lotStr = document.getElementById('autoLotValue').textContent;
    const fmt = (v, d) => (v === undefined || v === null || !isFinite(v)) ? '—' : Number(v).toFixed(d || 1);
    const hasAnalysis = !!lastAnalysisContext;

    if (has('привет', 'здравств', 'hello', 'помощь', 'help', 'что умеешь', 'что ты можешь', 'команды')) {
        return '👋 Я — умный локальный ИИ-помощник Tuchkov AI.\n\nРаботаю на чистом алгоритме — без внешних сервисов и ключей. Отвечаю по индикаторам, риску, стратегиям и текущему анализу.\n\n📋 Что могу:\n• «Дай сигнал» / «Что по EUR/USD?» — разбор последнего анализа\n• «RSI», «MACD», «ADX», «ATR», «StochRSI», «Bollinger», «EMA»\n• «Дивергенция», «Паттерны», «Свечи»\n• «Стоп-лосс», «Тейк», «Риск», «Лот», «Баланс»\n• «Тренд», «Новости», «Сессии»\n• «Стратегия», «ТФ», «Время сделки»\n\n⚠️ Не финансовая рекомендация. Только образование и разбор ситуации.';
    }

    if (has('сигнал', 'сигналы', 'анализ', 'вход', 'сделк', 'прогноз', 'что по', 'покажи', 'результат')) {
        if (!hasAnalysis) {
            return '⚠️ Анализа ещё не было.\n\nНажми «⚡ ЗАПУСТИТЬ ИИ» на главном экране — я рассчитаю индикаторы и дам сигнал, а потом смогу его подробно разобрать.';
        }
        let s = '📊 Разбор сигнала по ' + assetName + '\n\n';
        const dir = ind.dir || 'WAIT';
        s += '🎯 Направление: ' + (dir === 'UP' ? '🟢 ВВЕРХ (CALL)' : dir === 'DOWN' ? '🔴 ВНИЗ (PUT)' : '⏸ ОЖИДАНИЕ') + '\n';
        s += '💪 Уверенность: ' + (ind.confidence || 0) + '%\n';
        s += '⏱ ТФ: ' + (ind.tf || '—') + ' · Держать: ' + (ind.tradeMinutes || '—') + ' мин\n';
        s += '💰 Цена: ' + priceStr + '\n';
        if (ind.slUsd !== undefined) {
            s += '🛡 Стоп: -$' + fmt(ind.slUsd, 2) + ' · 💰 Тейк: +$' + fmt(ind.tpUsd, 2) + '\n';
            s += '📦 Лот: ' + lotStr + (balanceVal > 0 ? ' (от $' + balanceVal.toFixed(2) + ')' : '') + '\n';
        }
        s += '\n📈 Индикаторы:\n';
        s += '• RSI: ' + fmt(ind.rsi) + (ind.rsi < 30 ? ' (перепродан)' : ind.rsi > 70 ? ' (перекуплен)' : '') + '\n';
        s += '• StochRSI: ' + fmt(ind.stochRsi) + '\n';
        s += '• MACD: ' + (ind.macd > ind.macdSignal ? 'бычий' : 'медвежий') + '\n';
        s += '• ADX: ' + fmt(ind.adx) + ' · +DI ' + fmt(ind.plusDI) + ' / -DI ' + fmt(ind.minusDI) + '\n';
        s += '• ATR: ' + fmt(ind.atrPct, 2) + '%\n';
        if (ind.pattern) s += '• Паттерн: ' + ind.pattern + '\n';
        s += '\n💡 Рекомендация:\n';
        if (dir === 'WAIT') {
            s += 'Ситуация неопределённая. Лучше пропустить сделку и дождаться более чёткого сигнала (ADX > 25, сильный тренд).';
        } else {
            s += 'Вход по тренду. Соблюдай риск-менеджмент: не более 1-2% на сделку. Если новости — подожди 5-10 минут.';
        }
        s += '\n\n⚠️ Не финансовая рекомендация.';
        return s;
    }

    if (has('rsi', 'рси')) {
        let s = '📊 RSI (Индекс относительной силы)\n\nИзмеряет скорость и силу движения цены, 0–100.\n';
        s += '• <30 — перепродан (возможен отскок вверх)\n• >70 — перекуплен (возможен откат вниз)\n• 50 — нейтрально\n\n';
        s += '📌 Один RSI не даёт сигнал — комбинируй с трендом (EMA) и MACD.\n📌 Дивергенция RSI + цены — сильный разворотный сигнал.';
        if (ind.rsi !== undefined) {
            s += '\n\n💡 Сейчас по ' + assetName + ': RSI = ' + fmt(ind.rsi) + ' — ' + (ind.rsi < 30 ? 'перепродан' : ind.rsi > 70 ? 'перекуплен' : 'нейтральная зона');
        }
        return s;
    }

    if (has('macd', 'макд')) {
        let s = '📈 MACD\n\nТрендовый индикатор:\n• MACD-линия = EMA12 − EMA26\n• Сигнальная = EMA9 от MACD\n• Гистограмма = MACD − сигнальная\n\n';
        s += '📌 Пересечение MACD выше сигнальной — бычий\n📌 Пересечение ниже — медвежий\n📌 Дивергенция с ценой — разворот';
        if (ind.macd !== undefined) {
            s += '\n\n💡 Сейчас: MACD ' + (ind.macd > ind.macdSignal ? 'бычий' : 'медвежий') + ', гистограмма = ' + fmt(ind.histogram, 3) + (ind.crossover ? ' · crossover ' + ind.crossover : '');
        }
        return s;
    }

    if (has('adx', 'сила тренда', 'сильный тренд', 'слабый тренд')) {
        let s = '🔥 ADX (Average Directional Index)\n\nПоказывает СИЛУ тренда (0–100), но не направление.\n';
        s += '• <20 — тренда нет (флэт)\n• 20–25 — зарождается\n• >25 — сильный тренд\n• >40 — очень сильный\n\n';
        s += '📌 +DI > -DI — бычий тренд, +DI < -DI — медвежий.';
        if (ind.adx !== undefined) {
            s += '\n\n💡 Сейчас по ' + assetName + ':\n• ADX = ' + fmt(ind.adx) + ' (' + (ind.adx > 40 ? 'очень сильный' : ind.adx > 25 ? 'сильный' : ind.adx > 20 ? 'зарождается' : 'слабый') + ')\n';
            s += '• +DI = ' + fmt(ind.plusDI) + ' · -DI = ' + fmt(ind.minusDI) + ' → ' + (ind.plusDI > ind.minusDI ? 'бычий' : 'медвежий');
        }
        return s;
    }

    if (has('atr', 'волатильн')) {
        let s = '⚡ ATR (Average True Range)\n\nСредний истинный диапазон — мера волатильности.\n📌 Стоп ставится на 1.5–2 ATR.\n📌 Чем больше ATR, тем шире стоп.';
        if (ind.atrPct !== undefined) {
            s += '\n\n💡 Сейчас ATR = ' + fmt(ind.atrPct, 2) + '% от цены — ' + (ind.atrPct > 3 ? 'высокая волатильность' : ind.atrPct < 0.3 ? 'низкая волатильность' : 'умеренная');
        }
        return s;
    }

    if (has('stoch', 'стохаст')) {
        let s = '⚡ StochRSI\n\nОсциллятор на базе RSI — чувствительнее.\n• <20 перепродан\n• >80 перекуплен\n📌 Хорош для точных входов на 1m–15m.';
        if (ind.stochRsi !== undefined) {
            s += '\n\n💡 Сейчас StochRSI = ' + fmt(ind.stochRsi) + ' — ' + (ind.stochRsi < 20 ? 'перепродан' : ind.stochRsi > 80 ? 'перекуплен' : 'нейтрально');
        }
        return s;
    }

    if (has('bollinger', 'боллинджер', 'полос')) {
        let s = '📉 Полосы Боллинджера\n\n3 линии: SMA20 ± 2σ.\n📌 Цена у верхней — откат вниз\n📌 Цена у нижней — отскок вверх\n📌 Сужение полос — накопление, скоро пробой';
        if (ind.bbUpper !== undefined) {
            s += '\n\n💡 Сейчас: цена ' + priceStr + ', верхняя ' + fmt(ind.bbUpper, 4) + ', нижняя ' + fmt(ind.bbLower, 4);
        }
        return s;
    }

    if (has('ema', 'машк', 'тренд', 'средние')) {
        let s = '📈 EMA (экспоненциальные скользящие)\n\n📌 9/21/50 — классика\n📌 9>21>50 — сильный бычий\n📌 9<21<50 — сильный медвежий\n📌 Цена выше EMA200 — глобально бычий рынок';
        if (ind.ema9 !== undefined) {
            s += '\n\n💡 Сейчас по ' + assetName + ':\n• EMA9 = ' + fmt(ind.ema9, 4) + '\n• EMA21 = ' + fmt(ind.ema21, 4) + '\n• EMA50 = ' + fmt(ind.ema50, 4);
        }
        return s;
    }

    if (has('диверген', 'divergen')) {
        return '🔍 Дивергенция\n\nРасхождение между ценой и индикатором (чаще RSI/MACD).\n\n📌 Бычья:\n• цена делает новый минимум\n• индикатор — более высокий\n• → возможен разворот вверх\n\n📌 Медвежья:\n• цена делает новый максимум\n• индикатор — более низкий\n• → возможен разворот вниз\n\n📌 Лучше работает на ТФ 1h+. На 1m много ложных.\n📌 Подтверждай объёмом и пробоем уровня.';
    }

    if (has('стоп', 'stop', 'стоп-лосс', 'sl', 'защит')) {
        let s = '🛡 Стоп-лосс\n\nГлавное: стоп ставится ДО входа.\n\n📌 Как ставить:\n• За локальный экстремум\n• Или 1.5–2 ATR от входа\n• Не ближе 5–10 пипсов (шум снесёт)\n\n📌 Лот считается ОТ стопа:\nЛот = (Баланс × Риск%) / (SL в пунктах × Стоимость пункта)';
        if (ind.slUsd !== undefined && balanceVal > 0) {
            s += '\n\n💡 В сигнале: SL = -$' + fmt(ind.slUsd, 2) + ' = ' + ((ind.slUsd / balanceVal) * 100).toFixed(1) + '% от баланса';
        }
        return s;
    }

    if (has('тейк', 'take', 'tp', 'профит', 'прибыль', 'фиксир')) {
        let s = '💰 Тейк-профит\n\n📌 Минимум RR 1:2 (на 1$ риска — 2$ прибыли)\n📌 Ставь перед уровнем, а не за ним\n📌 Можно частями: 50% на 1:1, остаток на 1:3+\n📌 Перед новостями — частично фиксируй';
        if (ind.tpUsd !== undefined) {
            s += '\n\n💡 В сигнале: TP = +$' + fmt(ind.tpUsd, 2);
        }
        return s;
    }

    if (has('риск', 'лот', 'баланс', 'депозит', 'капитал', 'мани-менедж')) {
        let s = '⚠️ Риск-менеджмент\n\n📌 Золотые правила:\n• 1–2% на сделку (агрессивно 3–6%)\n• Не более 5–6% риска суммарно\n• RR минимум 1:2\n• 2 стопа подряд — пауза 30 мин\n• Никогда без стопа\n\n📌 Лот = (Баланс × Риск%) / (SL в пунктах × Стоимость пункта)';
        if (balanceVal > 0) {
            s += '\n\n💡 Твой баланс: $' + balanceVal.toFixed(2) + '\n💡 Лот: ' + lotStr;
        } else {
            s += '\n\n💡 Введи баланс на главном экране — рассчитаю лот и риск.';
        }
        return s;
    }

    if (has('новост', 'news', 'nfp', 'cpi', 'фрс', 'фомс', 'ставк')) {
        return '📰 Новости\n\n📌 За 15–30 минут до важных новостей — НЕ входи\n📌 После — жди 5–10 минут стабилизации\n\n📌 Ключевые:\n• NFP — 1-я пятница, 15:30 МСК\n• CPI/PPI — инфляция, 15:30 МСК\n• FOMC — ставка ФРС, 21:00 МСК\n• ЕЦБ/BoE/BoJ\n\n📌 Волатильность в новости ×5–10. Стопы выносит.\n📌 Бот блокирует сигнал за 30 мин до новости по паре.';
    }

    if (has('сесси', 'время торговли', 'когда торговать')) {
        return '🌏 Торговые сессии (МСК)\n\n📌 Азиатская: 03:00–12:00 — низкая вола, флэт\n📌 Европейская: 10:00–19:00 — средняя\n📌 Американская: 15:30–00:00 — высокая\n\n📌 Лучшие часы для входа: 10:00–13:00 и 16:30–19:00\n📌 Избегай 05:00–08:00 и пятницу после 20:00';
    }

    if (has('паттерн', 'свеч', 'поглощен', 'молот', 'звезд', 'дожи', 'пинцет')) {
        let s = '🕯️ Свечные паттерны\n\n📌 Бычьи:\n• Молот — длинная нижняя тень\n• Бычье поглощение\n• Утренняя звезда\n\n📌 Медвежьи:\n• Падающая звезда\n• Медвежье поглощение\n• Вечерняя звезда\n\n📌 Работают лучше на ключевых уровнях + старших ТФ.';
        if (ind.pattern) {
            s += '\n\n💡 Сейчас: ' + ind.pattern;
        } else {
            s += '\n\n💡 Сейчас чёткого паттерна нет.';
        }
        return s;
    }

    if (has('стратег', 'как торговать', 'с чего начать', 'скальп', 'свинг', 'дейтрейд')) {
        return '🎯 Стратегии\n\n📌 Скальпинг (1m–5m):\n• Держать 1–10 мин\n• 5–15 сделок в день\n• Требует дисциплины\n• Комиссии съедают\n\n📌 Дейтрейдинг (15m–1h):\n• Держать 30 мин – часы\n• 1–3 сделки в день\n• Оптимально для старта\n\n📌 Свинг (4h–1D):\n• Держать дни-недели\n• 1–3 сделки в неделю\n\n📌 Начни с 15m — золотая середина.';
    }

    if (has('тф', 'таймфрейм', 'timeframe', 'время сделки', 'сколько держать')) {
        let s = '⏱ Таймфреймы\n\n📌 1m — скальпинг, 3–10 мин\n📌 5m — скальпинг, 5–15 мин\n📌 15m — дейтрейдинг, 15–30 мин\n📌 30m — дейтрейдинг, 30–60 мин\n📌 1h — дейтрейдинг/свинг, 1–4 часа\n\n📌 Бот подбирает ТФ по силе тренда (ADX).';
        if (ind.tf) {
            s += '\n\n💡 Сейчас: ТФ ' + ind.tf + ' · Держать ' + (ind.tradeMinutes || '—') + ' мин';
        }
        return s;
    }

    return '🤔 Не понял вопрос.\n\nЯ работаю на локальном алгоритме — без внешних AI. Отвечаю только по трейдингу и текущему анализу.\n\n📋 Попробуй:\n• «Дай сигнал»\n• «RSI» / «MACD» / «ADX» / «ATR» / «StochRSI» / «Bollinger»\n• «Стоп-лосс» / «Тейк» / «Риск» / «Лот»\n• «Дивергенция» / «Паттерны» / «Свечи»\n• «Тренд» / «EMA» / «Новости» / «Сессии»\n• «Стратегия» / «ТФ»\n• «Помощь» — список тем\n\n⚠️ Не финансовая рекомендация.';
}

async function toggleChart() {
    const overlay = document.getElementById('chartOverlay');
    if (!isChartOpen) {
        overlay.classList.add('active');
        isChartOpen = true;
        document.getElementById('chartHeaderPair').textContent = ASSETS[document.getElementById('pairSelect').value].name;
        await loadTradingView();
    } else {
        overlay.classList.remove('active');
        isChartOpen = false;
    }
}

async function loadTradingView() {
    const key = document.getElementById('pairSelect').value;
    const asset = ASSETS[key];
    let tvInterval = '15';
    const map = { '1min':'1', '5min':'5', '15min':'15', '30min':'30', '1h':'60' };
    if (getTwelveKeys().length > 0 && asset.td) {
        try {
            const tf = await getBestTimeframe(asset);
            tvInterval = map[tf] || '15';
        } catch(e) {}
    }
    const tvUrl = 'https://s.tradingview.com/widgetembed/?symbol=' + asset.tvSym +
        '&interval=' + tvInterval +
        '&hidetoptoolbar=1&theme=dark&style=1&locale=ru&enable_publishing=0&withdateranges=1&hide_side_toolbar=1';
    const iframe = document.getElementById('tvIframe');
    if (iframe.src !== tvUrl) iframe.src = tvUrl;
}

function getCurrencyFromPair(asset) {
    if (asset.type === 'forex') return [asset.base, asset.quote];
    if (asset.td === 'XAU/USD') return ['XAU', 'USD'];
    return ['USD'];
}

async function checkNewsFilter(asset) {
    const now = Date.now();
    if (now - newsCacheTime < 15 * 60 * 1000) return filterUpcomingNews(asset, newsCache);
    try {
        const url = 'https://showmytrades.com/api/public/calendar/v1?impact=high&days=1';
        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), 8000);
        let res;
        try { res = await fetch(url, { signal: controller.signal }); }
        finally { clearTimeout(timer); }
        if (!res.ok) throw new Error('News');
        const data = await res.json();
        newsCache = data.events || data;
        newsCacheTime = now;
        return filterUpcomingNews(asset, newsCache);
    } catch (e) {
        return { hasNews: false, message: '' };
    }
}

function filterUpcomingNews(asset, events) {
    if (!Array.isArray(events)) return { hasNews: false, message: '' };
    const currencies = getCurrencyFromPair(asset);
    const now = new Date();
    const thirtyMinsLater = new Date(now.getTime() + 30 * 60 * 1000);
    const upcoming = events.find(e => {
        if (!currencies.includes(e.currency)) return false;
        const eventTime = new Date(e.date);
        return eventTime >= now && eventTime <= thirtyMinsLater;
    });
    if (upcoming) {
        return {
            hasNews: true,
            message: '⚠️ Важные новости по ' + upcoming.currency + ' в ' + String(upcoming.date).substring(11, 16) +
                     ' UTC (' + upcoming.title + '). Сигналы могут быть ложными!'
        };
    }
    return { hasNews: false, message: '' };
}

function isMarketOpen(asset) {
    if (asset.type === 'crypto' && asset.td !== 'XAU/USD') return { open: true, reason: 'Крипта 24/7' };
    const isForexLike = asset.type === 'forex' || asset.td === 'XAU/USD';
    if (!isForexLike) return { open: true, reason: 'Открыто' };
    const now = new Date();
    const day = now.getUTCDay();
    const timeInMinutes = now.getUTCHours() * 60 + now.getUTCMinutes();
    const year = now.getUTCFullYear();
    const marchSecondSunday = new Date(Date.UTC(year, 2, 8 + ((7 - new Date(Date.UTC(year, 2, 8)).getUTCDay()) % 7)));
    const novFirstSunday = new Date(Date.UTC(year, 10, 1 + ((7 - new Date(Date.UTC(year, 10, 1)).getUTCDay()) % 7)));
    const isDST = now >= marchSecondSunday && now < novFirstSunday;
    const marketOpenMinutes = isDST ? 21 * 60 : 22 * 60;
    const mskOpenString = isDST ? "00:00 МСК (лето)" : "01:00 МСК (зима)";
    const label = asset.td === 'XAU/USD' ? 'Металлы' : 'Форекс';
    if (day === 6) return { open: false, reason: "Суббота — " + label.toLowerCase() + " закрыт" };
    if (day === 0 && timeInMinutes < marketOpenMinutes) return { open: false, reason: label + " откроется в " + mskOpenString };
    if (day === 5 && timeInMinutes >= marketOpenMinutes) return { open: false, reason: label + " закрыт до воскресенья (" + mskOpenString + ")" };
    return { open: true, reason: label + " открыт" };
}

async function getBestTimeframe(asset) {
    if (getTwelveKeys().length === 0 || !asset.td) return '15min';
    const now = Date.now();
    const cached = tfCache[asset.td];
    if (cached && (now - cached.ts) < 10 * 60 * 1000) return cached.tf;
    const tfs = ['1min', '5min', '15min', '30min', '1h'];
    let bestTf = '15min', maxAdx = 0;
    for (const tf of tfs) {
        try {
            const data = await fetchTwelveData('time_series', 'symbol=' + encodeURIComponent(asset.td) + '&interval=' + tf + '&outputsize=50');
            if (!data.values || data.values.length < 30) continue;
            const highs = [], lows = [], closes = [];
            data.values.forEach(v => {
                highs.push(parseFloat(v.high));
                lows.push(parseFloat(v.low));
                closes.push(parseFloat(v.close));
            });
            const adxData = calcADX(highs, lows, closes, 14);
            if (adxData.adx > maxAdx) { maxAdx = adxData.adx; bestTf = tf; }
        } catch(e) {}
    }
    tfCache[asset.td] = { tf: bestTf, ts: now };
    return bestTf;
}

async function fetchDataForAsset(asset) {
    if (getTwelveKeys().length === 0) throw new Error('Добавьте Twelve Data ключи в настройках');
    if (!asset.td) throw new Error('Символ не поддерживается');
    const tf = await getBestTimeframe(asset);
    const data = await fetchTwelveData('time_series', 'symbol=' + encodeURIComponent(asset.td) + '&interval=' + tf + '&outputsize=100');
    if (!data.values || data.values.length < 30) throw new Error(data.message || 'Мало данных');
    const values = data.values.slice().reverse();
    const r = { opens: [], highs: [], lows: [], closes: [], volumes: [], tf: tf };
    values.forEach(v => {
        r.opens.push(parseFloat(v.open));
        r.highs.push(parseFloat(v.high));
        r.lows.push(parseFloat(v.low));
        r.closes.push(parseFloat(v.close));
        r.volumes.push(parseFloat(v.volume) || 0);
    });
    return r;
}

async function analyzeMarket() {
    const btn = document.getElementById('analyzeBtn');

    const balRaw = document.getElementById('balanceInput').value;
    const balNum = parseFloat(balRaw);
    if (!balRaw || !isFinite(balNum) || balNum <= 0) {
        const signalBox = document.getElementById('signalBox');
        const signalAction = document.getElementById('signalAction');
        const warningBox = document.getElementById('warningBox');
        const aiBox = document.getElementById('aiBox');
        const timeBox = document.getElementById('timeBox');
        signalAction.textContent = 'ВВЕДИТЕ БАЛАНС';
        signalAction.className = 'signal-action wait';
        warningBox.textContent = '⚠️ Без баланса анализ невозможен — стоп-лосс и тейк-профит рассчитываются от размера вашего депозита. Введите баланс в поле выше.';
        warningBox.style.display = 'block';
        aiBox.style.display = 'none';
        timeBox.style.display = 'none';
        signalBox.style.display = 'block';
        document.getElementById('balanceInput').focus();
        return;
    }

    btn.disabled = true;
    btn.textContent = '⏳ Анализ...';
    try {
        document.getElementById('signalBox').style.display = 'none';
        document.getElementById('aiBox').style.display = 'none';
        document.getElementById('warningBox').style.display = 'none';
        document.getElementById('timeBox').style.display = 'none';

        const key = document.getElementById('pairSelect').value;
        const asset = ASSETS[key];

        showScan(); await sleep(150);
        updateScan(8, 'Проверка торговой сессии...'); await sleep(200);
        const market = isMarketOpen(asset);
        if (!market.open) {
            hideScan();
            document.getElementById('signalAction').textContent = 'РЫНОК ЗАКРЫТ';
            document.getElementById('signalAction').className = 'signal-action closed';
            document.getElementById('warningBox').textContent = market.reason;
            document.getElementById('warningBox').style.display = 'block';
            document.getElementById('signalBox').style.display = 'block';
            return;
        }

        updateScan(10, 'Проверка календаря...'); await sleep(200);
        const news = await checkNewsFilter(asset);

        updateScan(15, 'Загрузка данных...'); await sleep(200);
        let data;
        try {
            updateScan(22, 'Авто-подбор ТФ (1m–1h)...');
            await sleep(150);
            data = await fetchDataForAsset(asset);
        } catch(e) {
            hideScan();
            alert('Ошибка данных: ' + e.message + '\n\nДобавьте Twelve Data ключи в настройках (⚙️)');
            return;
        }

        const opens = data.opens, highs = data.highs, lows = data.lows, closes = data.closes, volumes = data.volumes, bestTf = data.tf;

        updateScan(42, 'Расчёт EMA...'); await sleep(200);
        const ema9 = calcEMA(closes, 9);
        const ema21 = calcEMA(closes, 21);
        const ema50 = calcEMA(closes, 50);

        updateScan(55, 'MACD/RSI/StochRSI...'); await sleep(220);
        const rsi = calcRSI(closes, 14);
        const stochRsi = calcStochRSI(closes, 14, 14);
        const macd = calcMACD(closes);

        updateScan(68, 'ADX и ATR...'); await sleep(200);
        const atr = calcATR(highs, lows, closes, 14);
        const adxData = calcADX(highs, lows, closes, 14);

        updateScan(78, 'Свечные паттерны...'); await sleep(180);
        const pattern = detectCandlePattern(opens, highs, lows, closes);
        const bb = calcBollingerBands(closes, 20, 2);
        const last = closes[closes.length - 1];

        updateScan(88, 'Формирование сигнала...'); await sleep(220);
        let score = 0;
        const reasons = [];

        const e9 = ema9[ema9.length - 1];
        const e21 = ema21[ema21.length - 1];
        const e50 = ema50.length ? ema50[ema50.length - 1] : e21;
        if (e9 > e21 && e21 > e50) { score += 2; reasons.push('📈 Сильный восходящий тренд (EMA 9>21>50)'); }
        else if (e9 < e21 && e21 < e50) { score -= 2; reasons.push('📉 Сильный нисходящий тренд (EMA 9<21<50)'); }
        else if (e9 > e21) { score += 1; reasons.push('📈 EMA 9>21'); }
        else { score -= 1; reasons.push('📉 EMA 9<21'); }

        if (macd.macd > macd.signal && macd.histogram > 0) { score += 1; reasons.push('🟢 MACD бычий'); }
        else if (macd.macd < macd.signal && macd.histogram < 0) { score -= 1; reasons.push('🔴 MACD медвежий'); }
        if (macd.crossover === 'bull') { score += 0.5; reasons.push('⚡ MACD crossover ↑'); }
        if (macd.crossover === 'bear') { score -= 0.5; reasons.push('⚡ MACD crossover ↓'); }

        const oversoldCount = (rsi < 30 ? 1 : 0) + (stochRsi < 20 ? 1 : 0);
        const overboughtCount = (rsi > 70 ? 1 : 0) + (stochRsi > 80 ? 1 : 0);
        if (rsi < 30) reasons.push('📊 RSI ' + rsi.toFixed(0) + ' (перепродан)');
        else if (rsi > 70) reasons.push('📊 RSI ' + rsi.toFixed(0) + ' (перекуплен)');
        if (stochRsi < 20) reasons.push('⚡ StochRSI ' + stochRsi.toFixed(0) + ' (перепродан)');
        else if (stochRsi > 80) reasons.push('⚡ StochRSI ' + stochRsi.toFixed(0) + ' (перекуплен)');
        if (oversoldCount === 2) score += 1.5;
        else if (oversoldCount === 1) score += 0.7;
        if (overboughtCount === 2) score -= 1.5;
        else if (overboughtCount === 1) score -= 0.7;

        if (last > bb.upper && score > 0) { score -= 1; reasons.push('⛔ Пробой верхней BB'); }
        if (last < bb.lower && score < 0) { score += 1; reasons.push('⛔ Пробой нижней BB'); }

        if (adxData.adx > 25) {
            if (adxData.plusDI > adxData.minusDI) { score += 0.7; reasons.push('🔥 ADX ' + adxData.adx.toFixed(0) + ' ↑'); }
            else { score -= 0.7; reasons.push('🔥 ADX ' + adxData.adx.toFixed(0) + ' ↓'); }
            if (adxData.adx > 40) { score += Math.sign(score) * 0.5; reasons.push('💪 Очень сильный тренд'); }
        } else if (adxData.adx < 20) {
            score *= 0.3;
            reasons.push('⚠️ Слабый тренд (ADX<20)');
        }

        if (pattern) {
            if (pattern.includes('Бычье') || pattern.includes('Молот')) { score += 1.5; reasons.push('🕯️ ' + pattern); }
            if (pattern.includes('Медвежье') || pattern.includes('звезда')) { score -= 1.5; reasons.push('🕯️ ' + pattern); }
        }

        if (volumes.length > 20) {
            const avgVol = volumes.slice(-20, -1).reduce((a, b) => a + b, 0) / 19;
            const lastVol = volumes[volumes.length - 1];
            if (lastVol > avgVol * 1.5) { score += Math.sign(score) * 0.5; reasons.push('📊 Объём ×1.5'); }
        }

        const atrPct = last ? (atr / last * 100) : 0;
        if (atrPct > 3) reasons.push('⚡ Высокая волатильность (ATR ' + atrPct.toFixed(1) + '%)');

        const utcHour = new Date().getUTCHours();
        const isAsianSession = asset.type === 'forex' && utcHour >= 0 && utcHour < 7 && (key === 'EURUSD' || key === 'GBPUSD');
        if (isAsianSession) reasons.push('🌏 Азиатская сессия (слабый тренд)');

        let dir = score >= 1 ? 'UP' : (score <= -1 ? 'DOWN' : 'WAIT');
        if (news.hasNews) { dir = 'WAIT'; reasons.unshift(news.message); }

        const absScore = Math.abs(score);
        let confidence = Math.min(99, Math.round(absScore * 14 + 22));
        if (isAsianSession) confidence = Math.max(20, confidence - 10);
        if (news.hasNews) confidence = Math.min(confidence, 15);

        let tradeMinutes;
        if (bestTf === '1min') tradeMinutes = 5;
        else if (bestTf === '5min') tradeMinutes = 10;
        else if (bestTf === '15min') tradeMinutes = 15;
        else if (bestTf === '30min') tradeMinutes = 30;
        else tradeMinutes = 45;
        if (adxData.adx > 35) tradeMinutes = Math.round(tradeMinutes * 1.3);
        if (adxData.adx > 45) tradeMinutes = Math.round(tradeMinutes * 1.5);
        if (stochRsi < 20 || stochRsi > 80) tradeMinutes = Math.round(tradeMinutes * 0.8);
        if (atrPct > 2) tradeMinutes = Math.round(tradeMinutes * 0.85);
        if (atrPct < 0.3) tradeMinutes = Math.round(tradeMinutes * 1.15);
        tradeMinutes = Math.max(3, Math.min(60, tradeMinutes));

        let sltpHtml = '';
        let _lossUsd, _profitUsd;
        if (dir !== 'WAIT') {
            const slPrice = dir === 'UP' ? last - atr * 1.5 : last + atr * 1.5;
            const tpPrice = dir === 'UP' ? last + atr * 2 : last - atr * 2;
            const lot = calcAutoLot(key, balNum, last);
            const pipVal = asset.pipValFn ? asset.pipValFn(last) : asset.pipVal;
            const slPips = Math.abs(last - slPrice) / asset.pip;
            const tpPips = Math.abs(tpPrice - last) / asset.pip;
            const lossUsd = slPips * pipVal * lot;
            const profitUsd = tpPips * pipVal * lot;
            if (lossUsd > balNum) {
                dir = 'WAIT';
                reasons.unshift('⛔ СТОП-ЛОСС (-$' + lossUsd.toFixed(2) + ') БОЛЬШЕ БАЛАНСА! Сделка отменена.');
                confidence = 0;
            } else {
                _lossUsd = lossUsd;
                _profitUsd = profitUsd;
                sltpHtml = '<br>🎯 Вход: <b>' + last.toFixed(asset.dec) + '</b>' +
                    '<br>📦 Лот: <b>' + lot + '</b> (от $' + balNum.toFixed(2) + ')' +
                    '<br><span class="sl">🛡 Стоп: -$' + lossUsd.toFixed(2) + '</span> | <span class="tp">💰 Тейк: +$' + profitUsd.toFixed(2) + '</span>';
            }
        }

        const tfLabel = bestTf === '1h' ? '1H'
            : bestTf === '30min' ? '30M'
            : bestTf === '15min' ? '15M'
            : bestTf === '5min' ? '5M' : '1M';
        const timeMessage = (dir !== 'WAIT') ? '<br>⏱ Время сделки: <span class="conf">' + tradeMinutes + ' мин</span>' : '';

        updateScan(100, 'Готово!'); await sleep(400); hideScan();

        lastIndicators = {
            rsi: rsi, stochRsi: stochRsi, macd: macd.macd, macdSignal: macd.signal,
            histogram: macd.histogram, crossover: macd.crossover, adx: adxData.adx,
            plusDI: adxData.plusDI, minusDI: adxData.minusDI, atr: atr, atrPct: atrPct,
            bbUpper: bb.upper, bbLower: bb.lower, ema9: e9, ema21: e21, ema50: e50,
            pattern: pattern, score: score, dir: dir, confidence: confidence,
            tf: tfLabel, tradeMinutes: tradeMinutes, slUsd: _lossUsd, tpUsd: _profitUsd,
            price: last
        };

        document.getElementById('aiText').innerHTML =
            '<b>ТФ: ' + tfLabel + '</b> · <span class="conf">Уверенность: ' + confidence + '%</span>' +
            '<br>💵 Баланс: <b>$' + balNum.toFixed(2) + '</b>' +
            '<br>' + reasons.join('<br>') + sltpHtml + timeMessage;
        document.getElementById('aiBox').style.display = 'block';

        const actEl = document.getElementById('signalAction');
        actEl.textContent = dir === 'UP' ? 'ВВЕРХ (CALL)' : (dir === 'DOWN' ? 'ВНИЗ (PUT)' : (news.hasNews ? 'НОВОСТИ' : 'ОЖИДАНИЕ'));
        actEl.className = 'signal-action ' + (dir === 'UP' ? 'up' : (dir === 'DOWN' ? 'down' : 'wait'));

        if (dir !== 'WAIT') {
            playAlert();
            document.getElementById('timeBox').style.display = 'block';
            document.getElementById('tradeTimeValue').textContent = tradeMinutes + ' МИН';
            document.getElementById('tradeTfValue').textContent = 'ТФ: ' + tfLabel;
        }
        if (news.hasNews) {
            document.getElementById('warningBox').textContent = news.message;
            document.getElementById('warningBox').style.display = 'block';
        }
        document.getElementById('signalBox').style.display = 'block';

        lastAnalysisContext = 'Сигнал: ' + dir + '. Уверенность: ' + confidence + '%. Цена: ' + last.toFixed(asset.dec) + '. ТФ: ' + tfLabel +
            '. Баланс: $' + balNum.toFixed(2) + '. RSI=' + rsi.toFixed(1) + ', StochRSI=' + stochRsi.toFixed(1) +
            ', MACD=' + (macd.histogram > 0 ? 'бычий' : 'медвежий') + ', ADX=' + adxData.adx.toFixed(1) +
            ', ATR=' + atrPct.toFixed(2) + '%. Причины: ' + reasons.join('; ') + '. Держать: ' + tradeMinutes + ' минут.';

        if (isChartOpen) addChatMessage('⚡ Анализ ' + asset.name + ' готов. Спрашивай!', 'system');
        updateRisk();
    } finally {
        btn.disabled = false;
        btn.textContent = '⚡ ЗАПУСТИТЬ ИИ';
    }
}

function calcEMA(a, p) {
    const k = 2 / (p + 1);
    const e = [a[0]];
    for (let i = 1; i < a.length; i++) e.push(a[i] * k + e[i - 1] * (1 - k));
    return e;
}

function calcRSI(closes, period) {
    period = period || 14;
    if (closes.length < period + 1) return 50;
    let g = 0, l = 0;
    for (let i = closes.length - period; i < closes.length; i++) {
        const d = closes[i] - closes[i - 1];
        d >= 0 ? g += d : l -= d;
    }
    const rs = (g / period) / ((l / period) || 1);
    return 100 - 100 / (1 + rs);
}

function calcStochRSI(closes, rsiPeriod, stochPeriod) {
    rsiPeriod = rsiPeriod || 14;
    stochPeriod = stochPeriod || 14;
    if (closes.length < rsiPeriod + stochPeriod) return 50;
    const rsiArr = [];
    for (let i = rsiPeriod; i < closes.length; i++) {
        let g = 0, l = 0;
        for (let j = 1; j <= rsiPeriod; j++) {
            const d = closes[i - j + 1] - closes[i - j];
            d >= 0 ? g += d : l -= d;
        }
        const rs = (g / rsiPeriod) / ((l / rsiPeriod) || 1);
        rsiArr.push(100 - 100 / (1 + rs));
    }
    if (rsiArr.length < stochPeriod) return 50;
    const subRsi = rsiArr.slice(-stochPeriod);
    const min = Math.min.apply(null, subRsi);
    const max = Math.max.apply(null, subRsi);
    if (max === min) return 50;
    return ((rsiArr[rsiArr.length - 1] - min) / (max - min)) * 100;
}

function calcMACD(closes) {
    const fast = 12, slow = 26, sig = 9;
    if (closes.length < slow + sig) return { macd: 0, signal: 0, histogram: 0, crossover: null };
    const emaFast = calcEMA(closes, fast);
    const emaSlow = calcEMA(closes, slow);
    const macdLine = emaFast.map((v, i) => v - emaSlow[i]);
    const sigLine = calcEMA(macdLine.slice(slow - 1), sig);
    const lastMacd = macdLine[macdLine.length - 1];
    const lastSig = sigLine[sigLine.length - 1];
    const prevMacd = macdLine[macdLine.length - 2];
    const prevSig = sigLine[sigLine.length - 2];
    let crossover = null;
    if (prevMacd <= prevSig && lastMacd > lastSig) crossover = 'bull';
    if (prevMacd >= prevSig && lastMacd < lastSig) crossover = 'bear';
    return { macd: lastMacd, signal: lastSig, histogram: lastMacd - lastSig, crossover: crossover };
}

function calcATR(highs, lows, closes, period) {
    period = period || 14;
    if (closes.length < period + 1) return 0;
    const trs = [];
    for (let i = 1; i < closes.length; i++) {
        trs.push(Math.max(
            highs[i] - lows[i],
            Math.abs(highs[i] - closes[i - 1]),
            Math.abs(lows[i] - closes[i - 1])
        ));
    }
    let atr = trs.slice(0, period).reduce((a, b) => a + b, 0) / period;
    for (let i = period; i < trs.length; i++) {
        atr = (atr * (period - 1) + trs[i]) / period;
    }
    return atr;
}

function calcADX(highs, lows, closes, period) {
    period = period || 14;
    if (closes.length < period * 2 + 1) return { adx: 25, plusDI: 50, minusDI: 50 };
    const trArr = [], plusDMArr = [], minusDMArr = [];
    for (let i = 1; i < closes.length; i++) {
        const tr = Math.max(
            highs[i] - lows[i],
            Math.abs(highs[i] - closes[i - 1]),
            Math.abs(lows[i] - closes[i - 1])
        );
        const up = highs[i] - highs[i - 1];
        const dn = lows[i - 1] - lows[i];
        trArr.push(tr);
        plusDMArr.push((up > dn && up > 0) ? up : 0);
        minusDMArr.push((dn > up && dn > 0) ? dn : 0);
    }
    let sTR = trArr.slice(0, period).reduce((a, b) => a + b, 0);
    let sPDM = plusDMArr.slice(0, period).reduce((a, b) => a + b, 0);
    let sMDM = minusDMArr.slice(0, period).reduce((a, b) => a + b, 0);
    const dxArr = [];
    let lastPDI = 0, lastMDI = 0;
    for (let i = period; i < trArr.length; i++) {
        sTR = sTR - (sTR / period) + trArr[i];
        sPDM = sPDM - (sPDM / period) + plusDMArr[i];
        sMDM = sMDM - (sMDM / period) + minusDMArr[i];
        const plusDI = 100 * (sPDM / (sTR || 1));
        const minusDI = 100 * (sMDM / (sTR || 1));
        dxArr.push(100 * Math.abs(plusDI - minusDI) / ((plusDI + minusDI) || 1));
        lastPDI = plusDI;
        lastMDI = minusDI;
    }
    if (dxArr.length < period) return { adx: 25, plusDI: 50, minusDI: 50 };
    let adx = dxArr.slice(0, period).reduce((a, b) => a + b, 0) / period;
    for (let i = period; i < dxArr.length; i++) {
        adx = (adx * (period - 1) + dxArr[i]) / period;
    }
    return { adx: adx, plusDI: lastPDI, minusDI: lastMDI };
}

function detectCandlePattern(opens, highs, lows, closes) {
    if (closes.length < 2) return null;
    const i = closes.length - 1;
    const o = opens[i], h = highs[i], l = lows[i], c = closes[i];
    const po = opens[i - 1], pc = closes[i - 1];
    const body = Math.abs(c - o);
    const upperWick = h - Math.max(c, o);
    const lowerWick = Math.min(c, o) - l;
    if (pc < po && c > o && c > po && o < pc) return 'Бычье поглощение';
    if (pc > po && c < o && c < po && o > pc) return 'Медвежье поглощение';
    if (body > 0 && lowerWick > body * 2 && upperWick < body * 0.5) return 'Молот';
    if (body > 0 && upperWick > body * 2 && lowerWick < body * 0.5) return 'Падающая звезда';
    return null;
}

function calcBollingerBands(data, period, mult) {
    period = period || 20;
    mult = mult || 2;
    if (data.length < period) return { upper: Infinity, lower: -Infinity };
    const slice = data.slice(-period);
    const sma = slice.reduce((a, b) => a + b, 0) / period;
    const variance = slice.reduce((a, b) => a + Math.pow(b - sma, 2), 0) / period;
    const sd = Math.sqrt(variance);
    return { upper: sma + mult * sd, lower: sma - mult * sd };
}

function changePair() {
    document.getElementById('signalBox').style.display = 'none';
    document.getElementById('aiBox').style.display = 'none';
    document.getElementById('warningBox').style.display = 'none';
    document.getElementById('timeBox').style.display = 'none';
    lastAnalysisContext = '';
    document.getElementById('statPrice').textContent = '...';
    document.getElementById('statHighLow').textContent = '— / —';
    document.getElementById('statVol').textContent = '—';
    document.getElementById('statTrend').textContent = '...';
    document.getElementById('statTrend').className = 'v';
    if (isChartOpen) {
        document.getElementById('chartHeaderPair').textContent = ASSETS[document.getElementById('pairSelect').value].name;
        loadTradingView();
        addChatMessage('Переключение на ' + ASSETS[document.getElementById('pairSelect').value].name, 'system');
    }
    fetch24hStats(ASSETS[document.getElementById('pairSelect').value]);
}

async function fetch24hStats(asset) {
    if (!asset) return;
    try {
        if (getTwelveKeys().length === 0 || !asset.td) throw new Error('Нет ключей');
        const data = await fetchTwelveData('quote', 'symbol=' + encodeURIComponent(asset.td));
        if (data.status === 'error') throw new Error(data.message);
        const price = parseFloat(data.close);
        document.getElementById('statPrice').textContent = isFinite(price) ? price.toFixed(asset.dec) : '—';
        const hi = parseFloat(data.high);
        const lo = parseFloat(data.low);
        document.getElementById('statHighLow').textContent = isFinite(hi) && isFinite(lo)
            ? (hi.toFixed(asset.dec) + ' / ' + lo.toFixed(asset.dec)) : '— / —';
        const vol = parseFloat(data.volume);
        document.getElementById('statVol').textContent = isFinite(vol) && vol > 0
            ? ((vol / 1000).toFixed(1) + 'K') : '—';
        currentPrice = isFinite(price) ? price : 0;
        const chg = parseFloat(data.percent_change);
        const trendEl = document.getElementById('statTrend');
        const chgThreshold = asset.type === 'forex' ? 0.1 : 1;
        if (!isFinite(chg)) { trendEl.textContent = '—'; trendEl.className = 'v'; }
        else if (chg > chgThreshold) { trendEl.textContent = 'Бычий'; trendEl.className = 'v green'; }
        else if (chg < -chgThreshold) { trendEl.textContent = 'Медвежий'; trendEl.className = 'v red'; }
        else { trendEl.textContent = 'Флэт'; trendEl.className = 'v'; }
        updateRisk();
    } catch(e) {
        document.getElementById('statPrice').textContent = '—';
        updateRisk();
    }
}

function playAlert() {
    try {
        if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        if (audioCtx.state === 'suspended') audioCtx.resume();
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(880, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(440, audioCtx.currentTime + 0.1);
        gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.5);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.5);
    } catch(e) {}
}

function calculateWinrate() {
    const hist = JSON.parse(safeGet('_app_h1') || '[]');
    const closed = hist.filter(h => h.result === 'win' || h.result === 'loss');
    if (closed.length === 0) return;
    const wins = closed.filter(h => h.result === 'win').length;
    document.getElementById('winrateBadge').style.display = 'flex';
    document.getElementById('winrateText').textContent =
        Math.round((wins / closed.length) * 100) + '% (' + wins + '/' + closed.length + ')';
}

function toggleAutoSignals(cb) {
    if (cb.checked) {
        if (getTwelveKeys().length === 0) {
            alert('⚠️ Для авто-сигналов добавьте Twelve Data ключи');
            cb.checked = false;
            return;
        }
        if (!('Notification' in window)) {
            alert('Браузер не поддерживает уведомления');
            cb.checked = false;
            return;
        }
        Notification.requestPermission().then(p => {
            if (p === 'granted') {
                if (autoInterval) clearInterval(autoInterval);
                autoInterval = setInterval(checkAutoSignal, 60000);
                alert('Авто-сигналы включены!');
            } else {
                cb.checked = false;
                alert('Разрешите уведомления');
            }
        });
    } else {
        if (autoInterval) { clearInterval(autoInterval); autoInterval = null; }
    }
}

async function checkAutoSignal() {
    const key = document.getElementById('pairSelect').value;
    const asset = ASSETS[key];
    if (!asset || !isMarketOpen(asset).open) return;
    if (getTwelveKeys().length === 0 || !asset.td) return;
    const news = await checkNewsFilter(asset);
    if (news.hasNews) return;
    try {
        const tf = await getBestTimeframe(asset);
        const data = await fetchTwelveData('time_series', 'symbol=' + encodeURIComponent(asset.td) + '&interval=' + tf + '&outputsize=50');
        if (!data.values) return;
        const closes = data.values.slice().reverse().map(v => parseFloat(v.close));
        if (closes.length < 22) return;
        const ema9 = calcEMA(closes, 9);
        const ema21 = calcEMA(closes, 21);
        const last9 = ema9[ema9.length - 1];
        const last21 = ema21[ema21.length - 1];
        if (last9 && last21 && (last9 > last21 * 1.0005 || last9 < last21 * 0.9995)) {
            const dir = last9 > last21 ? 'ВВЕРХ' : 'ВНИЗ';
            const now = Date.now();
            if (dir === lastAutoSignalDir && (now - lastAutoSignalTime) < 15 * 60 * 1000) return;
            lastAutoSignalDir = dir;
            lastAutoSignalTime = now;
            playAlert();
            const tfLabel = tf === '1h' ? '1H'
                : tf === '30min' ? '30M'
                : tf === '15min' ? '15M'
                : tf === '5min' ? '5M' : '1M';
            new Notification('Tuchkov AI: ' + asset.name + ' (' + tfLabel + ')', { body: 'Сигнал: ' + dir });
        } else {
            lastAutoSignalDir = null;
        }
    } catch(e) {}
}

function getAssetIcon(key) {
    const icons = {
        BTCUSD: '₿', ETHUSD: 'Ξ', SOLUSD: '◎', BNBUSD: 'B', XRPUSD: '✕',
        ADAUSD: '₳', DOGEUSD: 'Ð', AVAXUSD: '▲', LINKUSD: '⬡',
        XAUUSD: '🥇', EURUSD: '€', GBPUSD: '£', USDJPY: '¥'
    };
    return icons[key] || key.charAt(0);
}

async function analyzeForScanner(asset) {
    if (getTwelveKeys().length === 0 || !asset.td) throw new Error('Нет ключей');
    const tf = await getBestTimeframe(asset);
    const data = await fetchTwelveData('time_series', 'symbol=' + encodeURIComponent(asset.td) + '&interval=' + tf + '&outputsize=100');
    if (!data.values || data.values.length < 50) throw new Error('Мало данных');
    const values = data.values.slice().reverse();
    const opens = [], highs = [], lows = [], closes = [], volumes = [];
    values.forEach(v => {
        opens.push(parseFloat(v.open));
        highs.push(parseFloat(v.high));
        lows.push(parseFloat(v.low));
        closes.push(parseFloat(v.close));
        volumes.push(parseFloat(v.volume) || 0);
    });
    const last = closes[closes.length - 1];
    const ema9 = calcEMA(closes, 9);
    const ema21 = calcEMA(closes, 21);
    const ema50 = calcEMA(closes, 50);
    const rsi = calcRSI(closes, 14);
    const stochRsi = calcStochRSI(closes, 14, 14);
    const macd = calcMACD(closes);
    const adxData = calcADX(highs, lows, closes, 14);
    const bb = calcBollingerBands(closes, 20, 2);
    const pattern = detectCandlePattern(opens, highs, lows, closes);
    const atr = calcATR(highs, lows, closes, 14);
    let score = 0;
    const e9 = ema9[ema9.length - 1];
    const e21 = ema21[ema21.length - 1];
    const e50 = ema50.length ? ema50[ema50.length - 1] : e21;
    if (e9 > e21 && e21 > e50) score += 2;
    else if (e9 < e21 && e21 < e50) score -= 2;
    else if (e9 > e21) score += 1;
    else score -= 1;
    if (macd.macd > macd.signal && macd.histogram > 0) score += 1;
    else if (macd.macd < macd.signal && macd.histogram < 0) score -= 1;
    if (macd.crossover === 'bull') score += 0.5;
    if (macd.crossover === 'bear') score -= 0.5;
    const os = (rsi < 30 ? 1 : 0) + (stochRsi < 20 ? 1 : 0);
    const ob = (rsi > 70 ? 1 : 0) + (stochRsi > 80 ? 1 : 0);
    if (os === 2) score += 1.5; else if (os === 1) score += 0.7;
    if (ob === 2) score -= 1.5; else if (ob === 1) score -= 0.7;
    if (last > bb.upper && score > 0) score -= 1;
    if (last < bb.lower && score < 0) score += 1;
    if (adxData.adx > 25) {
        if (adxData.plusDI > adxData.minusDI) score += 0.7;
        else score -= 0.7;
    } else if (adxData.adx < 20) score *= 0.3;
    if (pattern) {
        if (pattern.includes('Бычье') || pattern.includes('Молот')) score += 1.5;
        if (pattern.includes('Медвежье') || pattern.includes('звезда')) score -= 1.5;
    }
    const dir = score >= 1 ? 'UP' : (score <= -1 ? 'DOWN' : 'WAIT');
    const absScore = Math.abs(score);
    let confidence = Math.min(99, Math.round(absScore * 14 + 22));
    if (adxData.adx < 20) confidence = Math.max(15, confidence - 15);
    return {
        dir: dir,
        confidence: confidence,
        last: last,
        rsi: rsi,
        adx: adxData.adx,
        atrPct: last ? (atr / last * 100) : 0,
        tf: tf
    };
}

async function runScanner() {
    if (getTwelveKeys().length === 0) {
        alert('⚠️ Для сканера добавьте Twelve Data ключи');
        return;
    }
    const btn = document.getElementById('scanBtn');
    if (btn) { btn.disabled = true; btn.innerHTML = '<span>⏳</span> Сканирую...'; }
    try {
        showScan(); await sleep(150);
        updateScan(3, 'Инициализация...');
        try {
            if (Date.now() - newsCacheTime > 15 * 60 * 1000) {
                updateScan(6, 'Загрузка новостей...');
                const controller = new AbortController();
                const timer = setTimeout(() => controller.abort(), 8000);
                let res;
                try {
                    res = await fetch('https://showmytrades.com/api/public/calendar/v1?impact=high&days=1', { signal: controller.signal });
                } finally { clearTimeout(timer); }
                if (res.ok) {
                    const data = await res.json();
                    newsCache = data.events || data;
                    newsCacheTime = Date.now();
                }
            }
        } catch(e) {}
        const results = [];
        const total = Object.keys(ASSETS).length;
        let processed = 0;
        for (const key of Object.keys(ASSETS)) {
            const asset = ASSETS[key];
            processed++;
            updateScan(Math.round((processed / total) * 85) + 10, 'Анализ ' + asset.name + ' (' + processed + '/' + total + ')...');
            const market = isMarketOpen(asset);
            if (!market.open) {
                results.push({ key: key, asset: asset, dir: 'CLOSED', confidence: 0, last: 0, reason: market.reason, rsi: 0, adx: 0, tf: '15min' });
                continue;
            }
            const assetNews = filterUpcomingNews(asset, newsCache);
            if (assetNews.hasNews) {
                results.push({ key: key, asset: asset, dir: 'WAIT', confidence: 15, last: 0, reason: 'Новости', rsi: 0, adx: 0, tf: '15min' });
                continue;
            }
            try {
                const r = await analyzeForScanner(asset);
                results.push(Object.assign({ key: key, asset: asset, reason: null }, r));
            } catch(e) {
                results.push({ key: key, asset: asset, dir: 'WAIT', confidence: 0, last: 0, reason: e.message, rsi: 0, adx: 0, tf: '15min' });
            }
        }
        updateScan(96, 'Формирование...'); await sleep(300);
        updateScan(100, 'Готово!'); await sleep(300); hideScan();
        const dirOrder = { UP: 0, DOWN: 0, WAIT: 1, CLOSED: 2 };
        results.sort((a, b) => {
            const da = dirOrder[a.dir];
            const db = dirOrder[b.dir];
            if (da !== db) return da - db;
            return (b.confidence || 0) - (a.confidence || 0);
        });
        scannerResults = results;
        renderScannerResults();
    } catch (e) {
        alert('Ошибка сканирования: ' + e.message);
        hideScan();
    } finally {
        if (btn) { btn.disabled = false; btn.innerHTML = '<span>⚡</span> Сканировать рынок'; }
    }
}

function renderScannerResults() {
    const grid = document.getElementById('scannerGrid');
    const statsBar = document.getElementById('scannerStats');
    const filtersBar = document.getElementById('scannerFilters');
    if (!scannerResults || scannerResults.length === 0) {
        grid.innerHTML = '<div class="scanner-empty" style="grid-column:1/-1;"><div class="ico">🎯</div><div class="txt">Нажми «Сканировать рынок»</div></div>';
        if (statsBar) statsBar.style.display = 'none';
        if (filtersBar) filtersBar.style.display = 'none';
        return;
    }
    const counts = { UP: 0, DOWN: 0, WAIT: 0, CLOSED: 0 };
    scannerResults.forEach(r => counts[r.dir]++);
    document.getElementById('statUp').textContent = counts.UP;
    document.getElementById('statDown').textContent = counts.DOWN;
    document.getElementById('statWait').textContent = counts.WAIT;
    document.getElementById('statClosed').textContent = counts.CLOSED;
    statsBar.style.display = 'grid';
    filtersBar.style.display = 'grid';
    const filtered = scannerFilter === 'all'
        ? scannerResults
        : scannerResults.filter(r => r.dir.toLowerCase() === scannerFilter);
    if (filtered.length === 0) {
        grid.innerHTML = '<div class="scanner-empty" style="grid-column:1/-1;"><div class="ico">🔍</div><div class="txt">Нет сигналов в этой категории</div></div>';
        return;
    }
    grid.innerHTML = filtered.map((r, i) => {
        const dirClass = r.dir.toLowerCase();
        const dirLabel = r.dir === 'UP' ? '⬆ ВВЕРХ'
            : r.dir === 'DOWN' ? '⬇ ВНИЗ'
            : r.dir === 'WAIT' ? '⏸ ОЖИД.' : '🔒 ЗАКРЫТ';
        const icon = getAssetIcon(r.key);
        const priceStr = r.last ? r.last.toFixed(r.asset.dec) : (r.reason || '—');
        const confPct = Math.round(r.confidence || 0);
        const tfShort = r.tf === '1h' ? '1H'
            : r.tf === '30min' ? '30M'
            : r.tf === '15min' ? '15M'
            : r.tf === '5min' ? '5M' : '1M';
        if (r.dir === 'CLOSED') {
            return '<div class="scan-card closed" style="animation-delay:' + (i * 0.03) + 's;">' +
                '<div class="scan-card-head"><div class="scan-card-icon">' + icon + '</div>' +
                '<div class="scan-card-name"><div class="p">' + r.asset.name + '</div><div class="pr">' + priceStr + '</div></div></div>' +
                '<div class="scan-card-tag">' + dirLabel + '</div></div>';
        }
        let html = '<div class="scan-card ' + dirClass + '" style="animation-delay:' + (i * 0.03) + 's;">' +
            '<div class="scan-card-head"><div class="scan-card-icon">' + icon + '</div>' +
            '<div class="scan-card-name"><div class="p">' + r.asset.name + '</div><div class="pr">' + priceStr + '</div></div></div>' +
            '<div class="scan-card-tag">' + dirLabel + '</div>';
        if (r.dir !== 'WAIT' || confPct > 0) {
            html += '<div class="scan-confidence"><div class="scan-confidence-row"><span>Уверенность</span><b>' + confPct + '%</b></div>' +
                '<div class="scan-confidence-bar"><div class="scan-confidence-fill" style="width:' + confPct + '%"></div></div></div>';
        }
        if ((r.rsi || 0) || (r.adx || 0)) {
            html += '<div class="scan-card-meta"><span>RSI ' + (r.rsi || 0).toFixed(0) + '</span>' +
                '<span>ADX ' + (r.adx || 0).toFixed(0) + '</span><span>' + tfShort + '</span></div>';
        }
        return html + '</div>';
    }).join('');
}

function filterScanner(filter, el) {
    scannerFilter = filter;
    document.querySelectorAll('.scan-filter').forEach(b => b.classList.remove('active'));
    if (el) el.classList.add('active');
    renderScannerResults();
}

window.addEventListener('load', function() {
    try { updateKeyStatus(); } catch(e) {}
    try { updateRisk(); } catch(e) {}
    try { calculateWinrate(); } catch(e) {}
    try { changePair(); } catch(e) {}
});

window.addEventListener('resize', function() {
    if (isChartOpen && !document.getElementById('tvIframe').src.includes('about:blank')) {
        clearTimeout(window._tvResize);
        window._tvResize = setTimeout(function() {
            try { loadTradingView(); } catch(e) {}
        }, 400);
    }
});