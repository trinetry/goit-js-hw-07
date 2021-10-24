import { galleryItems } from './gallery-items.js';
// Change code below this line

const galleryContainer = document.querySelector(".gallery");
const galleryMarkup = createGalleryMarkup(galleryItems);

galleryContainer.insertAdjacentHTML("beforeend", galleryMarkup);

function createGalleryMarkup(galleryItems) {
    return galleryItems.map(({ preview, original, description }) => `
        <div class="gallery__item">
            <a class="gallery__link" href="${original}">
                <img
                    class="gallery__image"
                    src="${preview}"
                    data-source="${original}"
                    alt="${description}"
                />
            </a>
        </div>
    `).join("")

};

galleryContainer.addEventListener('click', onSelectImage);
function onSelectImage(event) {
    event.preventDefault();
    const galleryItem = galleryItems.find(item => item.preview === event.target.src)
    const instance = basicLightbox.create(`
        <img src="${galleryItem.original}" width="800" height="600">
    `, {
        onShow() {
            document.body.addEventListener("keydown", onEscape)
        },
        onClose() {
            document.body.removeEventListener("keydown", onEscape)
        }
    })
    instance.show();
    console.log(instance);

    function onEscape(event) {
        if (event.key === "Escape") {
            instance.close()
        }
    }
}

console.log(galleryItems);