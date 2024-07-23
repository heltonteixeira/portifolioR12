document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling para links internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Animação para a timeline
    function isElementInViewport(el) {
        var rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    function animateTimeline() {
        var items = document.querySelectorAll('.timeline-item');
        items.forEach(function(item) {
            if (isElementInViewport(item)) {
                item.classList.add('animate');
            }
        });
    }

    window.addEventListener('load', animateTimeline);
    window.addEventListener('scroll', animateTimeline);

    // Validação simples do formulário de contato
    document.querySelector('form').addEventListener('submit', function(e) {
        e.preventDefault();
        // Aqui você pode adicionar a lógica de validação e envio do formulário
        alert('Mensagem enviada com sucesso!');
    });
});