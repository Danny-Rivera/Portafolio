document.addEventListener('DOMContentLoaded', () => {
    // Destacar automáticamente la página activa en el menú de navegación
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-links a');

    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
        }
    });

    console.log('Componentes globales cargados correctamente.');
});