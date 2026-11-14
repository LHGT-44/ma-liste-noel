/**
 * ============================================================
 * NOËL MAGIQUE - APPLICATION JAVASCRIPT (AVEC SUPABASE CLOUD)
 * ============================================================
 */

// --- CONFIGURATION SUPABASE (À REMPLIR AVEC TES IDENTIFIANTS) ---
const SUPABASE_URL = 'https://TON-PROJET.supabase.co';
const SUPABASE_KEY = 'sb_publishable_TA_CLE_ICI';

const isSupabaseConfigured =
  typeof window.supabase !== 'undefined' &&
  SUPABASE_URL.startsWith('https://') &&
  !SUPABASE_URL.includes('TON-PROJET');

const sb = isSupabaseConfigured
  ? window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY)
  : null;

// --- ADAPTATEUR DE STOCKAGE LOCAL (Pour le mode Invité et la langue) ---
const Storage = {
  memory: {},
  get(key) {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        return window.localStorage.getItem(key);
      }
    } catch (e) {}
    return this.memory[key] !== undefined ? this.memory[key] : null;
  },
  set(key, val) {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.setItem(key, val);
        return;
      }
    } catch (e) {}
    this.memory[key] = String(val);
  },
  remove(key) {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.removeItem(key);
        return;
      }
    } catch (e) {}
    delete this.memory[key];
  }
};

