import { courses } from '../data/courses.js';

export default function CheckoutView() {
  const container = document.createElement('div');
  container.className = 'checkout-view';

  const params = new URLSearchParams(window.location.search);
  const courseId = params.get('course');
  const course = courses.find(c => c.id === courseId);

  if (!course) {
    container.innerHTML = '<h1>Curso no encontrado</h1>';
    return container;
  }

  container.innerHTML = `
    <div class="container">
      <h1>Finalizar Compra</h1>
      
      <div class="checkout-grid">
        <div class="course-summary">
          <h2>Resumen del Curso</h2>
          <div class="course-card">
            <img src="${course.image}" alt="${course.title}" class="course-image">
            <div class="course-content">
              <h3>${course.title}</h3>
              <p>${course.description}</p>
              <div class="course-meta">
                <span>${course.duration}</span>
                <span>${course.level}</span>
              </div>
              <div class="course-price">$${course.price}</div>
            </div>
          </div>
        </div>

        <form id="checkout-form" class="checkout-form">
          <h2>Información de Pago</h2>
          
          <div class="form-group">
            <label for="name">Nombre completo</label>
            <input type="text" id="name" name="name" required>
          </div>

          <div class="form-group">
            <label for="email">Correo electrónico</label>
            <input type="email" id="email" name="email" required>
          </div>

          <div class="form-group">
            <label for="card">Número de tarjeta</label>
            <input type="text" id="card" name="card" required>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="expiry">Fecha de vencimiento</label>
              <input type="text" id="expiry" name="expiry" placeholder="MM/AA" required>
            </div>

            <div class="form-group">
              <label for="cvv">CVV</label>
              <input type="text" id="cvv" name="cvv" required>
            </div>
          </div>

          <button type="submit" class="btn">Confirmar Compra</button>
        </form>
      </div>
    </div>
  `;

  const form = container.querySelector('#checkout-form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    // Aquí iría la lógica de procesamiento del pago
    window.navigateTo('/my-courses');
  });

  return container;
} 