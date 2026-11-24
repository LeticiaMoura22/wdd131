// Plant guide: filter, sort, and render vegetables from an array of objects.
const plants = [
    { name: 'Lettuce', sun: 'partial', season: 'spring', potGallons: 1, daysToHarvest: 45, tip: 'Keep it cool and water often so the leaves stay tender.' },
    { name: 'Spinach', sun: 'partial', season: 'spring', potGallons: 2, daysToHarvest: 40, tip: 'Harvest outer leaves first so the plant keeps producing.' },
    { name: 'Radish', sun: 'full', season: 'spring', potGallons: 1, daysToHarvest: 25, tip: 'The fastest crop here. Thin seedlings so the roots have room.' },
    { name: 'Peas', sun: 'full', season: 'spring', potGallons: 3, daysToHarvest: 60, tip: 'Give them a small trellis to climb.' },
    { name: 'Green onions', sun: 'partial', season: 'spring', potGallons: 1, daysToHarvest: 60, tip: 'Snip the tops as you need them; they regrow.' },
    { name: 'Cherry tomato', sun: 'full', season: 'summer', potGallons: 5, daysToHarvest: 65, tip: 'Use a deep pot and a stake, and water at the base of the plant.' },
    { name: 'Bell pepper', sun: 'full', season: 'summer', potGallons: 3, daysToHarvest: 75, tip: 'Peppers are slow, so buy a young plant from a nursery.' },
    { name: 'Basil', sun: 'full', season: 'summer', potGallons: 1, daysToHarvest: 70, tip: 'Pinch off flower buds to keep the leaves coming.' },
    { name: 'Swiss chard', sun: 'partial', season: 'summer', potGallons: 3, daysToHarvest: 55, tip: 'Its colorful stems look good in a pot.' },
    { name: 'Carrot', sun: 'full', season: 'fall', potGallons: 5, daysToHarvest: 70, tip: 'Choose a short variety and a deep pot.' },
    { name: 'Kale', sun: 'shade', season: 'fall', potGallons: 3, daysToHarvest: 55, tip: 'Kale tolerates cool weather and light shade.' },
    { name: 'Mint', sun: 'shade', season: 'summer', potGallons: 2, daysToHarvest: 30, tip: 'Mint spreads fast, so always grow it in its own pot.' }
];

const sunLabels = {
    full: 'Full sun',
    partial: 'Partial sun',
    shade: 'Shade'
};

const filterForm = document.getElementById('filter-form');
const sunFilter = document.getElementById('sun-filter');
const seasonFilter = document.getElementById('season-filter');
const sortFilter = document.getElementById('sort-filter');
const plantList = document.getElementById('plant-list');
const resultCount = document.getElementById('result-count');
const emptyMessage = document.getElementById('empty-message');

function matchesFilters(plant, sun, season) {
    const sunMatch = sun === 'all' || plant.sun === sun;
    const seasonMatch = season === 'all' || plant.season === season;
    return sunMatch && seasonMatch;
}

function sortPlants(list, sortBy) {
    const copy = [...list];
    if (sortBy === 'days') {
        return copy.sort((a, b) => a.daysToHarvest - b.daysToHarvest);
    }
    return copy.sort((a, b) => a.name.localeCompare(b.name));
}

function plantCardTemplate(plant) {
    return `
        <li class="card plant-card">
            <img src="images/vegetables.svg" alt="" width="240" height="150" loading="lazy">
            <h3>${plant.name}</h3>
            <dl>
                <dt>Sun</dt>
                <dd>${sunLabels[plant.sun]}</dd>
                <dt>Season</dt>
                <dd>${plant.season.charAt(0).toUpperCase()}${plant.season.slice(1)}</dd>
                <dt>Pot size</dt>
                <dd>${plant.potGallons} gallon${plant.potGallons === 1 ? '' : 's'}</dd>
                <dt>Days to harvest</dt>
                <dd>About ${plant.daysToHarvest} days</dd>
            </dl>
            <p>${plant.tip}</p>
        </li>
    `;
}

function renderPlants() {
    const sun = sunFilter.value;
    const season = seasonFilter.value;
    const sortBy = sortFilter.value;

    const filtered = plants.filter((plant) => matchesFilters(plant, sun, season));
    const sorted = sortPlants(filtered, sortBy);

    if (sorted.length === 0) {
        plantList.innerHTML = '';
        emptyMessage.hidden = false;
        resultCount.textContent = 'Showing 0 plants';
        return;
    }

    emptyMessage.hidden = true;
    plantList.innerHTML = sorted.map(plantCardTemplate).join('');

    const countText = sorted.length === 1 ? 'Showing 1 plant' : `Showing ${sorted.length} plants`;
    resultCount.textContent = countText;
}

filterForm.addEventListener('change', renderPlants);
filterForm.addEventListener('submit', (event) => event.preventDefault());

renderPlants();
