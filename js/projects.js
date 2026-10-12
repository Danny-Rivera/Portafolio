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
   LÓGICA DE PROYECTOS Y CARRUSELES DINÁMICOS
   ========================================== */

// 1. Única lista donde colocarás las rutas de tus imágenes locales
const imagesProject1 = [
    "images/dispensadores_dobles_en_baño_moderno.webp",
    "RUTA_IMAGEN_DEQ_2_AQUI"
];

const imagesProject2 = [
    "RUTA_IMAGEN_DORADO_1_AQUI",
    "RUTA_IMAGEN_DORADO_2_AQUI"
];

const imagesProject3 = [
    "RUTA_IMAGEN_ORTIZ_1_AQUI",
    "RUTA_IMAGEN_ORTIZ_2_AQUI"
];

document.addEventListener('DOMContentLoaded', () => {

    // Función para configurar cada proyecto (Portada aleatoria + Carrusel automático)
    function setupProject(projectId, imagesArray) {
        if (!imagesArray || imagesArray.length === 0) return;

        // A. Asignar portada aleatoria a la tarjeta principal
        const coverImg = document.getElementById(`cover-${projectId}`);
        if (coverImg) {
            const randomIndex = Math.floor(Math.random() * imagesArray.length);
            coverImg.src = imagesArray[randomIndex];
        }

        // B. Generar dinámicamente las imágenes del carrusel en el modal
        const wrapper = document.getElementById(`carousel-wrapper-${projectId}`);
        const indicatorsBox = document.getElementById(`carousel-indicators-${projectId}`);
        
        if (wrapper && indicatorsBox) {
            wrapper.innerHTML = "";
            indicatorsBox.innerHTML = "";

            imagesArray.forEach((imgSrc, index) => {
                // Crear imagen para el carrusel
                const img = document.createElement('img');
                img.src = imgSrc;
                img.className = index === 0 ? "carousel-img active" : "carousel-img";
                img.alt = `Slide ${index + 1}`;
                wrapper.appendChild(img);

                // Crear indicador de punto
                const indicator = document.createElement('span');
                indicator.className = index === 0 ? "indicator active" : "indicator";
                indicatorsBox.appendChild(indicator);
            });
        }

        // C. Lógica de navegación del carrusel (Anterior / Siguiente)
        const modal = document.getElementById(`modal-${projectId}`);
        if (!modal) return;

        const slides = modal.querySelectorAll('.carousel-img');
        const indicators = modal.querySelectorAll('.indicator');
        const nextBtn = modal.querySelector('.next-btn');
        const prevBtn = modal.querySelector('.prev-btn');
        let currentIndex = 0;

        function updateCarousel(index) {
            slides.forEach((slide, i) => {
                slide.classList.toggle('active', i === index);
            });
            indicators.forEach((ind, i) => {
                ind.classList.toggle('active', i === index);
            });
        }

        if (nextBtn && prevBtn && slides.length > 0) {
            nextBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                currentIndex = (currentIndex + 1) % slides.length;
                updateCarousel(currentIndex);
            });

            prevBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                currentIndex = (currentIndex - 1 + slides.length) % slides.length;
                updateCarousel(currentIndex);
            });
        }
    }

    // Inicializar cada proyecto con su ID numérico
    setupProject('1', imagesProject1);
    setupProject('2', imagesProject2);
    setupProject('3', imagesProject3);
});