// --- DICTIONNAIRE MULTILINGUE (i18n) ---
const translations = {
  fr: {
    navSubtitle: "Wishlist & Compte à Rebours",
    tabHome: "Accueil",
    tabList: "Ma Liste",
    tabCountdown: "Compte à Rebours",
    accountGreeting: "Profil Actif",
    switchOrManageAccounts: "Compte / Connexion",
    logout: "Se déconnecter",
    
    // Accueil
    heroBadge: "Édition Spéciale Fêtes",
    heroTitlePart1: "Préparez un",
    heroTitlePart2: "Noël Inoubliable",
    heroDescription: "Créez facilement votre liste d'envies féerique, gardez vos idées de cadeaux bien organisées avec photos et suivez les secondes jusqu'au réveillon magique.",
    heroAddGiftBtn: "Créer ma Liste de Cadeaux",
    heroViewCountdownBtn: "Voir le Compte à Rebours",
    countdownTeaserTitle: "Temps restant avant Noël",
    
    unitDays: "Jours",
    unitHours: "Heures",
    unitMins: "Minutes",
    unitSecs: "Secondes",
    
    feat1Title: "Liste Personnalisée",
    feat1Desc: "Ajoutez vos souhaits avec nom, description, photo et lien pour ne rien oublier.",
    feat2Title: "Compte Cloud",
    feat2Desc: "Créez votre compte pour retrouver votre liste de cadeaux sur tous vos appareils.",
    feat3Title: "Compte à Rebours",
    feat3Desc: "Suivez en temps réel chaque seconde magique avant le passage du Père Noël.",
    
    // Liste
    listTitle: "Ma Liste de Souhaits",
    listSubtitle: "Rassemblez tous vos souhaits au même endroit pour un réveillon parfait.",
    btnAddItem: "Ajouter un cadeau",
    btnShareList: "Partager",
    searchPlaceholder: "Rechercher un cadeau...",
    filterAll: "Tous",
    filterPending: "En attente",
    filterReserved: "Réservés",
    filterReceived: "Reçus",
    
    emptyStateTitle: "Votre liste est encore vide !",
    emptyStateDesc: "Ajoutez vos envies dès maintenant pour inspirer le Père Noël et vos proches.",
    btnAddFirstItem: "Ajouter mon premier souhait",
    
    statusPending: "En attente",
    statusReserved: "Réservé",
    statusReceived: "Reçu",
    visitLink: "Voir l'article en ligne",
    noPhoto: "Aucune photo",
    
    // Compte à rebours
    countdownBadge: "✨ Réveillon de Noël ✨",
    countdownHeading: "Le Décompte Magique",
    countdownDesc: "Chaque seconde nous rapproche de la nuit la plus merveilleuse de l'année.",
    countdownTargetLabel: "Date visée : 25 Décembre",
    btnNewQuote: "Autre pensée festive",
    
    // Modal Cadeau
    modalAddItemTitle: "Ajouter un souhait",
    modalEditItemTitle: "Modifier le cadeau",
    formNameLabel: "Nom du cadeau",
    formNamePlaceholder: "Ex: Casque Bluetooth, Livre de recettes...",
    formDescLabel: "Description ou détails",
    formDescPlaceholder: "Couleur, taille, magasin ou pourquoi ce cadeau vous tient à cœur...",
    optionalTag: "(facultatif)",
    formPhotoLabel: "Photo de l'objet",
    formDropPhoto: "Téléverser une image ou saisir une URL",
    formChooseFile: "Choisir un fichier",
    formUrlPlaceholder: "Ou collez l'URL d'une image (https://...)",
    formPriceLabel: "Prix estimé",
    formPricePlaceholder: "Ex: 49 €",
    formLinkLabel: "Lien web",
    formLinkPlaceholder: "https://...",
    btnCancel: "Annuler",
    btnSave: "Enregistrer le cadeau",
    
    // Modal Comptes Cloud
    accountModalTitle: "Mon Compte Noël Magique",
    accountIntro: "Connectez-vous ou créez un compte gratuit pour sauvegarder votre liste en ligne et la retrouver partout.",
    cloudConnectedNotice: "Votre liste de cadeaux est synchronisée automatiquement dans le cloud. Vous pouvez y accéder depuis n'importe quel appareil.",
    tabLogin: "Se connecter",
    tabSignup: "Créer un compte",
    accountNameLabel: "Prénom ou Pseudo",
    accountNamePlaceholder: "Ex: Lucas, Marie...",
    accountAvatarLabel: "Choisissez votre avatar de Noël :",
    authEmailLabel: "Adresse e-mail",
    authPasswordLabel: "Mot de passe (6 caractères min.)",
    btnLoginSubmit: "Se connecter",
    btnSignupSubmit: "Créer mon compte",
    guestProfile: "Invité",
    
    // Footer & Toasts
    footerTitle: "Noël Magique",
    footerMadeWith: "Fait avec amour pour préparer les fêtes",
    footerLocalNotice: "Mode invité : données stockées localement. Connectez-vous pour synchroniser dans le cloud.",
    footerCloudNotice: "Connecté au cloud : votre liste est sauvegardée en ligne.",
    
    toastGiftAdded: "🎁 Cadeau ajouté avec succès !",
    toastGiftUpdated: "✨ Cadeau mis à jour !",
    toastGiftDeleted: "🗑️ Cadeau retiré de la liste.",
    toastAccountCreated: "🎅 Compte créé et connecté !",
    toastLoggedIn: "👤 Bon retour ",
    toastLoggedOut: "👋 Déconnecté (Mode Invité)",
    toastListShared: "📋 Liste copiée dans le presse-papier !",
    toastFileTooLarge: "⚠️ Image trop lourde (max 5 Mo)",
    confirmDelete: "Voulez-vous vraiment supprimer cet article de la liste ?"
  },
  
  en: {
    navSubtitle: "Wishlist & Christmas Countdown",
    tabHome: "Home",
    tabList: "My Wishlist",
    tabCountdown: "Countdown",
    accountGreeting: "Active Profile",
    switchOrManageAccounts: "Account / Login",
    logout: "Log out",
    
    heroBadge: "Holiday Special Edition",
    heroTitlePart1: "Prepare for an",
    heroTitlePart2: "Unforgettable Christmas",
    heroDescription: "Easily craft your magical wishlist, keep gift ideas organized with pictures, and follow the seconds until the holiday cheer.",
    heroAddGiftBtn: "Create My Wishlist",
    heroViewCountdownBtn: "View Countdown",
    countdownTeaserTitle: "Time left until Christmas",
    
    unitDays: "Days",
    unitHours: "Hours",
    unitMins: "Minutes",
    unitSecs: "Seconds",
    
    feat1Title: "Personalized Wishlist",
    feat1Desc: "Add your wishes with name, description, picture, and link so you don't forget anything.",
    feat2Title: "Cloud Account",
    feat2Desc: "Create your account to access your wishlist across all your devices.",
    feat3Title: "Live Countdown",
    feat3Desc: "Track every festive second before Santa arrives down the chimney.",
    
    listTitle: "My Wishlist",
    listSubtitle: "Gather all your wishes in one festive place.",
    btnAddItem: "Add a gift",
    btnShareList: "Share",
    searchPlaceholder: "Search for a gift...",
    filterAll: "All",
    filterPending: "Pending",
    filterReserved: "Reserved",
    filterReceived: "Received",
    
    emptyStateTitle: "Your wishlist is empty!",
    emptyStateDesc: "Add your favorite ideas right now to inspire Santa and family.",
    btnAddFirstItem: "Add my first wish",
    
    statusPending: "Pending",
    statusReserved: "Reserved",
    statusReceived: "Received",
    visitLink: "View item online",
    noPhoto: "No picture",
    
    countdownBadge: "✨ Christmas Eve ✨",
    countdownHeading: "The Magical Countdown",
    countdownDesc: "Every second brings us closer to the most wonderful night of the year.",
    countdownTargetLabel: "Target Date: December 25th",
    btnNewQuote: "Another festive quote",
    
    modalAddItemTitle: "Add a Wish",
    modalEditItemTitle: "Edit Gift",
    formNameLabel: "Gift Name",
    formNamePlaceholder: "Ex: Wireless Headphones, Cookbook...",
    formDescLabel: "Description or notes",
    formDescPlaceholder: "Color, size, store, or why you'd love this gift...",
    optionalTag: "(optional)",
    formPhotoLabel: "Gift Picture",
    formDropPhoto: "Upload an image or paste a URL",
    formChooseFile: "Choose file",
    formUrlPlaceholder: "Or paste image URL (https://...)",
    formPriceLabel: "Estimated Price",
    formPricePlaceholder: "Ex: $49",
    formLinkLabel: "Web Link",
    formLinkPlaceholder: "https://...",
    btnCancel: "Cancel",
    btnSave: "Save Gift",
    
    accountModalTitle: "My Magical Christmas Account",
    accountIntro: "Sign in or create a free account to save your wishlist online and access it anywhere.",
    cloudConnectedNotice: "Your wishlist is automatically synced to the cloud. You can access it from any device.",
    tabLogin: "Sign In",
    tabSignup: "Sign Up",
    accountNameLabel: "Name or Nickname",
    accountNamePlaceholder: "Ex: Lucas, Mary...",
    accountAvatarLabel: "Choose your holiday avatar:",
    authEmailLabel: "Email address",
    authPasswordLabel: "Password (min. 6 characters)",
    btnLoginSubmit: "Sign In",
    btnSignupSubmit: "Create Account",
    guestProfile: "Guest",
    
    footerTitle: "Magical Christmas",
    footerMadeWith: "Crafted with love for the holiday season",
    footerLocalNotice: "Guest mode: data stored locally. Sign in to sync with the cloud.",
    footerCloudNotice: "Connected to cloud: your wishlist is saved online.",
    
    toastGiftAdded: "🎁 Gift added successfully!",
    toastGiftUpdated: "✨ Gift updated!",
    toastGiftDeleted: "🗑️ Gift removed from list.",
    toastAccountCreated: "🎅 Account created and signed in!",
    toastLoggedIn: "👤 Welcome back ",
    toastLoggedOut: "👋 Signed out (Guest Mode)",
    toastListShared: "📋 Wishlist copied to clipboard!",
    toastFileTooLarge: "⚠️ Image too large (max 5MB)",
    confirmDelete: "Are you sure you want to delete this gift from the list?"
  }
};

