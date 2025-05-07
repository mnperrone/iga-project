import { createHomeView } from './views/HomeView.js';
import { createCoursesView } from './views/CoursesView.js';
import { createCheckoutView } from './views/CheckoutView.js';
import { createClientPurchasesView } from './views/ClientPurchasesView.js';
import { createAdminView } from './views/AdminView.js';
import { createAdminCoursesView } from './views/AdminCoursesView.js';
import { createAdminPurchasesView } from './views/AdminPurchasesView.js';

const routes = {
  '/': 'HomeView',
  '/courses': 'CoursesView',
  '/checkout': 'CheckoutView',
  '/my-courses': 'ClientPurchasesView',
  '/admin': 'AdminView',
  '/admin/courses': 'AdminCoursesView',
  '/admin/purchases': 'AdminPurchasesView'
};

const viewMap = {
  HomeView: createHomeView,
  CoursesView: createCoursesView,
  CheckoutView: createCheckoutView,
  ClientPurchasesView: createClientPurchasesView,
  AdminView: createAdminView,
  AdminCoursesView: createAdminCoursesView,
  AdminPurchasesView: createAdminPurchasesView
};

export function initRouter() {
  const main = document.getElementById('app');
  
  function navigateTo(path) {
    window.history.pushState({}, '', path);
    renderView();
  }

  function findMatchingRoute(path) {
    // Coincidencia exacta
    if (routes[path]) {
      return routes[path];
    }
    // Ruta más larga que coincida
    const matchingRoute = Object.keys(routes)
      .filter(route => path.startsWith(route))
      .sort((a, b) => b.length - a.length)[0];

    return matchingRoute ? routes[matchingRoute] : 'HomeView';
  }

  async function renderView() {
    const path = window.location.pathname;
    const viewName = findMatchingRoute(path);

    main.innerHTML = '';

    const view = viewMap[viewName];
    if (typeof view === 'function') {
      try {
        const viewElement = await view();
        main.appendChild(viewElement);
      } catch (error) {
        console.error('Error al renderizar la vista:', error);
        main.innerHTML = '<h1>Error al cargar la página</h1>';
      }
    } else {
      main.innerHTML = '<h1>Error 404 - Página no encontrada</h1>';
    }
  }

  window.addEventListener('popstate', renderView);
  renderView();
  window.navigateTo = navigateTo;
}
