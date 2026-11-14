/**
 * ============================================================
 * NOËL MAGIQUE - APPLICATION JAVASCRIPT
 * Version blindée (Safe Storage, gestion d'erreurs par module,
 * support file:// et web, décompte immédiat et navigation réactive).
 * ============================================================
 */

// --- ADAPTATEUR DE STOCKAGE SÉCURISÉ (Compatible file://, navigation privée, etc.) ---
const Storage = {
  memory: {},
  get(key) {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        return window.localStorage.getItem(key);
      }
    } catch (e) {
      console.warn('LocalStorage non accessible, utilisation du stockage mémoire :', e);
    }
    return this.memory[key] !== undefined ? this.memory[key] : null;
  },
  set(key, val) {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.setItem(key, val);
        return;
      }
    } catch (e) {
      console.warn('Impossible d’écrire dans LocalStorage :', e);
    }
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
    switchOrManageAccounts: "Changer de compte",
    logout: "Passer en Invité",
    
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
    feat2Title: "Système de Compte",
    feat2Desc: "Gérez vos listes personnelles en toute simplicité directement depuis votre navigateur.",
    feat3Title: "Compte à Rebours",
    feat3Desc: "Suivez en temps réel chaque seconde magique avant le passage du Père Noël.",
    
    // Liste
    listTitle: "Ma Liste de Souhaits",
    listSubtitle: "Rassemblez tous vos souhaits au même endroit pour un réveillon parfait.",
    btnAddItem: "Ajouter un cadeau",
    btnShareList: "Partager la liste",
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
    
    // Modal Comptes
    accountModalTitle: "Gestion des Profils & Comptes",
    accountIntro: "Chaque compte possède sa propre liste de cadeaux conservée dans votre navigateur.",
    accountListTitle: "Vos profils enregistrés :",
    createAccountHeading: "Créer un nouveau profil",
    accountNameLabel: "Prénom ou Pseudo",
    accountNamePlaceholder: "Ex: Lucas, Marie, Papa...",
    accountAvatarLabel: "Choisissez votre avatar de Noël :",
    btnCreateAccount: "Créer et utiliser ce profil",
    guestProfile: "Invité",
    activeBadge: "Actif",
    
    // Footer & Toasts
    footerTitle: "Noël Magique",
    footerMadeWith: "Fait avec amour pour préparer les fêtes",
    footerLocalNotice: "Données sécurisées et stockées localement dans votre navigateur.",
    
    toastGiftAdded: "🎁 Cadeau ajouté avec succès !",
    toastGiftUpdated: "✨ Cadeau mis à jour !",
    toastGiftDeleted: "🗑️ Cadeau retiré de la liste.",
    toastProfileCreated: "🎅 Nouveau profil créé !",
    toastProfileSwitched: "👤 Profil actif changé : ",
    toastListShared: "📋 Liste copiée dans le presse-papier !",
    toastFileTooLarge: "⚠️ Image trop lourde (veuillez choisir une image de moins de 3 Mo)",
    confirmDelete: "Voulez-vous vraiment supprimer cet article de la liste ?"
  },
  
  en: {
    navSubtitle: "Wishlist & Christmas Countdown",
    tabHome: "Home",
    tabList: "My Wishlist",
    tabCountdown: "Countdown",
    accountGreeting: "Active Profile",
    switchOrManageAccounts: "Switch Account",
    logout: "Switch to Guest",
    
    // Home
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
    feat2Title: "Local Accounts",
    feat2Desc: "Manage distinct gift lists for everyone seamlessly in your browser.",
    feat3Title: "Live Countdown",
    feat3Desc: "Track every festive second before Santa arrives down the chimney.",
    
    // List
    listTitle: "My Wishlist",
    listSubtitle: "Gather all your wishes in one festive place.",
    btnAddItem: "Add a gift",
    btnShareList: "Share List",
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
    
    // Countdown
    countdownBadge: "✨ Christmas Eve ✨",
    countdownHeading: "The Magical Countdown",
    countdownDesc: "Every second brings us closer to the most wonderful night of the year.",
    countdownTargetLabel: "Target Date: December 25th",
    btnNewQuote: "Another festive quote",
    
    // Gift Modal
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
    
    // Accounts Modal
    accountModalTitle: "Profiles & Accounts Management",
    accountIntro: "Each profile keeps its own separate wishlist saved directly in your browser.",
    accountListTitle: "Saved profiles:",
    createAccountHeading: "Create a new profile",
    accountNameLabel: "Name or Nickname",
    accountNamePlaceholder: "Ex: Lucas, Mary, Dad...",
    accountAvatarLabel: "Choose your holiday avatar:",
    btnCreateAccount: "Create & Switch to Profile",
    guestProfile: "Guest",
    activeBadge: "Active",
    
    // Footer & Toasts
    footerTitle: "Magical Christmas",
    footerMadeWith: "Crafted with love for the holiday season",
    footerLocalNotice: "Data safely stored locally in your browser.",
    
    toastGiftAdded: "🎁 Gift added successfully!",
    toastGiftUpdated: "✨ Gift updated!",
    toastGiftDeleted: "🗑️ Gift removed from list.",
    toastProfileCreated: "🎅 New profile created!",
    toastProfileSwitched: "👤 Active profile changed to: ",
    toastListShared: "📋 Wishlist copied to clipboard!",
    toastFileTooLarge: "⚠️ Image too large (please choose an image under 3MB)",
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

const DEFAULT_ACCOUNTS = [
  { id: 'guest', name: 'Invité', avatar: '🎁' }
];

let accounts = DEFAULT_ACCOUNTS;
let activeAccountId = 'guest';
let selectedNewAvatar = '🎅';

function initState() {
  try {
    const savedLang = Storage.get('xmas_lang');
    if (savedLang && (savedLang === 'fr' || savedLang === 'en')) {
      currentLang = savedLang;
    }

    const savedAccounts = Storage.get('xmas_accounts');
    if (savedAccounts) {
      const parsed = JSON.parse(savedAccounts);
      if (Array.isArray(parsed) && parsed.length > 0) {
        accounts = parsed;
      }
    } else {
      Storage.set('xmas_accounts', JSON.stringify(DEFAULT_ACCOUNTS));
    }

    const savedActiveAcc = Storage.get('xmas_active_account');
    if (savedActiveAcc && accounts.some(a => a.id === savedActiveAcc)) {
      activeAccountId = savedActiveAcc;
    }
  } catch (e) {
    console.error('Erreur initialisation State :', e);
  }
}

function getGiftsStorageKey(accId = activeAccountId) {
  return `xmas_gifts_${accId}`;
}

function getGifts(accId = activeAccountId) {
  try {
    const data = Storage.get(getGiftsStorageKey(accId));
    if (data) {
      return JSON.parse(data);
    }
    // Données d'exemple pour la première visite sur le profil invité
    if (accId === 'guest' && !Storage.get('xmas_demo_init')) {
      const sample = [
        {
          id: 'gift_demo_1',
          name: 'Casque Audio Sans Fil Réduction de Bruit',
          desc: 'Couleur noir mat ou argent, idéal pour écouter mes musiques festives.',
          price: '149 €',
          link: 'https://example.com/casque',
          image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80',
          status: 'pending',
          createdAt: new Date().toISOString()
        },
        {
          id: 'gift_demo_2',
          name: 'Pull de Noël en laine',
          desc: 'Taille M, avec motifs géométriques et rennes.',
          price: '45 €',
          link: '',
          image: 'https://images.unsplash.com/photo-1543087903-1ac2ec7aa8c5?w=600&auto=format&fit=crop&q=80',
          status: 'reserved',
          createdAt: new Date().toISOString()
        }
      ];
      Storage.set(getGiftsStorageKey('guest'), JSON.stringify(sample));
      Storage.set('xmas_demo_init', 'true');
      return sample;
    }
  } catch (e) {
    console.error('Erreur getGifts :', e);
  }
  return [];
}

function saveGifts(gifts, accId = activeAccountId) {
  try {
    Storage.set(getGiftsStorageKey(accId), JSON.stringify(gifts));
  } catch (e) {
    console.error('Erreur saveGifts :', e);
  }
  updateListBadge();
}

function getActiveAccount() {
  return accounts.find(a => a.id === activeAccountId) || accounts[0] || DEFAULT_ACCOUNTS[0];
}

function t(key) {
  return (translations[currentLang] && translations[currentLang][key]) || key;
}

// --- INITIALISATION PRINCIPALE ROBUSTE ---
function initApp() {
  initState();

  // 1. Navigation en priorité absolue
  try { initNavigation(); } catch (e) { console.error('Erreur initNavigation :', e); }

  // 2. Compte à rebours immédiat
  try { initCountdown(); } catch (e) { console.error('Erreur initCountdown :', e); }

  // 3. Traduction & interface
  try { initI18n(); } catch (e) { console.error('Erreur initI18n :', e); }

  // 4. Menu profils / comptes
  try { initAccountSystem(); } catch (e) { console.error('Erreur initAccountSystem :', e); }

  // 5. Menus déroulants
  try { initDropdowns(); } catch (e) { console.error('Erreur initDropdowns :', e); }

  // 6. Gestionnaire de la liste
  try { initWishlist(); } catch (e) { console.error('Erreur initWishlist :', e); }

  // 7. Citations festives
  try { initQuotes(); } catch (e) { console.error('Erreur initQuotes :', e); }

  // 8. Flocons de neige
  try { initSnowCanvas(); } catch (e) { console.error('Erreur initSnowCanvas :', e); }

  // 9. Rendu de la liste
  try { renderGifts(); } catch (e) { console.error('Erreur renderGifts :', e); }
  try { updateListBadge(); } catch (e) {}
}

// Lancement automatique dès que le DOM est prêt (ou immédiatement s'il l'est déjà)
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
    
    navButtons.forEach(btn => {
      const isTarget = btn.getAttribute('data-tab') === tabId;
      btn.classList.toggle('active', isTarget);
    });

    tabPanels.forEach(panel => {
      const isTarget = panel.id === `tab-${tabId}`;
      panel.classList.toggle('active', isTarget);
      if (isTarget) {
        panel.style.display = 'block';
      } else {
        panel.style.display = 'none';
      }
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

  // Liens / boutons internes
  document.querySelectorAll('[data-goto-tab]').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      const tab = el.getAttribute('data-goto-tab');
      if (tab) switchTab(tab);
    });
  });

  // Clic logo = retour accueil
  const brandLogo = document.getElementById('brand-logo');
  if (brandLogo) {
    brandLogo.addEventListener('click', () => switchTab('home'));
  }

  // Activer l'onglet accueil par défaut
  switchTab('home');
}

