// ── STATE ──
let allGames = [];
let allCategories = [];
let currentCategory = 'all';
let currentSearch = '';
let showFavsOnly = false;
let favorites = new Set(JSON.parse(localStorage.getItem('nexus_favs') || '[]'));

// ── INIT ──
async function init() {
  try {
    const res = await fetch('games.json');
    const data = await res.json();
    allGames = data.games;
    allCategories = data.categories;
    buildSidebar();
    renderFeatured();
    renderGames();
    bindSearch();
  } catch (e) {
    console.error('Failed to load games.json', e);
  }
}

// ── SIDEBAR ──
function buildSidebar() {
  const sidebar = document.getElementById('sidebar');
  sidebar.innerHTML = '';

  const sectionTitle = document.createElement('div');
  sectionTitle.className = 'sidebar-section-title';
  sectionTitle.textContent = 'Categories';
  sidebar.appendChild(sectionTitle);

  allCategories.forEach(cat => {
    const count = cat.id === 'all'
      ? allGames.length
      : allGames.filter(g => g.category === cat.id).length;

    const btn = document.createElement('button');
    btn.className = 'category-btn' + (cat.id === currentCategory ? ' active' : '');
    btn.dataset.cat = cat.id;
    btn.innerHTML = `
      <span class="cat-icon">${cat.icon}</span>
      <span class="cat-label">${cat.label}</span>
      <span class="cat-count">${count}</span>
    `;
    btn.addEventListener('click', () => {
      currentCategory = cat.id;
      showFavsOnly = false;
      document.getElementById('fav-toggle').classList.remove('active');
      document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderGames();
    });
    sidebar.appendChild(btn);
  });

  const divider = document.createElement('div');
  divider.className = 'sidebar-divider';
  sidebar.appendChild(divider);
}

// ── FEATURED BANNER ──
function renderFeatured() {
  const featured = allGames.filter(g => g.featured).slice(0, 6);
  const banner = document.getElementById('featured-banner');
  banner.innerHTML = '';

  featured.forEach((game, i) => {
    const card = document.createElement('div');
    card.className = 'featured-card';
    card.style.setProperty('--c1', game.color1);
    card.style.setProperty('--c2', game.color2);
    card.style.animationDelay = `${i * 0.06}s`;

    card.innerHTML = `
      <div class="featured-bg"></div>
      <div class="featured-emoji">${game.emoji}</div>
      <div class="featured-label">${game.title}</div>
      <div class="featured-new-badge">HOT</div>
    `;
    card.addEventListener('click', () => openGame(game));
    banner.appendChild(card);
  });
}

// ── GAME GRID ──
function renderGames() {
  const grid = document.getElementById('game-grid');
  const noResults = document.getElementById('no-results');
  const sectionCount = document.getElementById('section-count');

  let filtered = allGames.filter(game => {
    const matchCat = currentCategory === 'all' || game.category === currentCategory;
    const q = currentSearch.toLowerCase();
    const matchSearch = !q || game.title.toLowerCase().includes(q) || game.tags.some(t => t.includes(q));
    const matchFav = !showFavsOnly || favorites.has(game.id);
    return matchCat && matchSearch && matchFav;
  });

  sectionCount.textContent = `${filtered.length} games`;

  grid.innerHTML = '';

  if (filtered.length === 0) {
    noResults.style.display = 'block';
    return;
  }

  noResults.style.display = 'none';

  filtered.forEach((game, i) => {
    const card = createGameCard(game, i);
    grid.appendChild(card);
  });
}