const festiveQuotes = {
  fr: [
    "Noël n'est pas un jour ou une saison, mais un état d'esprit.",
    "La paix sur la terre aux hommes de bonne volonté.",
    "Le meilleur des cadeaux de Noël est une famille unie.",
    "Noël agite une baguette magique sur le monde et rend tout plus doux.",
    "La magie de Noël ne s'explique pas, elle se vit au fond du cœur."
  ],
  en: [
    "Christmas isn't a season. It's a feeling.",
    "Peace on earth will come to stay, when we live Christmas every day.",
    "The best of all gifts around any Christmas tree: the presence of a happy family.",
    "Christmas waves a magic wand over this world, and behold, everything is softer and more beautiful.",
    "May the festive spirit bring peace and joy to your home."
  ]
};

// --- ÉTAT GLOBAL (STATE) ---
let currentLang = 'fr';
let activeTab = 'home';
let currentFilter = 'all';
let searchQuery = '';
let currentImageBase64 = '';
let editingItemId = null;
let snowEnabled = true;

let currentUser = null; // Utilisateur Supabase connecté (ou null = Invité)
let cachedGifts = [];   // Liste en mémoire des cadeaux actifs
let authMode = 'login'; // 'login' ou 'signup'
let selectedNewAvatar = '🎅';

function t(key) {
  return (translations[currentLang] && translations[currentLang][key]) || key;
}

// --- GESTION DES DONNÉES (CLOUD SUPABASE OU INVITÉ LOCAL) ---
function getGuestGifts() {
  try {
    const data = Storage.get('xmas_gifts_guest');
    if (data) return JSON.parse(data);
    if (!Storage.get('xmas_demo_init')) {
      const sample = [
        {
          id: 'gift_demo_1',
          name: 'Casque Audio Sans Fil Réduction de Bruit',
          desc: 'Couleur noir mat ou argent, idéal pour écouter mes musiques festives.',
          price: '149 €',
          link: 'https://example.com/casque',
          image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80',
          status: 'pending'
        }
      ];
      Storage.set('xmas_gifts_guest', JSON.stringify(sample));
      Storage.set('xmas_demo_init', 'true');
      return sample;
    }
  } catch (e) {}
  return [];
}

function saveGuestGifts(gifts) {
  Storage.set('xmas_gifts_guest', JSON.stringify(gifts));
}

async function loadGifts() {
  if (sb && currentUser) {
    const { data, error } = await sb
      .from('gifts')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Erreur chargement Supabase :', error);
      showToast('⚠️ ' + error.message);
      cachedGifts = [];
    } else {
      cachedGifts = (data || []).map(row => ({
        id: row.id,
        name: row.name,
        desc: row.description || '',
        price: row.price || '',
        link: row.link || '',
        image: row.image || '',
        status: row.status || 'pending'
      }));
    }
  } else {
    cachedGifts = getGuestGifts();
  }

  renderGifts();
  updateListBadge();
}

// --- INITIALISATION PRINCIPALE ---
async function initApp() {
  const savedLang = Storage.get('xmas_lang');
  if (savedLang === 'fr' || savedLang === 'en') {
    currentLang = savedLang;
  }

  try { initNavigation(); } catch (e) { console.error(e); }
  try { initCountdown(); } catch (e) { console.error(e); }
  try { initI18n(); } catch (e) { console.error(e); }
  try { initAccountSystem(); } catch (e) { console.error(e); }
  try { initDropdowns(); } catch (e) { console.error(e); }
  try { initWishlist(); } catch (e) { console.error(e); }
  try { initQuotes(); } catch (e) { console.error(e); }
  try { initSnowCanvas(); } catch (e) { console.error(e); }

  // Vérification de la session Supabase existante
  if (sb) {
    const { data: { session } } = await sb.auth.getSession();
    currentUser = session ? session.user : null;
    updateAccountUI();
    await loadGifts();

    sb.auth.onAuthStateChange(async (_event, session) => {
      currentUser = session ? session.user : null;
      updateAccountUI();
      await loadGifts();
    });
  } else {
    updateAccountUI();
    await loadGifts();
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}

// --- 1. NAVIGATION DES ONGLETS ---
function initNavigation() {
  const navButtons = document.querySelectorAll('.nav-btn');
  const tabPanels = document.querySelectorAll('.tab-panel');

  function switchTab(tabId) {
    activeTab = tabId;
    navButtons.forEach(btn => btn.classList.toggle('active', btn.getAttribute('data-tab') === tabId));
    tabPanels.forEach(panel => {
      const isTarget = panel.id === `tab-${tabId}`;
      panel.classList.toggle('active', isTarget);
      panel.style.display = isTarget ? 'block' : 'none';
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  navButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const tab = btn.getAttribute('data-tab');
      if (tab) switchTab(tab);
    });
  });

  document.querySelectorAll('[data-goto-tab]').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      const tab = el.getAttribute('data-goto-tab');
      if (tab) switchTab(tab);
    });
  });

  const brandLogo = document.getElementById('brand-logo');
  if (brandLogo) brandLogo.addEventListener('click', () => switchTab('home'));

  switchTab('home');
}

