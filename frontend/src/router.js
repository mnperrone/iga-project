const routes = {
  '/': 'HomeView',
  '/courses': 'CoursesView',
  '/checkout': 'CheckoutView',
  '/my-courses': 'ClientPurchasesView',
  '/admin': 'AdminView',
  '/admin/courses': 'AdminCoursesView',
  '/admin/purchases': 'AdminPurchasesView'
};

export function initRouter() {
  const main = document.getElementById('app');
  
  function navigateTo(path) {
    window.history.pushState({}, '', path);
    renderView();
  }

  function findMatchingRoute(path) {
    // Primero intentamos una coincidencia exacta
    if (routes[path]) {
      return routes[path];
    }

    // Si no hay coincidencia exacta, buscamos la ruta más larga que coincida
    const matchingRoute = Object.keys(routes)
      .filter(route => path.startsWith(route))
      .sort((a, b) => b.length - a.length)[0];

    return matchingRoute ? routes[matchingRoute] : 'HomeView';
  }

  function renderView() {
    const path = window.location.pathname;
    const viewName = findMatchingRoute(path);
    
    // Limpiar el contenido actual
    main.innerHTML = '';
    
    // Cargar la vista correspondiente
    import(`./views/${viewName}.js`)
      .then(module => {
        const view = module[`create${viewName}`];
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