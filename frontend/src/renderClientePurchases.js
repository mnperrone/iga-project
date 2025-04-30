export async function renderClientPurchases(clientId) {
  document.body.innerHTML = `
    <h1>Mis Compras</h1>
    <ul id="purchases-list"></ul>
  `;

  const purchasesList = document.getElementById('purchases-list');

  try {
    const response = await fetch(`http://127.0.0.1:8000/api/purchases/client/${clientId}`);
    const purchases = await response.json();

    purchases.forEach(purchase => {
      const listItem = document.createElement('li');
      listItem.textContent = `Curso: ${purchase.course.name} - Descripción: ${purchase.course.description}`;
      purchasesList.appendChild(listItem);
    });
  } catch (error) {
    console.error('Error fetching purchases:', error);
  }
}