// --- 2. COMPTE À REBOURS GÉANT & MINI DÉCOMPTE ---
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
    // 25 Décembre à 00h00
    let target = new Date(year, 11, 25, 0, 0, 0);

    // Si le 25 décembre de cette année est déjà dépassé
    if (now.getTime() > target.getTime()) {
      year += 1;
      target = new Date(year, 11, 25, 0, 0, 0);
    }

    if (targetYearDisplay) {
      targetYearDisplay.textContent = String(year);
    }

    return target;
  }

  let targetDate = getTargetChristmas();

  function updateTimer() {
    const now = new Date();
    const diff = targetDate.getTime() - now.getTime();

    if (diff <= 0) {
      // Jour de Noël !
      const zeros = '00';
      if (cdDays) cdDays.textContent = zeros;
      if (cdHours) cdHours.textContent = zeros;
      if (cdMinutes) cdMinutes.textContent = zeros;
      if (cdSeconds) cdSeconds.textContent = zeros;

      if (miniDays) miniDays.textContent = zeros;
      if (miniHours) miniHours.textContent = zeros;
      if (miniMinutes) miniMinutes.textContent = zeros;
      if (miniSeconds) miniSeconds.textContent = zeros;
      return;
    }

    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const m = Math.floor((diff / (1000 * 60)) % 60);
    const s = Math.floor((diff / 1000) % 60);

    const pad = (n) => String(n).padStart(2, '0');

    if (cdDays) cdDays.textContent = pad(d);
    if (cdHours) cdHours.textContent = pad(h);
    if (cdMinutes) cdMinutes.textContent = pad(m);
    if (cdSeconds) cdSeconds.textContent = pad(s);

    if (miniDays) miniDays.textContent = pad(d);
    if (miniHours) miniHours.textContent = pad(h);
    if (miniMinutes) miniMinutes.textContent = pad(m);
    if (miniSeconds) miniSeconds.textContent = pad(s);
  }

  // Mise à jour immédiate synchrone
  updateTimer();
  setInterval(updateTimer, 1000);
}

