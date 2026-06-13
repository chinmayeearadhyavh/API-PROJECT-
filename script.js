// DOM Elements
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const characterGrid = document.getElementById('character-grid');
const loadingState = document.getElementById('loading');
const errorState = document.getElementById('error');
const errorMessage = document.getElementById('error-message');

const pagination = document.getElementById('pagination');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const pageInfo = document.getElementById('page-info');

// App State
let currentPage = 1;
let currentSearch = '';
let totalPages = 1;

// API Base URL
const API_URL = 'https://rickandmortyapi.com/api/character';

// Event Listeners
searchBtn.addEventListener('click', handleSearch);
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleSearch();
});
prevBtn.addEventListener('click', () => {
    if (currentPage > 1) fetchCharacters(currentSearch, currentPage - 1);
});
nextBtn.addEventListener('click', () => {
    if (currentPage < totalPages) fetchCharacters(currentSearch, currentPage + 1);
});

// Initialization
fetchCharacters();

// Functions
function handleSearch() {
    currentSearch = searchInput.value.trim();
    fetchCharacters(currentSearch, 1);
}

async function fetchCharacters(name = '', page = 1) {
    // 1. Show Loading State, hide everything else
    loadingState.classList.remove('hidden');
    errorState.classList.add('hidden');
    characterGrid.innerHTML = '';
    pagination.classList.add('hidden');

    try {
        // 2. Fetch Data (The core requirement)
        const url = `${API_URL}/?page=${page}&name=${name}`;
        const response = await fetch(url);
        
        // 3. Handle Errors (e.g., character not found gives a 404)
        if (!response.ok) {
            if (response.status === 404) {
                throw new Error("No characters found.");
            } else {
                throw new Error("Failed to fetch data.");
            }
        }

        const data = await response.json();
        
        // 4. Update State
        currentPage = page;
        totalPages = data.info.pages;
        
        // 5. Update DOM
        renderCharacters(data.results);
        updatePagination();

    } catch (error) {
        // 6. Display Error State
        console.error(error);
        errorMessage.textContent = error.message;
        errorState.classList.remove('hidden');
    } finally {
        // 7. Hide Loading State
        loadingState.classList.add('hidden');
    }
}

function renderCharacters(characters) {
    characters.forEach(char => {
        // Create card element
        const card = document.createElement('div');
        card.className = 'card';
        
        // Construct HTML using template literals
        card.innerHTML = `
            <img src="${char.image}" alt="${char.name}">
            <div class="card-content">
                <h2>${char.name}</h2>
                
                <div class="status">
                    <span class="status-icon ${char.status}"></span>
                    ${char.status} - ${char.species}
                </div>
                
                <div class="info-group">
                    <span class="label">Last known location:</span>
                    <span class="value">${char.location.name}</span>
                </div>
                
                <div class="info-group">
                    <span class="label">Origin:</span>
                    <span class="value">${char.origin.name}</span>
                </div>
            </div>
        `;
        
        // Append to grid
        characterGrid.appendChild(card);
    });
}

function updatePagination() {
    // Show/hide pagination container
    if (totalPages > 1) {
        pagination.classList.remove('hidden');
        pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;
        
        // Enable/Disable buttons
        prevBtn.disabled = currentPage === 1;
        nextBtn.disabled = currentPage === totalPages;
    }
}
