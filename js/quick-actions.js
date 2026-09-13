/**
 * PRAHARI - Quick Actions Engine
 * Real-time Search Filter for 6-Button Bento Grid
 */

document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.getElementById('qa-search-input');
    const searchClearBtn = document.getElementById('qa-search-clear');
    const bentoCards = document.querySelectorAll('#qa-bento-grid .bento-card');
    const noResultsEl = document.getElementById('qa-no-results');

    function filterTools() {
        const query = searchInput ? searchInput.value.toLowerCase().trim() : '';

        if (searchClearBtn) {
            if (query.length > 0) {
                searchClearBtn.classList.add('visible');
            } else {
                searchClearBtn.classList.remove('visible');
            }
        }

        let visibleCount = 0;

        bentoCards.forEach(card => {
            const title = (card.querySelector('.bento-title')?.innerText || '').toLowerCase();
            const sub = (card.querySelector('.bento-subtext')?.innerText || '').toLowerCase();

            if (query === '' || title.includes(query) || sub.includes(query)) {
                card.style.display = '';
                visibleCount++;
            } else {
                card.style.display = 'none';
            }
        });

        if (noResultsEl) {
            if (visibleCount === 0) {
                noResultsEl.classList.add('visible');
            } else {
                noResultsEl.classList.remove('visible');
            }
        }
    }

    if (searchInput) {
        searchInput.addEventListener('input', filterTools);
    }

    if (searchClearBtn) {
        searchClearBtn.addEventListener('click', function () {
            searchInput.value = '';
            filterTools();
            searchInput.focus();
        });
    }
});