// --- 3. GESTION DES LANGUES (i18n) ---
function initI18n() {
  const langBtn = document.getElementById('lang-btn');
  const langDropdown = document.getElementById('lang-dropdown');
  const currentLangFlag = document.getElementById('current-lang-flag');
  const currentLangCode = document.getElementById('current-lang-code');

  function applyLanguage(lang) {
    currentLang = lang;
    Storage.set('xmas_lang', lang);
    document.documentElement.lang = lang;

    if (currentLangFlag) currentLangFlag.textContent = (lang === 'fr' ? '🇫🇷' : '🇬🇧');
    if (currentLangCode) currentLangCode.textContent = (lang === 'fr' ? 'FR' : 'EN');

    // Mettre à jour tous les libellés avec data-i18n
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (translations[lang] && translations[lang][key]) {
        el.textContent = translations[lang][key];
      }
    });

    // Mettre à jour tous les placeholders avec data-i18n-ph
    document.querySelectorAll('[data-i18n-ph]').forEach(el => {
      const key = el.getAttribute('data-i18n-ph');
      if (translations[lang] && translations[lang][key]) {
        el.setAttribute('placeholder', translations[lang][key]);
      }
    });

    try { renderGifts(); } catch (e) {}
    try { renderAccountProfiles(); } catch (e) {}
    try { updateActiveAccountDisplay(); } catch (e) {}
    try { displayRandomQuote(); } catch (e) {}
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

