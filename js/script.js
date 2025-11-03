console.log("script.js loaded");

// Public beta key from assignment context
const API_KEY = "Wr4cT04axZ3ByRd0m1pHDdO0KcYxfCE1";

// Store all original image URLs here
let images = [];

// Fetch helper using async/await
async function fetchImages(query = "Test") {
    try {
        const url = `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${encodeURIComponent(
            query
        )}&limit=25&offset=0&rating=g&lang=en&bundle=messaging_non_clips`;

        const res = await fetch(url);
        if (!res.ok) {
            throw new Error(`HTTP ${res.status} ${res.statusText}`);
        }

        const data = await res.json();
        const gifs = Array.isArray(data?.data) ? data.data : [];

// Get Image URLs
        images = gifs
            .map((gif) => gif?.images?.original?.url)
            .filter(Boolean);

// Preview in the browser console
        console.log("Original image URLs:", images);

        return images;
    } catch (err) {
        console.error("Failed to fetch images:", err);
        images = [];
        return images;
    }
}
const container = document.querySelector("#gif-container");

// Select the button
const button = document.querySelector("#fetch-gif-btn");
// add click event
button.addEventListener("click", async () => {
    const input = document.querySelector("#search-input");
    const query = input ? input.value.trim() || "Test" : "Test";
    
//fetch images
    await fetchImages(query);
    container.innerHTML = "";
    for (let i = 0; i < images.length; i++) {
        container.innerHTML += `<img src="${images[i]}" class="col-3 mb-3" alt="GIF">`;
    }
});