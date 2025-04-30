const routes = {
  '/': 'HomeView',
  '/courses': 'CoursesView',
  '/checkout': 'CheckoutView',
  '/my-courses': 'ClientPurchasesView',
  '/admin': 'AdminCoursesView'
};

export function initRouter() {
  const main = document.getElementById('app');
  
  function navigateTo(path) {
    window.history.pushState({}, '', path);
    renderView();
  }

  function renderView() {
    const path = window.location.pathname;
    const viewName = routes[path] || 'HomeView';
    
    // Limpiar el contenido actual
    main.innerHTML = '';
    
    // Cargar la vista correspondiente
    import(`./views/${viewName}.js`)
      .then(module => {
        const view = module.default;
        main.appendChild(view());
      })
      .catch(error => {
        console.error('Error al cargar la vista:', error);
        main.innerHTML = '<h1>Error 404 - Página no encontrada</h1>';
      });
  }

  // Manejar la navegación
  window.addEventListener('popstate', renderView);
  
  // Inicializar la vista
  renderView();

  // Exponer la función de navegación
  window.navigateTo = navigateTo;
} 