// ========== Constants ==========
const MODES = {
    BLACK: 'black',
    RANDOM: 'random',
    RESET: 'reset'
};

const CONFIG = {
    DEFAULT_SIZE: 16,
    MIN_SIZE: 1,
    MAX_SIZE: 64,
    RESET_COLOR: 'white'
};

// ========== State ==========
let currentMode = MODES.BLACK;
let gridSize = CONFIG.DEFAULT_SIZE;

// ========== DOM Elements ==========
const elements = {
    gridContainer: document.getElementById('grid-container'),
    sizeInput: document.getElementById('number'),
    selectBtn: document.getElementById('selectBtn'),
    blackBtn: document.getElementById('blackbtn'),
    randomBtn: document.getElementById('randombtn'),
    resetBtn: document.getElementById('resetbtn')
};

// ========== Utility Functions ==========
const getRandomRGB = () => Math.floor(Math.random() * 256);

const getRandomColor = () => 
    `rgb(${getRandomRGB()}, ${getRandomRGB()}, ${getRandomRGB()})`;

// ========== Core Functions ==========
function getCellColor() {
    switch (currentMode) {
        case MODES.BLACK:
            return 'black';
        case MODES.RANDOM:
            return getRandomColor();
        case MODES.RESET:
            return CONFIG.RESET_COLOR;
        default:
            return 'black';
    }
}

function handleCellHover(event) {
    event.target.style.backgroundColor = getCellColor();
}

function createCell() {
    const cell = document.createElement('div');
    cell.classList.add('grid-cell');
    cell.addEventListener('mouseover', handleCellHover);
    return cell;
}

function createGrid(size) {
    // Clear existing grid
    elements.gridContainer.innerHTML = '';
    
    // Set grid dimensions
    elements.gridContainer.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    elements.gridContainer.style.gridTemplateRows = `repeat(${size}, 1fr)`;
    
    // Create and append cells
    const fragment = document.createDocumentFragment();
    const totalCells = size * size;
    
    for (let i = 0; i < totalCells; i++) {
        fragment.appendChild(createCell());
    }
    
    elements.gridContainer.appendChild(fragment);
}

// ========== Event Handlers ==========
function handleSizeChange() {
    const size = Number(elements.sizeInput.value);
    
    if (size >= CONFIG.MIN_SIZE && size <= CONFIG.MAX_SIZE) {
        gridSize = size;
        createGrid(gridSize);
    } else {
        alert(`Please enter a size between ${CONFIG.MIN_SIZE} and ${CONFIG.MAX_SIZE}`);
    }
}

function setMode(mode) {
    currentMode = mode;
}

// ========== Event Listeners ==========
function initializeEventListeners() {
    elements.selectBtn.addEventListener('click', handleSizeChange);
    elements.blackBtn.addEventListener('click', () => setMode(MODES.BLACK));
    elements.randomBtn.addEventListener('click', () => setMode(MODES.RANDOM));
    elements.resetBtn.addEventListener('click', () => setMode(MODES.RESET));
    
    // Allow Enter key to update grid size
    elements.sizeInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleSizeChange();
    });
}

// ========== Initialization ==========
function init() {
    initializeEventListeners();
    createGrid(gridSize);
}

// Start the application when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
//initialize grid
createGrid(gridSize);
