const btnLoadImages = document.querySelector(".main__btn-load-images");
const btnCleanImages = document.querySelector(".main__btn-clean-images");
const imagesContainer = document.querySelector(".main__images-container");

async function getImages() {
    const loader = document.querySelector(".main__loader");
    loader.style.display = "block";
    try {
        const res = await fetch("https://api.thecatapi.com/v1/images/search?limit=20");
        if (!res.ok) {
            throw new Error("Ошибка при загрузке изображений")
        }
        const data = await res.json();
        if (data) {
            displayImages(data);
        }
    } catch (err) {
        console.error('Ошибка:', err);
        alert("Не удалось загрузить изображения. Попробуйте снова.");
    } finally {
        loader.style.display = "none";
    };
};

function displayImages(images) {
    imagesContainer.innerHTML = "";
    images.forEach((image) => {
        const postElement = document.createElement("div");
        postElement.classList.add("post");
        postElement.innerHTML = `<img src="${image.url}" alt="Картинка кота">`;
        imagesContainer.appendChild(postElement);
    });
};

function cleanImages() {
    imagesContainer.innerHTML = "";
};

// btnLoadImages.addEventListener("click", getImages);
btnLoadImages.addEventListener("click", async () => {
    // Эта строка отключает кнопку btnLoadImages, чтобы предотвратить повторные нажатия, 
    // пока выполняется асинхронная операция. Это полезно для предотвращения возможных ошибок или конфликтов, 
    // если пользователь попытается нажать кнопку несколько раз, пока загружаются изображения.
    btnLoadImages.disabled = true;
    await getImages();
    // После завершения загрузки изображений (после того, как getImages() завершится), 
    // кнопка снова становится активной, позволяя пользователю нажимать на нее снова.
    btnLoadImages.disabled = false;
});
btnCleanImages.addEventListener("click", cleanImages);