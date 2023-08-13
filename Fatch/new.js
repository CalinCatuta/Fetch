// Get references to DOM elements
const div = document.querySelector('div');
const section = document.querySelector('.bt-grp');
const btns = document.querySelectorAll('button');

// Initialize offset values and current button index
let offset = { start: 0, end: 5 };
let currentIndex = 0;

// Wait for DOM content to load before setting up event listeners
document.addEventListener('DOMContentLoaded', () => {
    getNews(); // Initial fetch
    changeBtn(); // Start changing button color and fetching news
    setupButtonListeners(); // Setup click listeners for buttons
});

// Fetch news content from the API using async/await
async function getNews(start, end) {
    try {
        const response = await fetch('data.json');
        const data = await response.json();

        let output = '';

        // Generate HTML for news content based on the fetched data
        data.news.slice(start, end).forEach((stiri) => {
            output += `
                <h1>${stiri.title}</h1>
                <p>${stiri.details}</p>
            `;
        });

        // Update the innerHTML of the div to display the news content
        div.innerHTML = output;
    } catch (error) {
        console.error('Error fetching news:', error);
    }
}

// Handler function for button clicks
function handleButtonClick(start, end) {
    return function() {
        offset.start = start;
        offset.end = end;
        toggleButtonColor(this); // Change button color
        getNews(offset.start, offset.end); // Fetch news with updated offset
    };
}

// Set up event listeners for buttons
function setupButtonListeners() {
    btns.forEach((btn, index) => {
        const start = index * 5;
        const end = start + 5;
        btn.addEventListener('click', handleButtonClick(start, end));
    });
}

// Change the color of the clicked button
function toggleButtonColor(button) {
    btns.forEach((btn) => btn.classList.remove('color'));
    button.classList.add('color');
}

// Change button color and fetch news content at regular intervals
async function changeBtn() {
    setInterval(async () => {
        currentIndex = (currentIndex + 1) % btns.length;
        toggleButtonColor(btns[currentIndex]); // Change button color
        offset.start = currentIndex * 5; // Update offset start
        offset.end = offset.start + 5; // Update offset end
        await getNews(offset.start, offset.end); // Fetch news with updated offset
    }, 5000);
}
