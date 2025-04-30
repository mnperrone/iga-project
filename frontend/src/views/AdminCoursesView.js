import { courses } from '../data/courses.js';

export default function AdminCoursesView() {
  const container = document.createElement('div');
  container.className = 'container';

  const header = document.createElement('div');
  header.className = 'header';
  
  const title = document.createElement('h1');
  title.textContent = 'Administración de Cursos';
  title.className = 'page-title';

  const subtitle = document.createElement('p');
  subtitle.textContent = 'Gestiona los cursos disponibles en la plataforma';
  subtitle.className = 'page-subtitle';

  header.appendChild(title);
  header.appendChild(subtitle);

  const tableContainer = document.createElement('div');
  tableContainer.className = 'table-container';

  const table = document.createElement('table');
  table.className = 'courses-table';

  const thead = document.createElement('thead');
  const headerRow = document.createElement('tr');
  const headers = ['ID', 'Título', 'Categoría', 'Duración', 'Nivel', 'Precio', 'Acciones'];
  
  headers.forEach(headerText => {
    const th = document.createElement('th');
    th.textContent = headerText;
    headerRow.appendChild(th);
  });
  
  thead.appendChild(headerRow);
  table.appendChild(thead);

  const tbody = document.createElement('tbody');
  
  courses.forEach(course => {
    const row = document.createElement('tr');
    
    const values = [
      course.id,
      course.title,
      course.category,
      course.duration,
      course.level,
      `$${course.price}`
    ];

    values.forEach(value => {
      const td = document.createElement('td');
      td.textContent = value;
      row.appendChild(td);
    });

    const actionsCell = document.createElement('td');
    actionsCell.innerHTML = `
      <button class="btn-edit" onclick="editCourse(${course.id})">Editar</button>
      <button class="btn-delete" onclick="deleteCourse(${course.id})">Eliminar</button>
    `;
    row.appendChild(actionsCell);
    
    tbody.appendChild(row);
  });

  table.appendChild(tbody);
  tableContainer.appendChild(table);

  const addButton = document.createElement('button');
  addButton.className = 'btn';
  addButton.textContent = 'Agregar Nuevo Curso';
  addButton.onclick = () => {
    // Aquí iría la lógica para agregar un nuevo curso
    console.log('Agregar nuevo curso');
  };

  container.appendChild(header);
  container.appendChild(tableContainer);
  container.appendChild(addButton);

  return container;
} 