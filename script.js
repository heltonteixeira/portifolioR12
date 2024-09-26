// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
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
document.addEventListener("DOMContentLoaded", function() {
    var lazyloadImages;    

    if ("IntersectionObserver" in window) {
        lazyloadImages = document.querySelectorAll(".lazy");
        var imageObserver = new IntersectionObserver(function(entries, observer) {
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

        lazyloadImages.forEach(function(image) {
            imageObserver.observe(image);
        });
    } else {  
        var lazyloadThrottleTimeout;
        lazyloadImages = document.querySelectorAll(".lazy");
        
        function lazyload () {
            if(lazyloadThrottleTimeout) {
                clearTimeout(lazyloadThrottleTimeout);
            }    

            lazyloadThrottleTimeout = setTimeout(function() {
                var scrollTop = window.pageYOffset;
                lazyloadImages.forEach(function(img) {
                    if(img.offsetTop < (window.innerHeight + scrollTop)) {
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
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate__animated', 'animate__fadeInUp');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

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