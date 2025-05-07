import '../styles/main.css';
import { getCourses } from '../api.js';

export async function createCheckoutView() {
  const container = document.createElement('div');
  container.className = 'checkout-view';

  const params = new URLSearchParams(window.location.search);
  const courseId = parseInt(params.get('course'), 10);
  
  try {
    const courses = await getCourses();
    const course = courses.find(c => c.id === courseId);

    if (!course) {
      container.innerHTML = `
        <div class="container" style="text-align: center; padding: 2rem;">
          <h1>Curso no encontrado</h1>
          <p>El curso que buscas no existe o ha sido removido.</p>
          <button onclick="window.navigateTo('/courses')" class="btn" style="margin-top: 1rem;">
            Volver a los cursos
          </button>
        </div>
      `;
      return container;
    }

    container.innerHTML = `
      <div class="container">
        <h1>Finalizar Compra</h1>
        
        <div class="checkout-grid">
          <div class="course-summary">
            <h2>Resumen del Curso</h2>
            <div class="course-card">
              <img src="/images/${course.image}" alt="${course.name}" class="course-image" onerror="this.onerror=null;this.src='/images/default.jpg';">
              <div class="course-content">
                <h3>${course.name}</h3>
                <p>${course.description}</p>
                <div class="course-meta">
                  <span>${course.duration || 'No especificada'}</span>
                  <span>${course.level || 'No especificado'}</span>
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
              <label for="phone">Teléfono</label>
              <input type="tel" id="phone" name="phone" required pattern="[0-9]{10}" placeholder="Ej: 1234567890">
              <small class="form-text">Ingresa tu número de teléfono sin espacios ni guiones</small>
            </div>

            <div class="form-group">
              <label for="card">Número de tarjeta</label>
              <input type="text" 
                     id="card" 
                     name="card" 
                     required 
                     pattern="[0-9]{4} [0-9]{4} [0-9]{4} [0-9]{4}"
                     maxlength="19"
                     placeholder="1234 5678 9012 3456"
                     oninput="this.value = this.value.replace(/[^0-9]/g, '').replace(/(.{4})/g, '$1 ').trim()"
                     onkeypress="return event.charCode >= 48 && event.charCode <= 57">
              <small class="form-text">Ingresa los 16 dígitos de tu tarjeta</small>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label for="expiry">Fecha de vencimiento</label>
                <input type="text" 
                       id="expiry" 
                       name="expiry" 
                       placeholder="MM/AA" 
                       required
                       maxlength="5"
                       oninput="this.value = this.value.replace(/[^0-9]/g, '').replace(/(.{2})/, '$1/')"
                       onkeypress="return event.charCode >= 48 && event.charCode <= 57">
                <small class="form-text">Formato: MM/AA</small>
              </div>

              <div class="form-group">
                <label for="cvv">CVV</label>
                <input type="text" 
                       id="cvv" 
                       name="cvv" 
                       required
                       maxlength="3"
                       pattern="[0-9]{3}"
                       oninput="this.value = this.value.replace(/[^0-9]/g, '')"
                       onkeypress="return event.charCode >= 48 && event.charCode <= 57">
                <small class="form-text">3 dígitos de seguridad</small>
              </div>
            </div>

            <button type="submit" class="btn">Confirmar Compra</button>
          </form>
        </div>
      </div>
    `;

    const form = container.querySelector('#checkout-form');
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      // Validar número de tarjeta
      const cardNumber = form.querySelector('#card').value.replace(/\s/g, '');
      if (cardNumber.length !== 16) {
        alert('El número de tarjeta debe tener 16 dígitos');
        return;
      }

      // Validar formato de tarjeta (4 grupos de 4 dígitos)
      const cardInput = form.querySelector('#card').value;
      if (!/^\d{4} \d{4} \d{4} \d{4}$/.test(cardInput)) {
        alert('El número de tarjeta debe tener el formato: XXXX XXXX XXXX XXXX');
        return;
      }

      // Validar formato de fecha MM/AA
      const expiry = form.querySelector('#expiry').value;
      if (!/^\d{2}\/\d{2}$/.test(expiry)) {
        alert('La fecha de vencimiento debe tener el formato MM/AA');
        return;
      }

      // Validar longitud del CVV
      const cvv = form.querySelector('#cvv').value;
      if (cvv.length !== 3) {
        alert('El CVV debe tener 3 dígitos');
        return;
      }
      
      const formData = new FormData(form);
      const purchaseData = {
        course_id: courseId,
        customer_name: formData.get('name'),
        customer_email: formData.get('email'),
        customer_phone: formData.get('phone'),
        amount: course.price
      };

      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/purchases`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(purchaseData)
        });

        if (!response.ok) {
          throw new Error('Error al procesar la compra');
        }

        // Guardar el email del cliente para futuras referencias
        localStorage.setItem('user_email', purchaseData.customer_email);
        
        // Redirigir a mis cursos
        window.navigateTo('/my-courses');
      } catch (error) {
        console.error('Error:', error);
        alert('Error al procesar la compra. Por favor, intenta de nuevo.');
      }
    });

  } catch (error) {
    console.error('Error al cargar el curso:', error);
    container.innerHTML = `
      <div class="container" style="text-align: center; padding: 2rem;">
        <h1>Error</h1>
        <p>Lo sentimos, hubo un error al cargar el curso. Por favor, intenta de nuevo más tarde.</p>
        <button onclick="window.navigateTo('/courses')" class="btn" style="margin-top: 1rem;">
          Volver a los cursos
        </button>
      </div>
    `;
  }

  return container;
} 