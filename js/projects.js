document.addEventListener('DOMContentLoaded', () => {

    // 1. LÓGICA DE FILTRADO DE PROYECTOS
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Cambiar clase 'active' entre botones
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            // Mostrar u ocultar tarjetas según la categoría
            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');

                if (filterValue === 'all' || filterValue === category) {
                    card.classList.remove('hide');
                } else {
                    card.classList.add('hide');
                }
            });
        });
    });

    // 2. LÓGICA DEL MODAL (POPUP DETALLE)
    const openModalButtons = document.querySelectorAll('.open-modal-btn');
    const closeModalButtons = document.querySelectorAll('.close-modal');
    const modals = document.querySelectorAll('.modal');

    // Abrir Modal
    openModalButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modalId = button.getAttribute('data-modal');
            const targetModal = document.getElementById(modalId);
            if (targetModal) {
                targetModal.classList.add('active');
            }
        });
    });

    // Cerrar Modal con la 'X'
    closeModalButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modal = button.closest('.modal');
            if (modal) {
                modal.classList.remove('active');
            }
        });
    });

    // Cerrar Modal al hacer clic fuera del contenido del cuadro
    modals.forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
    });
});

/* ==========================================
   LÓGICA DE PROYECTOS Y CARRUSEL (PROJECTS.JS)
   ========================================== */

// Lista de enlaces de imágenes de tus posts para el banner aleatorio y el carrusel
const postImages = [
    "https://scontent-mia5-2.xx.fbcdn.net/v/t39.30808-6/829324825_1723618456433416_2576177245379603620_n.jpg?...",
    "https://via.placeholder.com/800x500?text=Post+Deportivo+DoradoBet",
    "https://via.placeholder.com/800x500?text=Consejos+Arquitectura+Ortiz"
];

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. SELECCIÓN ALEATORIA PARA LA PORTADA PRINCIPAL
    const randomImgElement = document.getElementById('random-cover-img');
    if(randomImgElement) {
        const randomIndex = Math.floor(Math.random() * postImages.length);
        randomImgElement.src = postImages[randomIndex];
    }

    // 2. LÓGICA DEL CARRUSEL (ANTERIOR, SIGUIENTE Y BUCLE INFINITO)
    const slides = document.querySelectorAll('.carousel-img');
    const indicators = document.querySelectorAll('.indicator');
    const nextBtn = document.querySelector('.next-btn');
    const prevBtn = document.querySelector('.prev-btn');
    let currentIndex = 0;

    function updateCarousel(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        indicators.forEach(ind => ind.classList.remove('active'));
        
        slides[index].classList.add('active');
        indicators[index].classList.add('active');
    }

    if(nextBtn && prevBtn && slides.length > 0) {
        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % slides.length; // Vuelve al inicio al llegar al final
            updateCarousel(currentIndex);
        });

        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + slides.length) % slides.length; // Va al último si está en el primero
            updateCarousel(currentIndex);
        });
    }
});