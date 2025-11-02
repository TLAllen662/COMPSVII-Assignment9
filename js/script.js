console.log("script.js loaded");
endpoint();
function endpoint() {
    console.log("Endpoint function executed");
    fetch('https://api.giphy.com/v1/gifs/search?api_key=Wr4cT04axZ3ByRd0m1pHDdO0KcYxfCE1&q=Test&limit=25&offset=0&rating=g&lang=en&bundle=messaging_non_clips')
        .then(response => response.json())
        .then(data => {
            console.log("Data fetched from Giphy API:", data);
            const gifs = data.data;
            gifs.forEach(gif => {
                console.log("GIF URL:", gif.images.fixed_height.url);
            })
        })
}