// --- 2. COMPTE À REBOURS ---
function initCountdown() {
  const cdDays = document.getElementById('cd-days');
  const cdHours = document.getElementById('cd-hours');
  const cdMinutes = document.getElementById('cd-minutes');
  const cdSeconds = document.getElementById('cd-seconds');
  const miniDays = document.getElementById('mini-days');
  const miniHours = document.getElementById('mini-hours');
  const miniMinutes = document.getElementById('mini-minutes');
  const miniSeconds = document.getElementById('mini-seconds');
  const targetYearDisplay = document.getElementById('target-year-display');

  function getTargetChristmas() {
    const now = new Date();
    let year = now.getFullYear();
    let target = new Date(year, 11, 25, 0, 0, 0);
    if (now.getTime() > target.getTime()) {
      year += 1;
      target = new Date(year, 11, 25, 0, 0, 0);
    }
    if (targetYearDisplay) targetYearDisplay.textContent = String(year);
    return target;
  }

  const targetDate = getTargetChristmas();

  function updateTimer() {
    const diff = targetDate.getTime() - Date.now();
    if (diff <= 0) {
      [cdDays, cdHours, cdMinutes, cdSeconds, miniDays, miniHours, miniMinutes, miniSeconds].forEach(el => {
        if (el) el.textContent = '00';
      });
      return;
    }
    const pad = (n) => String(n).padStart(2, '0');
    const d = pad(Math.floor(diff / (1000 * 60 * 60 * 24)));
    const h = pad(Math.floor((diff / (1000 * 60 * 60)) % 24));
    const m = pad(Math.floor((diff / (1000 * 60)) % 60));
    const s = pad(Math.floor((diff / 1000) % 60));

    if (cdDays) cdDays.textContent = d;
    if (cdHours) cdHours.textContent = h;
    if (cdMinutes) cdMinutes.textContent = m;
    if (cdSeconds) cdSeconds.textContent = s;
    if (miniDays) miniDays.textContent = d;
    if (miniHours) miniHours.textContent = h;
    if (miniMinutes) miniMinutes.textContent = m;
    if (miniSeconds) miniSeconds.textContent = s;
  }

  updateTimer();
  setInterval(updateTimer, 1000);
}

// --- 3. LANGUES (i18n) ---
function initI18n() {
  const langBtn = document.getElementById('lang-btn');
  const langDropdown = document.getElementById('lang-dropdown');
  const currentLangFlag = document.getElementById('current-lang-flag');
  const currentLangCode = document.getElementById('current-lang-code');

  function applyLanguage(lang) {
    currentLang = lang;
    Storage.set('xmas_lang', lang);
    document.documentElement.lang = lang;

    if (currentLangFlag) currentLangFlag.textContent = lang === 'fr' ? '🇫🇷' : '🇬🇧';
    if (currentLangCode) currentLangCode.textContent = lang === 'fr' ? 'FR' : 'EN';

    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (translations[lang] && translations[lang][key]) {
        el.textContent = translations[lang][key];
      }
    });

    document.querySelectorAll('[data-i18n-ph]').forEach(el => {
      const key = el.getAttribute('data-i18n-ph');
      if (translations[lang] && translations[lang][key]) {
        el.setAttribute('placeholder', translations[lang][key]);
      }
    });

    updateAccountUI();
    renderGifts();
    displayRandomQuote();
  }

  if (langBtn && langDropdown) {
    langBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      langDropdown.classList.toggle('show');
      const uDrop = document.getElementById('user-dropdown');
      if (uDrop) uDrop.classList.remove('show');
    });

    document.querySelectorAll('#lang-dropdown .dropdown-item').forEach(item => {
      item.addEventListener('click', () => {
        const selected = item.getAttribute('data-lang');
        if (selected) applyLanguage(selected);
        langDropdown.classList.remove('show');
      });
    });
  }

  applyLanguage(currentLang);
}

// --- 4. DROPDOWNS ---
function initDropdowns() {
  const userMenuBtn = document.getElementById('user-menu-btn');
  const userDropdown = document.getElementById('user-dropdown');
  const langDropdown = document.getElementById('lang-dropdown');

  if (userMenuBtn && userDropdown) {
    userMenuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      userDropdown.classList.toggle('show');
      if (langDropdown) langDropdown.classList.remove('show');
    });
  }

  window.addEventListener('click', () => {
    if (userDropdown) userDropdown.classList.remove('show');
    if (langDropdown) langDropdown.classList.remove('show');
  });
}

