// Favorites array (starts empty; loads from localStorage)
let favorites = [];

// Check if we're on the favorites page
function isOnFavoritesPage() {
  return !!document.getElementById('favorites-list');
}

// Add a book to favorites
export function addFavorite(book) {
  if (!favorites.find(fav => fav.id === book.id)) {
    favorites.push(book);
    saveToLocalStorage();
    // Only render if on favorites page
    if (isOnFavoritesPage()) {
      renderFavorites();
    }
  }
}

// Remove a book from favorites
export function removeFavorite(bookId) {
  favorites = favorites.filter(fav => fav.id !== bookId);
  saveToLocalStorage();
  // Only render if on favorites page
  if (isOnFavoritesPage()) {
    renderFavorites();
  }
}

// Clear all favorites
export function clearAllFavorites() {
  favorites = [];
  saveToLocalStorage();
  renderFavorites();
}

// Get all favorites
export function getFavorites() {
  return favorites;
}

// Render favorites to DOM (only called if on favorites page)
function renderFavorites() {
  const container = document.getElementById('favorites-list');
  const noFavoritesMsg = document.getElementById('no-favorites');
  const clearSection = document.getElementById('clear-all-section');
  
  if (favorites.length === 0) {
    container.innerHTML = '';
    container.classList.add('hidden');
    noFavoritesMsg.classList.remove('hidden');
    clearSection.classList.add('hidden');
    return;
  }
  
  container.classList.remove('hidden');
  noFavoritesMsg.classList.add('hidden');
  clearSection.classList.remove('hidden');
  
  container.innerHTML = favorites.map(book => `
    <div class="bg-white p-4 rounded-lg shadow hover:shadow-lg" data-book-id="${book.id}">
      <img src="${book.cover}" alt="${book.title} cover" class="w-full h-40 object-cover mb-4 rounded">
      <h4 class="font-bold text-lg mb-2">${book.title}</h4>
      <p class="text-sm text-gray-600 mb-4">by ${book.author}</p>
      <button class="remove-btn bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 w-full">
        Remove from Favorites
      </button>
    </div>
  `).join('');
}

// Save to localStorage
function saveToLocalStorage() {
  localStorage.setItem('bookFavorites', JSON.stringify(favorites));
}

// Load from localStorage
function loadFromLocalStorage() {
  const saved = localStorage.getItem('bookFavorites');
  if (saved) {
    favorites = JSON.parse(saved);
  }
}

// Initialize (only DOM stuff if on favorites page)
document.addEventListener('DOMContentLoaded', () => {
  loadFromLocalStorage();

  if (isOnFavoritesPage()) {
    renderFavorites();

    // Event delegation for remove buttons
    const container = document.getElementById('favorites-list');
    container.addEventListener('click', (e) => {
      if (e.target.classList.contains('remove-btn')) {
        const card = e.target.closest('[data-book-id]');
        const bookId = parseInt(card.dataset.bookId);
        removeFavorite(bookId);
      }
    });

    // Event for clear all button
    document.getElementById('clear-all-btn').addEventListener('click', () => {
      if (confirm('Are you sure you want to clear all favorites? This action cannot be undone.')) {
        clearAllFavorites();
      }
    });
  }
});