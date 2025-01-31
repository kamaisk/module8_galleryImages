const btnLoadImages = document.querySelector(".btn-loadImages");

btnLoadImages.addEventListener("click", async () => {
    try {
        console.log('h');
        showLoader();
        const result = await getImages();
        displayImages(result);
    } catch (err) {
        console.error(err.message);
    } finally {
        hideLoader();
    }
})

function showLoader() {
    const loader = document.querySelector(".loader");
    loader.style.display = "block";
};

function hideLoader() {
    const loader = document.querySelector(".loader");
    loader.style.display = "none";
};

async function getImages() {
    try {
        const res = await fetch("https://jsonplaceholder.typicode.com/photos?_start=0&_limit=20");
        if (!res.ok) {
            throw new Error("Что-то пошло не так");
        }
        const data = await res.json();
        return data;
        // if (data) {
        //   // const url = data.message;
        //   displayImages();
        // }
    } catch (err) {
        console.error(err.message)
    }
};

function displayImages(images) {
    const galleryImages = document.querySelector(".gallery");
    galleryImages.innerHTML = "";
    images.forEach(image => {
        const img = document.createElement("img");
        img.src = image.url;
        galleryImages.appendChild(img);
    })
}