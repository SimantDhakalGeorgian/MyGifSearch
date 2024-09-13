// Simant Dhakal - Giphy API Key
const API_KEY = 'gZKhXQSjBIA8Mhc3cyJc4kzvhQiVB817'; // my Giphy API key

// Get elements from the DOM
const searchButton = document.getElementById('searchButton');
const clearButton = document.getElementById('clearButton');
const searchInput = document.getElementById('searchInput');
const gifContainer = document.getElementById('gifContainer');

// Add event listener to the search button
searchButton.addEventListener('click', () => {
    const query = searchInput.value.trim(); // trim hidden spaces
    // check if query is not empty and search the input result
    if (query) {
        searchGifs(query);
    }
});

// Add event listener to the clear button to reset input and clear results
clearButton.addEventListener('click', () => {
    searchInput.value = '';
    gifContainer.innerHTML = '';
});

// Function to search for GIFs
function searchGifs(query) {
    // add limit 4 GIFs
    const url = `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${query}&limit=4`;  

    // Fetch data from the Giphy API
    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.data.length > 0) {
                displayGifs(data.data);
            } else {
                gifContainer.innerHTML = '<p style="color:red";>No GIFs found. Please write another name and search again.</p>';
            }
        })
        .catch(error => {
            console.error('Error fetching the GIFs:', error);
            gifContainer.innerHTML = '<p style="color:red";>Please try again later. Sorry, an error occurred while fetching GIFs.</p>';
        });
}

// Function to display GIFs on the page
function displayGifs(gifs) {
    // Clear the previous results
    gifContainer.innerHTML = '';

    // Loop through the GIFs and add them to the page
    gifs.forEach(gif => {
        const img = document.createElement('img');
        img.src = gif.images.fixed_height.url;
        img.alt = gif.title;
        gifContainer.appendChild(img);
    });
}