function createGameCard(game, index) {
  const card = document.createElement('div');
  card.className = 'game-card';
  card.style.setProperty('--c1', game.color1);
  card.style.setProperty('--c2', game.color2);
  card.style.animationDelay = `${Math.min(index * 0.035, 0.5)}s`;

  const isFav = favorites.has(game.id);

  card.innerHTML = `
    <div class="card-thumb">
      <div class="card-bg"></div>
      <div class="card-emoji">${game.emoji}</div>
      <div class="card-play-overlay">
        <div class="play-icon"></div>
      </div>
      <button class="card-fav-btn ${isFav ? 'active' : ''}" data-id="${game.id}" title="Favorite">
        ${isFav ? '♥' : '♡'}
      </button>
    </div>
    <div class="card-footer">
      <div class="card-title">${game.title}</div>
      <div class="card-cat">${game.category}</div>
    </div>
  `;

  card.addEventListener('click', (e) => {
    if (e.target.closest('.card-fav-btn')) return;
    openGame(game);
  });

  card.querySelector('.card-fav-btn').addEventListener('click', (e) => {
    e.stopPropagation();
    toggleFavorite(game.id, card.querySelector('.card-fav-btn'));
  });

  return card;
}

// ── FAVORITES ──
function toggleFavorite(id, btn) {
  if (favorites.has(id)) {
    favorites.delete(id);
    btn.classList.remove('active');
    btn.textContent = '♡';
    showToast('Removed from favorites');
  } else {
    favorites.add(id);
    btn.classList.add('active');
    btn.textContent = '♥';
    showToast('Added to favorites ♥');
  }
  localStorage.setItem('nexus_favs', JSON.stringify([...favorites]));
  updateFavCount();
}

function updateFavCount() {
  const btn = document.getElementById('fav-toggle');
  btn.textContent = `♥ Favorites (${favorites.size})`;
}

// ── SEARCH ──
function bindSearch() {
  const input = document.getElementById('search-input');
  let timer;
  input.addEventListener('input', () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      currentSearch = input.value.trim();
      renderGames();
    }, 180);
  });
}

// ── GAME MODAL ──
function openGame(game) {
  const modal = document.getElementById('game-modal');
  const iframe = document.getElementById('game-iframe');
  const loading = document.getElementById('iframe-loading');
  const title = document.getElementById('modal-title');
  const emoji = document.getElementById('modal-emoji');
  const catBadge = document.getElementById('modal-cat');

  title.textContent = game.title;
  emoji.textContent = game.emoji;
  catBadge.textContent = game.category;

  // Reset iframe
  iframe.src = '';
  loading.classList.remove('hidden');

  modal.classList.add('open');
  document.body.style.overflow = 'hidden';

  // Short delay so modal renders, then load iframe
  setTimeout(() => {
    iframe.src = game.url;
  }, 50);

  iframe.onload = () => {
    loading.classList.add('hidden');
  };
}

function closeGame() {
  const modal = document.getElementById('game-modal');
  const iframe = document.getElementById('game-iframe');
  modal.classList.remove('open');
  document.body.style.overflow = '';
  setTimeout(() => { iframe.src = ''; }, 250);
}

function toggleFullscreen() {
  const iframe = document.getElementById('game-iframe');
  if (!document.fullscreenElement) {
    (iframe.requestFullscreen || iframe.webkitRequestFullscreen).call(iframe);
  } else {
    document.exitFullscreen();
  }
}

// ── TOAST ──
let toastTimer;
function showToast(msg) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2200);
}

// ── KEYBOARD ──
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeGame();
});

// ── BOOT ──
document.addEventListener('DOMContentLoaded', () => {
  updateFavCount();
  init();

  document.getElementById('close-modal').addEventListener('click', closeGame);
  document.getElementById('fullscreen-btn').addEventListener('click', toggleFullscreen);

  document.getElementById('fav-toggle').addEventListener('click', function () {
    showFavsOnly = !showFavsOnly;
    this.classList.toggle('active', showFavsOnly);
    currentCategory = 'all';
    document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
    document.querySelector('[data-cat="all"]')?.classList.add('active');
    renderGames();
  });

  document.getElementById('logo-link').addEventListener('click', () => {
    currentCategory = 'all';
    currentSearch = '';
    showFavsOnly = false;
    document.getElementById('search-input').value = '';
    document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
    document.querySelector('[data-cat="all"]')?.classList.add('active');
    renderGames();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});
