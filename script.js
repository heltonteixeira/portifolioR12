// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    /**
     * Adds a click event listener to an anchor element that smoothly scrolls to the target element.
     * @param {Event} e - The click event object.
     * @returns {void} This function does not return a value.
     */
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Dynamic image gallery with lazy loading
const galleryImages = [
    'WhatsApp Image 2024-07-25 at 13.49.50.jpeg',
    'WhatsApp Image 2024-07-25 at 13.50.26.jpeg',
    'WhatsApp Image 2024-07-25 at 14.10.54 (1).jpeg',
    'WhatsApp Image 2024-07-25 at 14.10.54 (2).jpeg',
    'WhatsApp Image 2024-07-25 at 14.10.54.jpeg',
    'WhatsApp Image 2024-07-25 at 14.10.55 (1).jpeg',
    'WhatsApp Image 2024-07-25 at 14.10.55 (2).jpeg',
    'WhatsApp Image 2024-07-25 at 14.10.55 (3).jpeg',
    'WhatsApp Image 2024-07-25 at 14.10.55.jpeg',
    'WhatsApp Image 2024-07-25 at 14.10.56 (1).jpeg',
    'WhatsApp Image 2024-07-25 at 14.10.56 (2).jpeg',
    'WhatsApp Image 2024-07-25 at 14.10.56 (3).jpeg'
];

const gallery = document.getElementById('gallery');

/**
 * Creates and appends image cards to a gallery
 * @param {Array} galleryImages - Array of image filenames to be displayed
 * @returns {void} This function does not return a value
 */
galleryImages.forEach(image => {
    const col = document.createElement('div');
    col.className = 'col-md-4 col-sm-6 mb-4';

    const card = document.createElement('div');
    card.className = 'card';

    const img = document.createElement('img');
    img.className = 'card-img-top lazy';
    img.alt = 'Portfolio Image';
    img.dataset.src = `assets/optimized/${image}`;

    card.appendChild(img);
    col.appendChild(card);
    gallery.appendChild(col);
});

// Lazy loading implementation
```
/**
 * Creates an Intersection Observer to implement lazy loading for images.
 * @param {IntersectionObserverEntry[]} entries - The array of intersection observer entries.
 * @param {IntersectionObserver} observer - The intersection observer instance.
 * @returns {void} This function doesn't return a value.
 */
```
document.addEventListener("DOMContentLoaded", function() {
    var lazyloadImages;    

    if ("IntersectionObserver" in window) {
        lazyloadImages = document.querySelectorAll(".lazy");
        var imageObserver = new IntersectionObserver(function(entries, observer) {
            /**
             * Handles intersection events for lazy-loaded images
             * @param {IntersectionObserverEntry[]} entries - Array of intersection observer entries
             * @returns {void} This function doesn't return a value
             */
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    var image = entry.target;
                    image.src = image.dataset.src;
                    image.classList.remove("lazy");
                    image.classList.add("loaded");
                    imageObserver.unobserve(image);
                }
            });
        });

        /**
         * Observes each image in the lazyloadImages collection for lazy loading
         * @param {NodeList|Array} lazyloadImages - Collection of images to be lazy loaded
         * @returns {void} This function does not return a value
         */
        lazyloadImages.forEach(function(image) {
            imageObserver.observe(image);
        /**
         * Implements lazy loading for images on the page.
         * This function delays loading of images until they are about to enter the viewport.
         * It uses a throttle mechanism to optimize performance during rapid scrolling.
         * @returns {void} This function doesn't return a value.
         /**
          * Implements lazy loading for images by checking their position relative to the viewport
          * and loading them when they come into view. It also removes event listeners when all images are loaded.
          * @param {undefined} - This function doesn't take any parameters directly, it uses global variables.
          * @returns {undefined} This function doesn't return a value, it performs side effects.
          */
         */
        });
    } else {  
        var lazyloadThrottleTimeout;
        lazyloadImages = document.querySelectorAll(".lazy");
        
        function lazyload () {
            if(lazyloadThrottleTimeout) {
                /**
                 * Loads images lazily as they come into the viewport
                 * @param {NodeList} lazyloadImages - A collection of image elements with 'lazy' class and 'data-src' attribute
                 * @returns {void} This function doesn't return a value
                 */
                clearTimeout(lazyloadThrottleTimeout);
            }    

            lazyloadThrottleTimeout = setTimeout(function() {
                var scrollTop = window.pageYOffset;
                lazyloadImages.forEach(function(img) {
                    if(img.offsetTop < (window.innerHeight + scrollTop)) {
                        /**
                         * Creates an Intersection Observer to add animation classes to elements when they become visible.
                         * @param {Function} callback - The function to be executed when intersection changes occur.
                         * @param {Object} options - Configuration options for the Intersection Observer.
                         * @returns {IntersectionObserver} An instance of IntersectionObserver.
                         */
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        img.classList.add('loaded');
                    }
                });
                if(lazyloadImages.length == 0) { 
                    document.removeEventListener("scroll", lazyload);
                    window.removeEventListener("resize", lazyload);
                    window.removeEventListener("orientationChange", lazyload);
                }
            }, 20);
        }

        document.addEventListener("scroll", lazyload);
        window.addEventListener("resize", lazyload);
        window.addEventListener("orientationChange", lazyload);
    }
});

// Animate section headings
const animateSectionHeadings = () => {
    const headings = document.querySelectorAll('section h2');
    const observer = new IntersectionObserver((entries) => {
        /**
         * Animates elements as they enter the viewport
         * @param {IntersectionObserverEntry[]} entries - An array of IntersectionObserverEntry objects
         * @returns {void} This function doesn't return a value
         */
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate__animated', 'animate__fadeInUp');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    /**
     /**
      * Handles the submission of the contact form.
      * @param {Event} e - The submit event object.
      * @returns {void} This function doesn't return a value.
      */
     * Observes each heading element in the provided array
     * @param {Array<HTMLElement>} headings - An array of heading elements to be observed
     * @returns {void} This function does not return a value
     */
    headings.forEach(heading => {
        observer.observe(heading);
    });
};

// Form validation and submission
const validateForm = (name, email, message) => {
    let isValid = true;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (name.trim() === '') {
        isValid = false;
        document.getElementById('name').classList.add('is-invalid');
    } else {
        document.getElementById('name').classList.remove('is-invalid');
    }

    if (!emailRegex.test(email)) {
        isValid = false;
        document.getElementById('email').classList.add('is-invalid');
    } else {
        document.getElementById('email').classList.remove('is-invalid');
    }

    if (message.trim() === '') {
        isValid = false;
        document.getElementById('message').classList.add('is-invalid');
    } else {
        document.getElementById('message').classList.remove('is-invalid');
    }

    return isValid;
};

document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    if (validateForm(name, email, message)) {
        // Here you would typically send the form data to a server
        // For now, we'll just log it to the console
        console.log('Form submitted');
        console.log('Name:', name);
        console.log('Email:', email);
        console.log('Message:', message);
        alert('Thank you for your message. We will get back to you soon!');
        this.reset();
    }
});

// Initialize animations when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    animateSectionHeadings();
});