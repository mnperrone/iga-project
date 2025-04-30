export async function renderAdminPurchases() {
  document.body.innerHTML = `
    <h1>Compras por Curso</h1>
    <ul id="admin-purchases-list"></ul>
  `;

  const purchasesList = document.getElementById('admin-purchases-list');

  try {
    const response = await fetch('http://127.0.0.1:8000/api/purchases/admin');
    const purchases = await response.json();

    purchases.forEach(purchase => {
      const listItem = document.createElement('li');
      listItem.textContent = `Curso ID: ${purchase.course_id} - Total Compras: ${purchase.total}`;
      purchasesList.appendChild(listItem);
    });
  } catch (error) {
    console.error('Error fetching admin purchases:', error);
  }
}