// --- 5. SYSTÈME DE COMPTES & PROFILS ---
function initAccountSystem() {
  const accountModal = document.getElementById('account-modal');
  const openModalBtn = document.getElementById('btn-open-account-modal');
  const closeModalBtn = document.getElementById('btn-close-account-modal');
  const featAccountTrigger = document.getElementById('feat-account-trigger');
  const quickLogoutBtn = document.getElementById('btn-quick-logout');
  const createAccountForm = document.getElementById('create-account-form');
  const newUsernameInput = document.getElementById('new-username');
  const avatarButtons = document.querySelectorAll('.avatar-option');

  function openAccountModal() {
    renderAccountProfiles();
    if (accountModal) accountModal.classList.remove('hidden');
    const uDrop = document.getElementById('user-dropdown');
    if (uDrop) uDrop.classList.remove('show');
  }

  function closeAccountModal() {
    if (accountModal) accountModal.classList.add('hidden');
  }

  if (openModalBtn) openModalBtn.addEventListener('click', openAccountModal);
  if (featAccountTrigger) featAccountTrigger.addEventListener('click', openAccountModal);
  if (closeModalBtn) closeModalBtn.addEventListener('click', closeAccountModal);

  if (accountModal) {
    accountModal.addEventListener('click', (e) => {
      if (e.target === accountModal) closeAccountModal();
    });
  }

  avatarButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      avatarButtons.forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      selectedNewAvatar = btn.getAttribute('data-avatar') || '🎅';
    });
  });

  if (createAccountForm) {
    createAccountForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = newUsernameInput ? newUsernameInput.value.trim() : '';
      if (!name) return;

      const newId = 'acc_' + Date.now();
      const newAcc = {
        id: newId,
        name: name,
        avatar: selectedNewAvatar || '🎅'
      };

      accounts.push(newAcc);
      Storage.set('xmas_accounts', JSON.stringify(accounts));
      
      switchAccount(newId);
      if (newUsernameInput) newUsernameInput.value = '';
      closeAccountModal();
      showToast(t('toastProfileCreated'));
    });
  }

  if (quickLogoutBtn) {
    quickLogoutBtn.addEventListener('click', () => {
      switchAccount('guest');
      const uDrop = document.getElementById('user-dropdown');
      if (uDrop) uDrop.classList.remove('show');
    });
  }

  updateActiveAccountDisplay();
}

function switchAccount(accId) {
  activeAccountId = accId;
  Storage.set('xmas_active_account', accId);
  updateActiveAccountDisplay();
  renderAccountProfiles();
  renderGifts();
  updateListBadge();
  const acc = getActiveAccount();
  const name = acc.name === 'Invité' ? t('guestProfile') : acc.name;
  showToast(t('toastProfileSwitched') + name);
}

function updateActiveAccountDisplay() {
  const acc = getActiveAccount();
  const displayName = acc.name === 'Invité' ? t('guestProfile') : acc.name;
  
  const navAvatar = document.getElementById('nav-user-avatar');
  const navName = document.getElementById('nav-user-name');
  const dropUser = document.getElementById('dropdown-username');
  const tag = document.getElementById('current-account-tag');

  if (navAvatar) navAvatar.textContent = acc.avatar;
  if (navName) navName.textContent = displayName;
  if (dropUser) dropUser.textContent = `${acc.avatar} ${displayName}`;
  if (tag) tag.textContent = `${acc.avatar} ${displayName}`;
}

