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

  // Estilos
  const style = document.createElement('style');
  style.textContent = `
    .admin-purchases-view {
      padding: 2rem;
    }

    .container {
      max-width: 1200px;
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

  // Cargar las compras cuando se monte la vista
  loadPurchases();

  async function loadPurchases() {
    try {
      const response = await fetch('http://localhost:8000/api/purchases');
      if (!response.ok) {
        throw new Error('Error al cargar las compras');
      }

      const purchases = await response.json();
      const tbody = container.querySelector('#purchases-tbody');
      
      tbody.innerHTML = purchases.map(purchase => `
        <tr>
          <td>${purchase.id}</td>
          <td>${purchase.course ? purchase.course.title : 'N/A'}</td>
          <td>${purchase.customer_name}</td>
          <td>${purchase.customer_email}</td>
          <td>${purchase.customer_phone}</td>
          <td>$${purchase.amount}</td>
          <td>${new Date(purchase.created_at).toLocaleDateString()}</td>
        </tr>
      `).join('');

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