// --- 5. SYSTÈME DE COMPTES CLOUD (SUPABASE AUTH) ---
function getUserDisplayInfo() {
  if (currentUser) {
    const meta = currentUser.user_metadata || {};
    return {
      name: meta.username || currentUser.email.split('@')[0],
      avatar: meta.avatar || '🎅',
      email: currentUser.email
    };
  }
  return { name: t('guestProfile'), avatar: '🎁', email: '' };
}

function updateAccountUI() {
  const info = getUserDisplayInfo();
  const navAvatar = document.getElementById('nav-user-avatar');
  const navName = document.getElementById('nav-user-name');
  const dropUser = document.getElementById('dropdown-username');
  const tag = document.getElementById('current-account-tag');
  const quickLogout = document.getElementById('btn-quick-logout');
  const footerNotice = document.getElementById('footer-storage-notice');

  if (navAvatar) navAvatar.textContent = info.avatar;
  if (navName) navName.textContent = info.name;
  if (dropUser) dropUser.textContent = `${info.avatar} ${info.name}`;
  if (tag) tag.textContent = `${info.avatar} ${info.name}`;

  if (quickLogout) quickLogout.classList.toggle('hidden', !currentUser);
  if (footerNotice) {
    footerNotice.textContent = currentUser ? t('footerCloudNotice') : t('footerLocalNotice');
  }

  // Mise à jour de l'intérieur de la modale compte
  const loggedInView = document.getElementById('logged-in-view');
  const loggedOutView = document.getElementById('logged-out-view');
  if (loggedInView && loggedOutView) {
    if (currentUser) {
      loggedInView.classList.remove('hidden');
      loggedOutView.classList.add('hidden');
      document.getElementById('modal-user-avatar').textContent = info.avatar;
      document.getElementById('modal-user-name').textContent = info.name;
      document.getElementById('modal-user-email').textContent = info.email;
    } else {
      loggedInView.classList.add('hidden');
      loggedOutView.classList.remove('hidden');
    }
  }
}

function initAccountSystem() {
  const accountModal = document.getElementById('account-modal');
  const openModalBtn = document.getElementById('btn-open-account-modal');
  const closeModalBtn = document.getElementById('btn-close-account-modal');
  const featAccountTrigger = document.getElementById('feat-account-trigger');
  const quickLogoutBtn = document.getElementById('btn-quick-logout');
  const modalLogoutBtn = document.getElementById('btn-modal-logout');

  const tabLoginBtn = document.getElementById('tab-btn-login');
  const tabSignupBtn = document.getElementById('tab-btn-signup');
  const signupExtra = document.getElementById('signup-extra-fields');
  const submitText = document.getElementById('btn-auth-submit-text');
  const authForm = document.getElementById('auth-form');
  const avatarButtons = document.querySelectorAll('.avatar-option');

  function openAccountModal() {
    updateAccountUI();
    if (accountModal) accountModal.classList.remove('hidden');
    const uDrop = document.getElementById('user-dropdown');
    if (uDrop) uDrop.classList.remove('show');
  }

  function closeAccountModal() {
    if (accountModal) accountModal.classList.add('hidden');
  }

  function setAuthMode(mode) {
    authMode = mode;
    if (tabLoginBtn) tabLoginBtn.classList.toggle('active', mode === 'login');
    if (tabSignupBtn) tabSignupBtn.classList.toggle('active', mode === 'signup');
    if (signupExtra) signupExtra.classList.toggle('hidden', mode === 'login');
    const usernameInput = document.getElementById('new-username');
    if (usernameInput) usernameInput.required = (mode === 'signup');
    if (submitText) {
      submitText.textContent = mode === 'login' ? t('btnLoginSubmit') : t('btnSignupSubmit');
    }
  }

  if (openModalBtn) openModalBtn.addEventListener('click', openAccountModal);
  if (featAccountTrigger) featAccountTrigger.addEventListener('click', openAccountModal);
  if (closeModalBtn) closeModalBtn.addEventListener('click', closeAccountModal);
  if (accountModal) {
    accountModal.addEventListener('click', (e) => {
      if (e.target === accountModal) closeAccountModal();
    });
  }

  if (tabLoginBtn) tabLoginBtn.addEventListener('click', () => setAuthMode('login'));
  if (tabSignupBtn) tabSignupBtn.addEventListener('click', () => setAuthMode('signup'));

  avatarButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      avatarButtons.forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      selectedNewAvatar = btn.getAttribute('data-avatar') || '🎅';
    });
  });

  if (authForm) {
    authForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (!sb) {
        showToast('⚠️ Configure SUPABASE_URL et SUPABASE_KEY dans app.js');
        return;
      }

      const email = document.getElementById('auth-email').value.trim();
      const password = document.getElementById('auth-password').value;
      const username = document.getElementById('new-username').value.trim();
      const submitBtn = document.getElementById('btn-auth-submit');

      submitBtn.disabled = true;

      try {
        if (authMode === 'signup') {
          const { data, error } = await sb.auth.signUp({
            email,
            password,
            options: {
              data: {
                username: username || email.split('@')[0],
                avatar: selectedNewAvatar || '🎅'
              }
            }
          });
          if (error) throw error;
          currentUser = data.user;
          showToast(t('toastAccountCreated'));
        } else {
          const { data, error } = await sb.auth.signInWithPassword({ email, password });
          if (error) throw error;
          currentUser = data.user;
          const info = getUserDisplayInfo();
          showToast(t('toastLoggedIn') + info.name + ' !');
        }

        authForm.reset();
        updateAccountUI();
        await loadGifts();
        closeAccountModal();
      } catch (err) {
        showToast('⚠️ ' + (err.message || 'Erreur de connexion'));
      } finally {
        submitBtn.disabled = false;
      }
    });
  }

  async function handleLogout() {
    if (sb) await sb.auth.signOut();
    currentUser = null;
    updateAccountUI();
    await loadGifts();
    closeAccountModal();
    showToast(t('toastLoggedOut'));
  }

  if (quickLogoutBtn) quickLogoutBtn.addEventListener('click', handleLogout);
  if (modalLogoutBtn) modalLogoutBtn.addEventListener('click', handleLogout);
}

