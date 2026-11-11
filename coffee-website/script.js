
// ======================================
// 1. MOBILE NAVIGATION
// ======================================

const menuToggle = document.querySelector("#menu-toggle");
const navMenu = document.querySelector("#nav-menu");
const navLinks = document.querySelectorAll(".nav-link");

function closeMenu() {
    navMenu.classList.remove("active");

    menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
}

menuToggle.addEventListener("click", () => {

    const isOpen = navMenu.classList.toggle("active");

    menuToggle.innerHTML = isOpen
        ? '<i class="fa-solid fa-xmark"></i>'
        : '<i class="fa-solid fa-bars"></i>';

    menuToggle.setAttribute("aria-expanded", isOpen);
    menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation" : "Open navigation"
    );

});

// Close menu when clicking a link
navLinks.forEach(link => {
    link.addEventListener("click", closeMenu);
});

// Close menu with Escape
document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
        closeMenu();
    }
});


// ======================================
// 2. ACTIVE NAVIGATION
// ======================================

const pageSections = document.querySelectorAll(
    "main section[id]"
);

function updateNavigation() {

    let currentSection = "home";

    pageSections.forEach(section => {

        const sectionTop = section.offsetTop - 150;

        if (window.scrollY >= sectionTop) {
            currentSection = section.id;
        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        if (
            link.getAttribute("href") ===
            "#" + currentSection
        ) {
            link.classList.add("active");
        }

    });

}

window.addEventListener("scroll", updateNavigation);
updateNavigation();


// ======================================
// 3. SHOPPING CART
// ======================================

let cart = [];

const cartButton = document.querySelector("#cart-button");
const cartModal = document.querySelector("#cart-modal");
const closeCart = document.querySelector("#close-cart");

const cartItems = document.querySelector("#cart-items");
const cartCount = document.querySelector("#cart-count");
const cartTotal = document.querySelector("#cart-total");
const cartStatus = document.querySelector("#cart-status");


// Add products to cart
const orderButtons = document.querySelectorAll(".order-btn");

orderButtons.forEach(button => {

    button.addEventListener("click", () => {

        const product = button.dataset.product;
        const price = Number(button.dataset.price);

        const existingItem = cart.find(
            item => item.name === product
        );

        if (existingItem) {

            existingItem.quantity++;

        } else {

            cart.push({
                name: product,
                price: price,
                quantity: 1
            });

        }

        updateCart();

        button.textContent = "Added!";

        setTimeout(() => {
            button.textContent = "Add to Cart";
        }, 1000);

    });

});


// Update cart information
function updateCart() {

    cartItems.innerHTML = "";

    let total = 0;
    let quantityTotal = 0;

    if (cart.length === 0) {

        cartItems.innerHTML = "<p>Your cart is empty.</p>";

    }

    cart.forEach((item, index) => {

        total += item.price * item.quantity;
        quantityTotal += item.quantity;

        const itemElement = document.createElement("div");

        itemElement.className = "cart-item";

        const itemName = document.createElement("span");
        itemName.textContent =
            `${item.name} × ${item.quantity}`;

        const itemPrice = document.createElement("strong");
        itemPrice.textContent =
            `Nu. ${item.price * item.quantity}`;

        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.setAttribute(
            "aria-label",
            `Remove ${item.name} from cart`
        );

        removeButton.addEventListener("click", () => {
            removeItem(index);
        });

        itemElement.append(itemName, itemPrice, removeButton);

        cartItems.appendChild(itemElement);

    });

    cartCount.textContent = quantityTotal;
    cartTotal.textContent = total;

}


// Remove product from cart
function removeItem(index) {

    cart.splice(index, 1);

    updateCart();

}


// Open cart
cartButton.addEventListener("click", () => {

    cartModal.classList.add("show");
    cartModal.setAttribute("aria-hidden", "false");
    cartStatus.textContent = "";

});


// Close cart
function hideCart() {

    cartModal.classList.remove("show");
    cartModal.setAttribute("aria-hidden", "true");

}

closeCart.addEventListener("click", hideCart);


// Close cart when clicking outside
cartModal.addEventListener("click", event => {

    if (event.target === cartModal) {
        hideCart();
    }

});


// Checkout demonstration
const checkoutButton = document.querySelector("#checkout-button");

checkoutButton.addEventListener("click", () => {

    if (cart.length === 0) {

        cartStatus.textContent = "Your cart is empty!";
        return;

    }

    const orderTotal = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    cartStatus.textContent =
        `Order prepared! Your total is Nu. ${orderTotal}. Please contact the shop to complete your purchase.`;

    cart = [];

    updateCart();

});


// ======================================
// 4. TESTIMONIAL SLIDER
// ======================================

const testimonials = document.querySelectorAll(
    ".testimonial-card"
);

const previousButton = document.querySelector(
    "#prev-testimonial"
);

const nextButton = document.querySelector(
    "#next-testimonial"
);

let currentTestimonial = 0;


function showTestimonial(index) {

    testimonials.forEach(card => {
        card.classList.remove("active");
    });

    testimonials[index].classList.add("active");

}


nextButton.addEventListener("click", () => {

    currentTestimonial++;

    if (currentTestimonial >= testimonials.length) {
        currentTestimonial = 0;
    }

    showTestimonial(currentTestimonial);

});


previousButton.addEventListener("click", () => {

    currentTestimonial--;

    if (currentTestimonial < 0) {
        currentTestimonial = testimonials.length - 1;
    }

    showTestimonial(currentTestimonial);

});


// Automatically change testimonials every 5 seconds
setInterval(() => {

    currentTestimonial++;

    if (currentTestimonial >= testimonials.length) {
        currentTestimonial = 0;
    }

    showTestimonial(currentTestimonial);

}, 5000);


// ======================================
// 5. IMAGE GALLERY LIGHTBOX
// ======================================

const galleryImages = document.querySelectorAll(
    ".gallery-container img"
);

const lightbox = document.querySelector("#lightbox");
const lightboxImage = document.querySelector("#lightbox-image");
const closeLightbox = document.querySelector("#close-lightbox");


// Open image
galleryImages.forEach(image => {

    image.addEventListener("click", () => {

        lightboxImage.src = image.src;
        lightboxImage.alt = image.alt;

        lightbox.classList.add("show");
        lightbox.setAttribute("aria-hidden", "false");

    });

});


// Close image
function hideLightbox() {

    lightbox.classList.remove("show");
    lightbox.setAttribute("aria-hidden", "true");

    lightboxImage.src = "";

}

closeLightbox.addEventListener("click", hideLightbox);


// Close when clicking outside image
lightbox.addEventListener("click", event => {

    if (event.target === lightbox) {
        hideLightbox();
    }

});


// ======================================
// 6. CONTACT FORM VALIDATION
// ======================================

const contactForm = document.querySelector("#contact-form");
const formStatus = document.querySelector("#form-status");

contactForm.addEventListener("submit", event => {

    event.preventDefault();

    const name = document.querySelector("#name").value.trim();
    const email = document.querySelector("#email").value.trim();
    const message = document.querySelector("#message").value.trim();

    if (!name || !email || !message) {

        formStatus.textContent =
            "Please complete all fields.";

        return;

    }

    formStatus.textContent =
        `Thank you, ${name}! Your message has been validated.`;

    contactForm.reset();

});


// ======================================
// 7. BACK TO TOP
// ======================================

const backToTop = document.querySelector("#back-to-top");

window.addEventListener("scroll", () => {

    if (window.scrollY > 400) {

        backToTop.classList.add("show");

    } else {

        backToTop.classList.remove("show");

    }

});


backToTop.addEventListener("click", () => {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});


// ======================================
// 8. KEYBOARD ACCESSIBILITY
// ======================================

document.addEventListener("keydown", event => {

    if (event.key === "Escape") {

        hideCart();
        hideLightbox();

    }

});


// ======================================
// 9. INITIALIZE CART
// ======================================

updateCart();

console.log("Coffee Website Successfully Loaded!");
