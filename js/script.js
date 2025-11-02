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

        // Collect original image URLs from the payload
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

// Run on page load with a default query
document.addEventListener("DOMContentLoaded", () => {
    fetchImages();

    // Optional: allow searching by pressing Enter in the input
    const input = document.getElementById("search-input");
    if (input) {
        input.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                const q = input.value.trim() || "Test";
                fetchImages(q);
            }
        });
    }
});