// --- 6. COMPRESSION D'IMAGE (POUR UN CHARGEMENT CLOUD RAPIDE) ---
function compressImageFile(file, maxSize = 800, quality = 0.78) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = (e) => {
      const img = new Image();
      img.onerror = reject;
      img.onload = () => {
        let { width, height } = img;
        if (width > maxSize || height > maxSize) {
          if (width > height) {
            height = Math.round((height * maxSize) / width);
            width = maxSize;
          } else {
            width = Math.round((width * maxSize) / height);
            height = maxSize;
          }
        }
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/jpeg', quality));
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  });
}

// --- 7. GESTION DE LA LISTE DE SOUHAITS ---
function initWishlist() {
  const itemModal = document.getElementById('item-modal');
  const btnShowAdd = document.getElementById('btn-show-add-modal');
  const btnEmptyAdd = document.getElementById('btn-empty-add');
  const btnCloseModal = document.getElementById('btn-close-item-modal');
  const btnCancelModal = document.getElementById('btn-cancel-item-modal');
  const itemForm = document.getElementById('item-form');
  const fileInput = document.getElementById('item-file-input');
  const urlInput = document.getElementById('item-url-input');
  const clearPhotoBtn = document.getElementById('btn-clear-photo');
  const imagePreview = document.getElementById('image-preview');
  const imagePlaceholder = document.getElementById('image-placeholder');
  const searchInput = document.getElementById('search-input');
  const btnExport = document.getElementById('btn-export-list');

  function openGiftModal(itemToEdit = null) {
    editingItemId = itemToEdit ? itemToEdit.id : null;
    const modalTitle = document.getElementById('modal-item-title');
    
    if (itemToEdit) {
      if (modalTitle) modalTitle.textContent = t('modalEditItemTitle');
      document.getElementById('form-item-id').value = itemToEdit.id;
      document.getElementById('item-name').value = itemToEdit.name;
      document.getElementById('item-desc').value = itemToEdit.desc || '';
      document.getElementById('item-price').value = itemToEdit.price || '';
      document.getElementById('item-link').value = itemToEdit.link || '';
      currentImageBase64 = itemToEdit.image || '';
    } else {
      if (modalTitle) modalTitle.textContent = t('modalAddItemTitle');
      if (itemForm) itemForm.reset();
      document.getElementById('form-item-id').value = '';
      currentImageBase64 = '';
    }

    updateImagePreview();
    if (itemModal) itemModal.classList.remove('hidden');
  }

  function closeGiftModal() {
    if (itemModal) itemModal.classList.add('hidden');
    if (itemForm) itemForm.reset();
    currentImageBase64 = '';
    editingItemId = null;
    updateImagePreview();
  }

  if (btnShowAdd) btnShowAdd.addEventListener('click', () => openGiftModal());
  if (btnEmptyAdd) btnEmptyAdd.addEventListener('click', () => openGiftModal());
  if (btnCloseModal) btnCloseModal.addEventListener('click', closeGiftModal);
  if (btnCancelModal) btnCancelModal.addEventListener('click', closeGiftModal);

  if (itemModal) {
    itemModal.addEventListener('click', (e) => {
      if (e.target === itemModal) closeGiftModal();
    });
  }

  if (fileInput) {
    fileInput.addEventListener('change', async (e) => {
      const file = e.target.files[0];
      if (!file) return;

      if (file.size > 5 * 1024 * 1024) {
        showToast(t('toastFileTooLarge'));
        fileInput.value = '';
        return;
      }

      try {
        currentImageBase64 = await compressImageFile(file);
        if (urlInput) urlInput.value = '';
        updateImagePreview();
      } catch (err) {
        console.error('Erreur compression image :', err);
      }
    });
  }

  if (urlInput) {
    urlInput.addEventListener('input', () => {
      const url = urlInput.value.trim();
      if (url) {
        currentImageBase64 = url;
        updateImagePreview();
      }
    });
  }

  if (clearPhotoBtn) {
    clearPhotoBtn.addEventListener('click', () => {
      currentImageBase64 = '';
      if (fileInput) fileInput.value = '';
      if (urlInput) urlInput.value = '';
      updateImagePreview();
    });
  }

  function updateImagePreview() {
    if (!imagePreview || !imagePlaceholder) return;
    if (currentImageBase64) {
      imagePreview.src = currentImageBase64;
      imagePreview.classList.remove('hidden');
      imagePlaceholder.classList.add('hidden');
    } else {
      imagePreview.src = '';
      imagePreview.classList.add('hidden');
      imagePlaceholder.classList.remove('hidden');
    }
  }

  if (itemForm) {
    itemForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = document.getElementById('item-name').value.trim();
      const desc = document.getElementById('item-desc').value.trim();
      const price = document.getElementById('item-price').value.trim();
      const link = document.getElementById('item-link').value.trim();
      const saveBtn = document.getElementById('btn-save-item');

      if (!name) return;
      saveBtn.disabled = true;

      try {
        if (sb && currentUser) {
          if (editingItemId) {
            const { error } = await sb
              .from('gifts')
              .update({ name, description: desc, price, link, image: currentImageBase64 })
              .eq('id', editingItemId);
            if (error) throw error;
            showToast(t('toastGiftUpdated'));
          } else {
            const { error } = await sb
              .from('gifts')
              .insert([{
                user_id: currentUser.id,
                name,
                description: desc,
                price,
                link,
                image: currentImageBase64,
                status: 'pending'
              }]);
            if (error) throw error;
            showToast(t('toastGiftAdded'));
          }
          await loadGifts();
        } else {
          // Mode Invité (localStorage)
          let gifts = getGuestGifts();
          if (editingItemId) {
            gifts = gifts.map(g => g.id === editingItemId ? { ...g, name, desc, price, link, image: currentImageBase64 } : g);
            showToast(t('toastGiftUpdated'));
          } else {
            gifts.unshift({
              id: 'gift_' + Date.now(),
              name,
              desc,
              price,
              link,
              image: currentImageBase64,
              status: 'pending'
            });
            showToast(t('toastGiftAdded'));
          }
          saveGuestGifts(gifts);
          await loadGifts();
        }

        closeGiftModal();
      } catch (err) {
        showToast('⚠️ ' + (err.message || 'Erreur lors de la sauvegarde'));
      } finally {
        saveBtn.disabled = false;
      }
    });
  }

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.toLowerCase().trim();
      renderGifts();
    });
  }

  document.querySelectorAll('.filter-chips .chip').forEach(chip => {
    chip.addEventListener('click', () => {
      document.querySelectorAll('.filter-chips .chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      currentFilter = chip.getAttribute('data-filter') || 'all';
      renderGifts();
    });
  });

  if (btnExport) {
    btnExport.addEventListener('click', () => {
      const info = getUserDisplayInfo();
      if (cachedGifts.length === 0) {
        showToast(t('emptyStateTitle'));
        return;
      }

      let textToCopy = `🎄 ${t('listTitle')} - ${info.name} ✨\n\n`;
      cachedGifts.forEach((g, idx) => {
        textToCopy += `${idx + 1}. ${g.name}`;
        if (g.price) textToCopy += ` (${g.price})`;
        if (g.desc) textToCopy += `\n   - Note : ${g.desc}`;
        if (g.link) textToCopy += `\n   - Lien : ${g.link}`;
        textToCopy += '\n\n';
      });

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(textToCopy)
          .then(() => showToast(t('toastListShared')))
          .catch(() => prompt('Copiez votre liste ci-dessous :', textToCopy));
      } else {
        prompt('Copiez votre liste ci-dessous :', textToCopy);
      }
    });
  }

  window.openEditGiftModal = (id) => {
    const item = cachedGifts.find(g => g.id === id);
    if (item) openGiftModal(item);
  };
}