function renderAccountProfiles() {
  const container = document.getElementById('profiles-container');
  if (!container) return;
  container.innerHTML = '';

  accounts.forEach(acc => {
    const isAct = acc.id === activeAccountId;
    const giftsCount = getGifts(acc.id).length;
    const item = document.createElement('div');
    item.className = `profile-item ${isAct ? 'active' : ''}`;
    
    const displayName = acc.name === 'Invité' ? t('guestProfile') : acc.name;

    item.innerHTML = `
      <div class="profile-left">
        <span class="profile-avatar">${acc.avatar}</span>
        <div class="profile-meta">
          <strong>${displayName} ${isAct ? `<small style="color:var(--accent-green);font-weight:bold;">(${t('activeBadge')})</small>` : ''}</strong>
          <span>${giftsCount} ${t('tabList').toLowerCase()}</span>
        </div>
      </div>
      <div>
        ${!isAct ? `<button class="btn btn-secondary btn-sm switch-btn">${t('switchOrManageAccounts')}</button>` : ''}
      </div>
    `;

    item.addEventListener('click', () => {
      if (!isAct) {
        switchAccount(acc.id);
        const modal = document.getElementById('account-modal');
        if (modal) modal.classList.add('hidden');
      }
    });

    container.appendChild(item);
  });
}

// --- 6. GESTION DE LA LISTE DE SOUHAITS ---
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
      const fId = document.getElementById('form-item-id');
      const fName = document.getElementById('item-name');
      const fDesc = document.getElementById('item-desc');
      const fPrice = document.getElementById('item-price');
      const fLink = document.getElementById('item-link');

      if (fId) fId.value = itemToEdit.id;
      if (fName) fName.value = itemToEdit.name;
      if (fDesc) fDesc.value = itemToEdit.desc || '';
      if (fPrice) fPrice.value = itemToEdit.price || '';
      if (fLink) fLink.value = itemToEdit.link || '';
      currentImageBase64 = itemToEdit.image || '';
    } else {
      if (modalTitle) modalTitle.textContent = t('modalAddItemTitle');
      if (itemForm) itemForm.reset();
      const fId = document.getElementById('form-item-id');
      if (fId) fId.value = '';
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
    fileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;

      if (file.size > 3 * 1024 * 1024) {
        showToast(t('toastFileTooLarge'));
        fileInput.value = '';
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        currentImageBase64 = event.target.result;
        if (urlInput) urlInput.value = '';
        updateImagePreview();
      };
      reader.readAsDataURL(file);
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
    itemForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const nameEl = document.getElementById('item-name');
      const descEl = document.getElementById('item-desc');
      const priceEl = document.getElementById('item-price');
      const linkEl = document.getElementById('item-link');

      const name = nameEl ? nameEl.value.trim() : '';
      const desc = descEl ? descEl.value.trim() : '';
      const price = priceEl ? priceEl.value.trim() : '';
      const link = linkEl ? linkEl.value.trim() : '';

      if (!name) return;

      let gifts = getGifts();

      if (editingItemId) {
        gifts = gifts.map(g => {
          if (g.id === editingItemId) {
            return {
              ...g,
              name,
              desc,
              price,
              link,
              image: currentImageBase64
            };
          }
          return g;
        });
        showToast(t('toastGiftUpdated'));
      } else {
        const newItem = {
          id: 'gift_' + Date.now(),
          name,
          desc,
          price,
          link,
          image: currentImageBase64,
          status: 'pending',
          createdAt: new Date().toISOString()
        };
        gifts.unshift(newItem);
        showToast(t('toastGiftAdded'));
      }

      saveGifts(gifts);
      renderGifts();
      closeGiftModal();
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
      const gifts = getGifts();
      const acc = getActiveAccount();
      const accName = acc.name === 'Invité' ? t('guestProfile') : acc.name;

      if (gifts.length === 0) {
        showToast(t('emptyStateTitle'));
        return;
      }

      let textToCopy = `🎄 ${t('listTitle')} - ${accName} ✨\n\n`;
      gifts.forEach((g, idx) => {
        textToCopy += `${idx + 1}. ${g.name}`;
        if (g.price) textToCopy += ` (${g.price})`;
        if (g.desc) textToCopy += `\n   - Note : ${g.desc}`;
        if (g.link) textToCopy += `\n   - Lien : ${g.link}`;
        textToCopy += '\n\n';
      });

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(textToCopy).then(() => {
          showToast(t('toastListShared'));
        }).catch(() => {
          prompt('Copiez votre liste ci-dessous :', textToCopy);
        });
      } else {
        prompt('Copiez votre liste ci-dessous :', textToCopy);
      }
    });
  }

  window.openEditGiftModal = (id) => {
    const item = getGifts().find(g => g.id === id);
    if (item) openGiftModal(item);
  };
}

