import { courses } from '../data/courses';

export function renderAdminPurchases() {
  const container = document.createElement('div');
  container.className = 'container';

  const header = document.createElement('div');
  header.className = 'header';
  
  const title = document.createElement('h1');
  title.textContent = 'Panel de Administración';
  title.className = 'page-title';

  const subtitle = document.createElement('p');
  subtitle.textContent = 'Gestiona las compras y el estado de los cursos';
  subtitle.className = 'page-subtitle';

  header.appendChild(title);
  header.appendChild(subtitle);

  const statsContainer = document.createElement('div');
  statsContainer.className = 'stats-container';

  const stats = [
    { label: 'Total de Cursos', value: courses.length },
    { label: 'Total de Ventas', value: '1,234' },
    { label: 'Ingresos Totales', value: '$123,456' },
    { label: 'Estudiantes Activos', value: '890' }
  ];

  stats.forEach(stat => {
    const statCard = document.createElement('div');
    statCard.className = 'stat-card';
    
    const statValue = document.createElement('div');
    statValue.className = 'stat-value';
    statValue.textContent = stat.value;
    
    const statLabel = document.createElement('div');
    statLabel.className = 'stat-label';
    statLabel.textContent = stat.label;
    
    statCard.appendChild(statValue);
    statCard.appendChild(statLabel);
    statsContainer.appendChild(statCard);
  });

  const tableContainer = document.createElement('div');
  tableContainer.className = 'table-container';

  const table = document.createElement('table');
  table.className = 'purchases-table';

  const thead = document.createElement('thead');
  const headerRow = document.createElement('tr');
  const headers = ['ID', 'Curso', 'Cliente', 'Fecha', 'Monto', 'Estado'];
  
  headers.forEach(headerText => {
    const th = document.createElement('th');
    th.textContent = headerText;
    headerRow.appendChild(th);
  });
  
  thead.appendChild(headerRow);
  table.appendChild(thead);

  const tbody = document.createElement('tbody');
  
  // Datos de ejemplo para la tabla
  const purchases = [
    { id: 1, course: 'Desarrollo Web Full Stack', client: 'Juan Pérez', date: '2024-04-29', amount: '$299.99', status: 'Completado' },
    { id: 2, course: 'Machine Learning para Principiantes', client: 'María García', date: '2024-04-28', amount: '$199.99', status: 'En Progreso' },
    { id: 3, course: 'Diseño UX/UI Avanzado', client: 'Carlos Rodríguez', date: '2024-04-27', amount: '$249.99', status: 'Completado' },
    { id: 4, course: 'DevOps y CI/CD', client: 'Ana Martínez', date: '2024-04-26', amount: '$279.99', status: 'Pendiente' },
    { id: 5, course: 'Blockchain y Criptomonedas', client: 'Luis Sánchez', date: '2024-04-25', amount: '$329.99', status: 'Completado' }
  ];

  purchases.forEach(purchase => {
    const row = document.createElement('tr');
    
    Object.values(purchase).forEach(value => {
      const td = document.createElement('td');
      td.textContent = value;
      row.appendChild(td);
    });
    
    tbody.appendChild(row);
  });

  table.appendChild(tbody);
  tableContainer.appendChild(table);

  container.appendChild(header);
  container.appendChild(statsContainer);
  container.appendChild(tableContainer);
  document.body.appendChild(container);
} 