// Rendu des articles
function renderGifts() {
  const container = document.getElementById('items-grid');
  const emptyState = document.getElementById('empty-state');
  if (!container) return;

  const allGifts = cachedGifts;

  const cAll = document.getElementById('count-all');
  const cPending = document.getElementById('count-pending');
  const cReserved = document.getElementById('count-reserved');
  const cReceived = document.getElementById('count-received');

  if (cAll) cAll.textContent = String(allGifts.length);
  if (cPending) cPending.textContent = String(allGifts.filter(g => g.status === 'pending').length);
  if (cReserved) cReserved.textContent = String(allGifts.filter(g => g.status === 'reserved').length);
  if (cReceived) cReceived.textContent = String(allGifts.filter(g => g.status === 'received').length);

  const filtered = allGifts.filter(g => {
    const matchFilter = (currentFilter === 'all') || (g.status === currentFilter);
    const matchSearch = !searchQuery ||
      g.name.toLowerCase().includes(searchQuery) ||
      (g.desc && g.desc.toLowerCase().includes(searchQuery));
    return matchFilter && matchSearch;
  });

  container.innerHTML = '';

  if (allGifts.length === 0) {
    if (emptyState) emptyState.classList.remove('hidden');
    container.classList.add('hidden');
    return;
  } else {
    if (emptyState) emptyState.classList.add('hidden');
    container.classList.remove('hidden');
  }

  filtered.forEach(gift => {
    const card = document.createElement('div');
    card.className = 'gift-card';

    let statusText = t('statusPending');
    let statusClass = 'status-pending';
    if (gift.status === 'reserved') {
      statusText = t('statusReserved');
      statusClass = 'status-reserved';
    } else if (gift.status === 'received') {
      statusText = t('statusReceived');
      statusClass = 'status-received';
    }

    card.innerHTML = `
      <div class="gift-card-media">
        <span class="gift-status-badge ${statusClass}">${statusText}</span>
        ${gift.price ? `<span class="gift-price-badge">${escapeHtml(gift.price)}</span>` : ''}
        ${gift.image ? `
          <img class="gift-card-img" src="${gift.image}" alt="${escapeHtml(gift.name)}" loading="lazy">
        ` : `
          <div class="gift-card-no-img">
            <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
            <span>${t('noPhoto')}</span>
          </div>
        `}
      </div>

      <div class="gift-card-content">
        <h3 class="gift-card-title">${escapeHtml(gift.name)}</h3>
        ${gift.desc ? `<p class="gift-card-desc">${escapeHtml(gift.desc)}</p>` : ''}
        ${gift.link ? `
          <a class="gift-card-link" href="${escapeHtml(gift.link)}" target="_blank" rel="noopener noreferrer">
            <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>
            ${t('visitLink')}
          </a>
        ` : ''}

        <div class="gift-card-footer">
          <select class="status-select-btn" data-gift-id="${gift.id}">
            <option value="pending" ${gift.status === 'pending' ? 'selected' : ''}>⏳ ${t('statusPending')}</option>
            <option value="reserved" ${gift.status === 'reserved' ? 'selected' : ''}>🎁 ${t('statusReserved')}</option>
            <option value="received" ${gift.status === 'received' ? 'selected' : ''}>✅ ${t('statusReceived')}</option>
          </select>

          <div class="gift-card-actions">
            <button class="icon-btn btn-edit" title="Modifier">
              <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
            </button>
            <button class="icon-btn danger btn-del" title="Supprimer">
              <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
            </button>
          </div>
        </div>
      </div>
    `;

    card.querySelector('.status-select-btn').addEventListener('change', (e) => {
      changeGiftStatus(gift.id, e.target.value);
    });
    card.querySelector('.btn-edit').addEventListener('click', () => {
      if (window.openEditGiftModal) window.openEditGiftModal(gift.id);
    });
    card.querySelector('.btn-del').addEventListener('click', () => {
      deleteGiftItem(gift.id);
    });

    container.appendChild(card);
  });
}

