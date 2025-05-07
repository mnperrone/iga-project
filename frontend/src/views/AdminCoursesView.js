import '../styles/main.css';
import { getCourses } from '../api.js';

const API_URL = import.meta.env.VITE_API_URL;

export async function createAdminCoursesView() {
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
  
  try {
    const courses = await getCourses();
    
    courses.forEach(course => {
      const row = document.createElement('tr');
      
      const values = [
        course.id,
        course.name,
        course.category || 'General',
        course.duration || 'No especificada',
        course.level || 'No especificado',
        `$${course.price}`
      ];

      values.forEach(value => {
        const td = document.createElement('td');
        td.textContent = value;
        row.appendChild(td);
      });

      const actionsCell = document.createElement('td');
      actionsCell.innerHTML = `
        <img src="/images/${course.image}" alt="${course.name}" style="width: 50px; height: 50px; object-fit: cover;">
        <button class="btn-edit" onclick="editCourse(${course.id})">Editar</button>
        <button class="btn-delete" onclick="deleteCourse(${course.id})">Eliminar</button>
      `;
      row.appendChild(actionsCell);
      
      tbody.appendChild(row);
    });
  } catch (error) {
    console.error('Error al cargar los cursos:', error);
    tbody.innerHTML = `
      <tr>
        <td colspan="7" style="text-align: center; padding: 2rem;">
          <p>Error al cargar los cursos. Por favor, intenta de nuevo más tarde.</p>
        </td>
      </tr>
    `;
  }

  table.appendChild(tbody);
  tableContainer.appendChild(table);

  const addButton = document.createElement('button');
  addButton.className = 'btn';
  addButton.textContent = 'Agregar Nuevo Curso';
  addButton.onclick = () => showAddCourseModal();

  container.appendChild(header);
  container.appendChild(tableContainer);
  container.appendChild(addButton);

  // Modal para agregar curso
  const modal = document.createElement('div');
  modal.className = 'modal';
  modal.style.display = 'none';
  modal.innerHTML = `
    <div class="modal-content">
      <div class="modal-header">
        <h2>Agregar Nuevo Curso</h2>
        <button class="close-modal">&times;</button>
      </div>
      <div class="modal-body">
        <form id="add-course-form" class="admin-form">
          <div class="form-group">
            <label for="name">Nombre del Curso</label>
            <input type="text" id="name" name="name" required>
          </div>
          <div class="form-group">
            <label for="description">Descripción</label>
            <textarea id="description" name="description" required></textarea>
          </div>
          <div class="form-group">
            <label for="category">Categoría</label>
            <input type="text" id="category" name="category" required>
          </div>
          <div class="form-group">
            <label for="duration">Duración</label>
            <input type="text" id="duration" name="duration" required>
          </div>
          <div class="form-group">
            <label for="level">Nivel</label>
            <select id="level" name="level" required>
              <option value="Principiante">Principiante</option>
              <option value="Intermedio">Intermedio</option>
              <option value="Avanzado">Avanzado</option>
            </select>
          </div>
          <div class="form-group">
            <label for="price">Precio</label>
            <input type="number" id="price" name="price" min="0" step="0.01" required>
          </div>
          <div class="form-group">
            <label for="image">Imagen del Curso</label>
            <input type="file" id="image" name="image" accept="image/*" required>
            <small class="form-text">Formatos permitidos: JPG, PNG, GIF. Tamaño máximo: 2MB</small>
          </div>
          <div class="form-actions">
            <button type="button" class="btn btn-danger" onclick="closeModal()">Cancelar</button>
            <button type="submit" class="btn">Guardar Curso</button>
          </div>
        </form>
      </div>
    </div>
  `;

  // Agregar estilos CSS para el modal
  const style = document.createElement('style');
  style.textContent = `
    .modal {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1000;
    }

    .modal-content {
      background-color: white;
      border-radius: 8px;
      width: 90%;
      max-width: 600px;
      max-height: 90vh;
      display: flex;
      flex-direction: column;
    }

    .modal-header {
      padding: 1rem;
      border-bottom: 1px solid #eee;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .modal-body {
      padding: 1rem;
      overflow-y: auto;
      max-height: calc(90vh - 70px);
    }

    .close-modal {
      background: none;
      border: none;
      font-size: 1.5rem;
      cursor: pointer;
      padding: 0.5rem;
    }

    .admin-form {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .form-group {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .form-group label {
      font-weight: 500;
    }

    .form-group input,
    .form-group select,
    .form-group textarea {
      padding: 0.5rem;
      border: 1px solid #ddd;
      border-radius: 4px;
    }

    .form-group textarea {
      min-height: 100px;
      resize: vertical;
    }

    .form-actions {
      display: flex;
      justify-content: flex-end;
      gap: 1rem;
      margin-top: 1rem;
    }

    .btn-danger {
      background-color: #dc3545;
      color: white;
    }

    .btn-danger:hover {
      background-color: #c82333;
    }
  `;

  document.head.appendChild(style);
  container.appendChild(modal);

  // Funciones para manejar el modal
  window.showAddCourseModal = () => {
    modal.style.display = 'flex';
  };

  window.closeModal = () => {
    modal.style.display = 'none';
  };

  // Cerrar modal al hacer clic en el botón de cerrar
  modal.querySelector('.close-modal').onclick = closeModal;

  // Cerrar modal al hacer clic fuera del contenido
  modal.onclick = (e) => {
    if (e.target === modal) {
      closeModal();
    }
  };

  // Manejar el envío del formulario
  const form = modal.querySelector('#add-course-form');
  form.onsubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const imageFile = formData.get('image');
    
    // Crear un nombre único para la imagen
    const imageName = `${Date.now()}-${imageFile.name}`;
    
    // Crear el objeto de datos del curso
    const courseData = {
      name: formData.get('name'),
      description: formData.get('description'),
      category: formData.get('category'),
      duration: formData.get('duration'),
      level: formData.get('level'),
      price: parseFloat(formData.get('price')),
      image: `/images/${imageName}`
    };

    try {
      // Primero subir la imagen
      const imageFormData = new FormData();
      imageFormData.append('image', imageFile);
      
      const imageResponse = await fetch(`${API_URL}/api/upload`, {
        method: 'POST',
        body: imageFormData
      });

      if (!imageResponse.ok) {
        throw new Error('Error al subir la imagen');
      }

      // Luego crear el curso
      const response = await fetch(`${API_URL}/api/courses`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(courseData)
      });

      if (!response.ok) {
        throw new Error('Error al crear el curso');
      }

      // Recargar la página para mostrar el nuevo curso
      window.location.reload();
    } catch (error) {
      alert('Error al crear el curso: ' + error.message);
    }
  };

  return container;
} 