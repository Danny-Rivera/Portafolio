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
   LÓGICA DE PROYECTOS Y CARRUSELES INDEPENDIENTES
   ========================================== */

// 1. Bancos de imágenes separados por cada proyecto/cliente
const imagesProject1 = [
    "https://scontent-mia5-2.xx.fbcdn.net/v/t39.30808-6/829324825_1723618456433416_2576177245379603620_n.jpg?...",
    "https://via.placeholder.com/800x500?text=DEQ+Comercial+Imagen+2",
    "https://via.placeholder.com/800x500?text=DEQ+Comercial+Imagen+3"
];

const imagesProject2 = [
    "https://via.placeholder.com/800x500?text=DoradoBet+Post+1",
    "https://via.placeholder.com/800x500?text=DoradoBet+Post+2"
];

const imagesProject3 = [
    "https://via.placeholder.com/800x500?text=Ortiz+Arq+1",
    "https://via.placeholder.com/800x500?text=Ortiz+Arq+2",
    "https://via.placeholder.com/800x500?text=Ortiz+Arq+3"
];

document.addEventListener('DOMContentLoaded', () => {

    // Función auxiliar para asignar imagen aleatoria a la portada de una tarjeta
    function setRandomCover(imgElementId, imagesArray) {
        const coverImg = document.getElementById(imgElementId);
        if (coverImg && imagesArray.length > 0) {
            const randomIndex = Math.floor(Math.random() * imagesArray.length);
            coverImg.src = imagesArray[randomIndex];
        }
    }

    // Asignar portadas aleatorias al cargar
    setRandomCover('cover-project-1', imagesProject1);
    setRandomCover('cover-project-2', imagesProject2);
    setRandomCover('cover-project-3', imagesProject3);

    // Función genérica para inicializar carruseles dentro de los modales
    function initCarousel(modalId) {
        const modal = document.getElementById(modalId);
        if (!modal) return;

        const slides = modal.querySelectorAll('.carousel-img');
        const indicators = modal.querySelectorAll('.indicator');
        const nextBtn = modal.querySelector('.next-btn');
        const prevBtn = modal.querySelector('.prev-btn');
        let currentIndex = 0;

        function updateCarousel(index) {
            slides.forEach(slide => slide.classList.remove('active'));
            indicators.forEach(ind => ind.classList.remove('active'));
            
            slides[index].classList.add('active');
            indicators[index].classList.add('active');
        }

        if (nextBtn && prevBtn && slides.length > 0) {
            nextBtn.addEventListener('click', () => {
                currentIndex = (currentIndex + 1) % slides.length;
                updateCarousel(currentIndex);
            });

            prevBtn.addEventListener('click', () => {
                currentIndex = (currentIndex - 1 + slides.length) % slides.length;
                updateCarousel(currentIndex);
            });
        }
    }

    // Inicializar el carrusel de cada proyecto por separado
    initCarousel('modal-1');
    initCarousel('modal-2');
    initCarousel('modal-3');
});