// Rendu des articles
function renderGifts() {
  const container = document.getElementById('items-grid');
  const emptyState = document.getElementById('empty-state');
  if (!container) return;

  const allGifts = getGifts();

  const cAll = document.getElementById('count-all');
  const cPending = document.getElementById('count-pending');
  const cReserved = document.getElementById('count-reserved');
  const cReceived = document.getElementById('count-received');

  const pendingCount = allGifts.filter(g => g.status === 'pending').length;
  const reservedCount = allGifts.filter(g => g.status === 'reserved').length;
  const receivedCount = allGifts.filter(g => g.status === 'received').length;

  if (cAll) cAll.textContent = String(allGifts.length);
  if (cPending) cPending.textContent = String(pendingCount);
  if (cReserved) cReserved.textContent = String(reservedCount);
  if (cReceived) cReceived.textContent = String(receivedCount);

  let filtered = allGifts.filter(g => {
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

    // Attachement propre des écouteurs
    const select = card.querySelector('.status-select-btn');
    if (select) {
      select.addEventListener('change', (e) => {
        changeGiftStatus(gift.id, e.target.value);
      });
    }

    const editBtn = card.querySelector('.btn-edit');
    if (editBtn) {
      editBtn.addEventListener('click', () => {
        if (window.openEditGiftModal) window.openEditGiftModal(gift.id);
      });
    }

    const delBtn = card.querySelector('.btn-del');
    if (delBtn) {
      delBtn.addEventListener('click', () => {
        deleteGiftItem(gift.id);
      });
    }

    container.appendChild(card);
  });
}

function changeGiftStatus(id, newStatus) {
  let gifts = getGifts();
  gifts = gifts.map(g => {
    if (g.id === id) {
      return { ...g, status: newStatus };
    }
    return g;
  });
  saveGifts(gifts);
  renderGifts();
}

function deleteGiftItem(id) {
  if (confirm(t('confirmDelete'))) {
    let gifts = getGifts();
    gifts = gifts.filter(g => g.id !== id);
    saveGifts(gifts);
    renderGifts();
    showToast(t('toastGiftDeleted'));
  }
}

function updateListBadge() {
  const badge = document.getElementById('list-badge-count');
  if (badge) {
    const count = getGifts().length;
    badge.textContent = String(count);
  }
}

// --- 7. CITATIONS FESTIVES ---
function initQuotes() {
  const nextQuoteBtn = document.getElementById('btn-next-quote');
  if (nextQuoteBtn) {
    nextQuoteBtn.addEventListener('click', () => {
      displayRandomQuote();
    });
  }
  displayRandomQuote();
}

function displayRandomQuote() {
  const quoteText = document.getElementById('festive-quote-text');
  if (!quoteText) return;
  const list = festiveQuotes[currentLang] || festiveQuotes.fr;
  const randomIndex = Math.floor(Math.random() * list.length);
  quoteText.textContent = `"${list[randomIndex]}"`;
}

// --- 8. EFFET FLOCONS DE NEIGE SUR CANVAS ---
function initSnowCanvas() {
  const canvas = document.getElementById('snow-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

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

  const particleCount = 65;
  const particles = [];

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 2.8 + 1,
      speedY: Math.random() * 1.1 + 0.5,
      speedX: Math.random() * 0.8 - 0.4,
      opacity: Math.random() * 0.6 + 0.3
    });
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);

    if (!snowEnabled) {
      requestAnimationFrame(draw);
      return;
    }

    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2, false);
      ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
      ctx.fill();

      p.y += p.speedY;
      p.x += p.speedX;

      if (p.y > height) {
        p.y = -10;
        p.x = Math.random() * width;
      }
      if (p.x > width) p.x = 0;
      if (p.x < 0) p.x = width;
    });

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

// --- 9. TOAST NOTIFICATIONS ---
function showToast(message) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;

  container.appendChild(toast);

  setTimeout(() => {
    try { toast.remove(); } catch (e) {}
  }, 3500);
}

function escapeHtml(str) {
  if (!str) return '';
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}