async function changeGiftStatus(id, newStatus) {
  if (sb && currentUser) {
    const { error } = await sb.from('gifts').update({ status: newStatus }).eq('id', id);
    if (error) showToast('⚠️ ' + error.message);
    await loadGifts();
  } else {
    const gifts = getGuestGifts().map(g => g.id === id ? { ...g, status: newStatus } : g);
    saveGuestGifts(gifts);
    await loadGifts();
  }
}

async function deleteGiftItem(id) {
  if (!confirm(t('confirmDelete'))) return;
  if (sb && currentUser) {
    const { error } = await sb.from('gifts').delete().eq('id', id);
    if (error) showToast('⚠️ ' + error.message);
    else showToast(t('toastGiftDeleted'));
    await loadGifts();
  } else {
    const gifts = getGuestGifts().filter(g => g.id !== id);
    saveGuestGifts(gifts);
    await loadGifts();
    showToast(t('toastGiftDeleted'));
  }
}

function updateListBadge() {
  const badge = document.getElementById('list-badge-count');
  if (badge) badge.textContent = String(cachedGifts.length);
}

// --- 8. CITATIONS & NEIGE ---
function initQuotes() {
  const nextQuoteBtn = document.getElementById('btn-next-quote');
  if (nextQuoteBtn) nextQuoteBtn.addEventListener('click', displayRandomQuote);
  displayRandomQuote();
}

function displayRandomQuote() {
  const quoteText = document.getElementById('festive-quote-text');
  if (!quoteText) return;
  const list = festiveQuotes[currentLang] || festiveQuotes.fr;
  quoteText.textContent = `"${list[Math.floor(Math.random() * list.length)]}"`;
}

function initSnowCanvas() {
  const canvas = document.getElementById('snow-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const snowToggle = document.getElementById('snow-toggle');

  let width = window.innerWidth;
  let height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;

  window.addEventListener('resize', () => {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
  });

  const particles = Array.from({ length: 65 }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    r: Math.random() * 2.8 + 1,
    speedY: Math.random() * 1.1 + 0.5,
    speedX: Math.random() * 0.8 - 0.4,
    opacity: Math.random() * 0.6 + 0.3
  }));

  function draw() {
    ctx.clearRect(0, 0, width, height);
    if (snowEnabled) {
      particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
        ctx.fill();
        p.y += p.speedY;
        p.x += p.speedX;
        if (p.y > height) { p.y = -10; p.x = Math.random() * width; }
        if (p.x > width) p.x = 0;
        if (p.x < 0) p.x = width;
      });
    }
    requestAnimationFrame(draw);
  }
  draw();

  if (snowToggle) {
    snowToggle.addEventListener('click', () => {
      snowEnabled = !snowEnabled;
      snowToggle.style.opacity = snowEnabled ? '1' : '0.4';
      showToast(snowEnabled ? '❄️ Flocons activés' : '❄️ Flocons désactivés');
    });
  }
}

function showToast(message) {
  const container = document.getElementById('toast-container');
  if (!container) return;
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  container.appendChild(toast);
  setTimeout(() => { try { toast.remove(); } catch (e) {} }, 3500);
}

function escapeHtml(str) {
  if (!str) return '';
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}
