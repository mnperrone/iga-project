import { courses } from '../data/courses';
import { createCourseCard } from '../components/CourseCard.js';

const API_URL = import.meta.env.VITE_API_URL;

export function createClientPurchasesView() {
  const container = document.createElement('div');
  container.className = 'client-purchases-view';

  container.innerHTML = `
    <div class="container">
      <h1>Mis Compras</h1>
      <div class="purchases-list">
        <table class="purchases-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Curso</th>
              <th>Monto</th>
              <th>Fecha</th>
            </tr>
          </thead>
          <tbody id="client-purchases-tbody">
            <tr>
              <td colspan="4">Cargando compras...</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `;

  // Estilos (puedes copiar los de admin si quieres unificar)
  const style = document.createElement('style');
  style.textContent = `
    .client-purchases-view {
      padding: 2rem;
    }
    .container {
      max-width: 900px;
      margin: 0 auto;
    }
    h1 {
      color: #2c3e50;
      margin-bottom: 2rem;
    }
    .purchases-table {
      width: 100%;
      border-collapse: collapse;
      background: white;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    }
    .purchases-table th,
    .purchases-table td {
      padding: 1rem;
      text-align: left;
      border-bottom: 1px solid #eee;
    }
    .purchases-table th {
      background: #f8f9fa;
      font-weight: 600;
      color: #2c3e50;
    }
    .purchases-table tr:hover {
      background: #f8f9fa;
    }
  `;
  container.appendChild(style);

  // Cargar las compras del cliente al montar la vista
  loadClientPurchases();

  async function loadClientPurchases() {
    try {
      // Aquí deberías obtener el email del usuario autenticado o de algún input
      const email = localStorage.getItem('user_email'); // o como manejes el login
      if (!email) {
        showError('No se encontró el email del usuario.');
        return;
      }

      const response = await fetch(`${API_URL}/api/purchases/customer/${encodeURIComponent(email)}`);
      if (!response.ok) {
        throw new Error('Error al cargar tus compras');
      }

      const json = await response.json();
      const purchases = json.data || json; // por compatibilidad
      const tbody = container.querySelector('#client-purchases-tbody');

      if (Array.isArray(purchases) && purchases.length > 0) {
        tbody.innerHTML = purchases.map(purchase => `
          <tr>
            <td>${purchase.id}</td>
            <td>${purchase.course ? purchase.course.title : 'N/A'}</td>
            <td>$${purchase.amount}</td>
            <td>${new Date(purchase.created_at).toLocaleDateString()}</td>
          </tr>
        `).join('');
      } else {
        tbody.innerHTML = `
          <tr>
            <td colspan="4">No tienes compras registradas.</td>
          </tr>
        `;
      }
    } catch (error) {
      showError(error.message);
    }
  }

  function showError(message) {
    container.querySelector('#client-purchases-tbody').innerHTML = `
      <tr>
        <td colspan="4">Error: ${message}</td>
      </tr>
    `;
  }

  return container;
} 