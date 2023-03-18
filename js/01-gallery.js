import { galleryItems } from "./gallery-items.js";
// Change code below this line

const gallery = document.querySelector(".gallery");

const galleryElements = [];

galleryItems.map(galleryItem => {
	const div = document.createElement("div");
	div.classList.add("gallery__item");

	const a = document.createElement("a");
	a.classList.add("gallery__link");
	a.href = galleryItem.original;

	const img = document.createElement("img");
	img.classList.add("gallery__image");
	img.src = galleryItem.preview;
	img.dataset.source = galleryItem.original;
	img.alt = galleryItem.description;

	a.append(img);
	div.append(a);

	galleryElements.push(div);
});

gallery.append(...galleryElements);

gallery.addEventListener("click", onGalleryElementClick);

function onGalleryElementClick(event) {
	event.preventDefault();

	if (event.target.nodeName !== "IMG") {
		return;
	}
	openModal(event.target.dataset.source);
}

let instanceRef;

function openModal(largeImgUrl) {
	const instance = basicLightbox.create(
		`
		<img src="${largeImgUrl}">
	`,
		{
			onShow: onShowModal,
			onClose: onCloseModal,
		},
	);
	instance.show();
	instanceRef = instance;
}

function onShowModal() {
	document.addEventListener("keydown", onEscButtonPress);
}

function onCloseModal() {
	document.removeEventListener("keydown", onEscButtonPress);
}

function onEscButtonPress(event) {
	if (event.key === "Escape") {
		instanceRef.close();
	}
}


// дз 7