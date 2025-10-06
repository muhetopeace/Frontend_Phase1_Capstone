import { addFavorite, removeFavorite, getFavorites, clearAllFavorites } from './favorites.js';

document.addEventListener('DOMContentLoaded', () => {
  const grid = document.getElementById('books-grid');

  // Function to update all button states based on current favorites
  function updateButtonStates() {
    const favorites = getFavorites();
    const buttons = grid.querySelectorAll('.add-favorite');
    buttons.forEach(button => {
      const bookId = parseInt(button.dataset.bookId);
      const isFavorited = favorites.some(fav => fav.id === bookId);
      
      if (isFavorited) {
        button.textContent = 'Remove from Favorites';
        button.classList.remove('bg-green-500', 'hover:bg-green-600');
        button.classList.add('bg-red-500', 'hover:bg-red-600');
        button.disabled = false;
      } else {
        button.textContent = 'Add to Favorites';
        button.classList.remove('bg-red-500', 'hover:bg-red-600', 'bg-gray-400', 'cursor-not-allowed');
        button.classList.add('bg-green-500', 'hover:bg-green-600');
        button.disabled = false;
      }
    });
  }

  // Initial update
  updateButtonStates();

  // Event delegation for toggle buttons
  grid.addEventListener('click', (e) => {
    if (e.target.classList.contains('add-favorite')) {
      const book = {
        id: parseInt(e.target.dataset.bookId),
        title: e.target.dataset.title,
        author: e.target.dataset.author,
        cover: e.target.dataset.cover
      };

      const isCurrentlyFavorited = e.target.textContent === 'Remove from Favorites';
      
      if (isCurrentlyFavorited) {
        removeFavorite(book.id);
      } else {
        addFavorite(book);
      }
      
      // Refresh all buttons after action
      updateButtonStates();
    }
  });

  // Placeholder for search (implement in Lab 3)
  document.getElementById('search-btn').addEventListener('click', () => {
    const query = document.getElementById('search-input').value;
    console.log('Search for:', query);
  });
});