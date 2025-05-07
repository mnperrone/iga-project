import '../styles/main.css';
import { apiClient } from '../api';

export function createAdminPurchasesView() {
  const container = document.createElement('div');
  container.className = 'admin-purchases-view';

  container.innerHTML = `
    <div class="container">
      <h1>Administración de Compras</h1>
      <div class="purchases-list">
        <table class="purchases-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Curso</th>
              <th>Cliente</th>
              <th>Email</th>
              <th>Teléfono</th>
              <th>Monto</th>
              <th>Fecha</th>
            </tr>
          </thead>
          <tbody id="purchases-tbody">
            <tr>
              <td colspan="7">Cargando compras...</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `;

  // Cargar las compras cuando se monte la vista
  loadPurchases();

  async function loadPurchases() {
    try {
      const response = await apiClient.get('/purchases');
      const purchases = response.data.data;
      const tbody = container.querySelector('#purchases-tbody');
      
      if (Array.isArray(purchases)) {
        tbody.innerHTML = purchases.map(purchase => `
          <tr>
            <td>${purchase.id}</td>
            <td>${purchase.course ? purchase.course.name : 'N/A'}</td>
            <td>${purchase.customer_name}</td>
            <td>${purchase.customer_email}</td>
            <td>${purchase.customer_phone}</td>
            <td>$${purchase.amount}</td>
            <td>${new Date(purchase.created_at).toLocaleDateString()}</td>
          </tr>
        `).join('');
      } else {
        tbody.innerHTML = `
          <tr>
            <td colspan="7">No hay compras registradas.</td>
          </tr>
        `;
      }

    } catch (error) {
      console.error('Error:', error);
      container.querySelector('#purchases-tbody').innerHTML = `
        <tr>
          <td colspan="7">Error al cargar las compras: ${error.message}</td>
        </tr>
      `;
    }
  }

  return container;
} 