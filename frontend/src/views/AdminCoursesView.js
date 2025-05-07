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
        <button class="btn-edit" data-course-id="${course.id}">Editar</button>
        <button class="btn-delete" data-course-id="${course.id}">Eliminar</button>
      `;

      // Agregar event listeners a los botones
      const editButton = actionsCell.querySelector('.btn-edit');
      const deleteButton = actionsCell.querySelector('.btn-delete');

      editButton.addEventListener('click', () => editCourse(course));
      deleteButton.addEventListener('click', () => handleDeleteClick(course.id));

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
            <label for="description">Descripción del Curso</label>
            <textarea id="description" name="description" required placeholder="Describe el curso, incluyendo qué aprenderá el estudiante y qué incluye el curso..."></textarea>
          </div>
          <div class="form-group">
            <label for="category">Categoría</label>
            <input type="text" id="category" name="category">
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

  // Modal de confirmación para eliminar
  const confirmModal = document.createElement('div');
  confirmModal.className = 'modal';
  confirmModal.style.display = 'none';
  confirmModal.innerHTML = `
    <div class="modal-content">
      <div class="modal-header">
        <h2>Confirmar Eliminación</h2>
        <button class="close-modal">&times;</button>
      </div>
      <div class="modal-body">
        <p>¿Estás seguro de que deseas eliminar este curso? Esta acción no se puede deshacer.</p>
        <div class="form-actions">
          <button type="button" class="btn btn-danger" id="cancel-delete">Cancelar</button>
          <button type="button" class="btn" id="confirm-delete">Eliminar</button>
        </div>
      </div>
    </div>
  `;

  container.appendChild(confirmModal);

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
    
    // Primero subir la imagen
    const imageFormData = new FormData();
    imageFormData.append('image', imageFile);
    
    const imageResponse = await fetch(`${API_URL}/api/upload`, {
      method: 'POST',
      credentials: 'include',
      body: imageFormData
    });

    if (!imageResponse.ok) {
      throw new Error('Error al subir la imagen');
    }

    const imageData = await imageResponse.json();
    
    // Crear el objeto de datos del curso
    const courseData = {
      name: formData.get('name'),
      description: formData.get('description'),
      price: parseFloat(formData.get('price')),
      image: imageData.filename,
      category: formData.get('category') || null,
      duration: formData.get('duration') || null,
      level: formData.get('level') || null
    };

    try {
      // Luego crear el curso
      const response = await fetch(`${API_URL}/api/courses`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(courseData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al crear el curso');
      }

      // Recargar la página para mostrar el nuevo curso
      window.location.reload();
    } catch (error) {
      alert('Error al crear el curso: ' + error.message);
    }
  };

  // Funciones para editar y eliminar cursos
  async function editCourse(course) {
    // Llenar el formulario con los datos del curso
    const form = modal.querySelector('#add-course-form');
    form.querySelector('#name').value = course.name;
    form.querySelector('#description').value = course.description;
    form.querySelector('#category').value = course.category || '';
    form.querySelector('#duration').value = course.duration || '';
    form.querySelector('#level').value = course.level || 'Principiante';
    form.querySelector('#price').value = course.price;
    
    // El campo de imagen lo dejamos vacío ya que es un archivo
    form.querySelector('#image').required = false;

    // Modificar el comportamiento del formulario para actualizar en lugar de crear
    form.onsubmit = async (e) => {
      e.preventDefault();

      const formData = new FormData(form);
      const courseData = {
        name: formData.get('name'),
        description: formData.get('description'),
        price: parseFloat(formData.get('price')),
        category: formData.get('category') || null,
        duration: formData.get('duration') || null,
        level: formData.get('level') || null
      };

      // Si se seleccionó una nueva imagen, subirla primero
      if (formData.get('image').size > 0) {
        const imageFile = formData.get('image');
        const imageFormData = new FormData();
        imageFormData.append('image', imageFile);
        
        try {
          const imageResponse = await fetch(`${API_URL}/api/upload`, {
            method: 'POST',
            credentials: 'include',
            body: imageFormData
          });

          if (!imageResponse.ok) {
            throw new Error('Error al subir la imagen');
          }

          const imageData = await imageResponse.json();
          courseData.image = imageData.filename;
        } catch (error) {
          alert('Error al subir la imagen: ' + error.message);
          return;
        }
      }

      try {
        const response = await fetch(`${API_URL}/api/courses/${course.id}`, {
          method: 'PUT',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(courseData)
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Error al actualizar el curso');
        }

        window.location.reload();
      } catch (error) {
        alert('Error al actualizar el curso: ' + error.message);
      }
    };

    // Mostrar el modal
    modal.style.display = 'flex';
  }

  // Funciones para manejar el modal de confirmación
  window.showConfirmModal = (courseId) => {
    confirmModal.style.display = 'flex';
    
    // Configurar los botones
    const cancelButton = confirmModal.querySelector('#cancel-delete');
    const confirmButton = confirmModal.querySelector('#confirm-delete');
    const closeButton = confirmModal.querySelector('.close-modal');

    // Limpiar event listeners previos
    const newCancelButton = cancelButton.cloneNode(true);
    const newConfirmButton = confirmButton.cloneNode(true);
    const newCloseButton = closeButton.cloneNode(true);
    
    cancelButton.parentNode.replaceChild(newCancelButton, cancelButton);
    confirmButton.parentNode.replaceChild(newConfirmButton, confirmButton);
    closeButton.parentNode.replaceChild(newCloseButton, closeButton);

    // Agregar nuevos event listeners
    newCancelButton.onclick = () => {
      confirmModal.style.display = 'none';
    };

    newConfirmButton.onclick = async () => {
      confirmModal.style.display = 'none';
      await deleteCourse(courseId);
    };

    newCloseButton.onclick = () => {
      confirmModal.style.display = 'none';
    };
  };

  // Cerrar modal al hacer clic fuera del contenido
  confirmModal.onclick = (e) => {
    if (e.target === confirmModal) {
      confirmModal.style.display = 'none';
    }
  };

  async function deleteCourse(courseId) {
    try {
      const response = await fetch(`${API_URL}/api/courses/${courseId}`, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
          'Accept': 'application/json'
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al eliminar el curso');
      }

      // Recargar la página para mostrar los cambios
      window.location.reload();
    } catch (error) {
      alert('Error al eliminar el curso: ' + error.message);
    }
  }

  // Modificar la función que se llama al hacer clic en el botón de eliminar
  async function handleDeleteClick(courseId) {
    window.showConfirmModal(courseId);
  }

  return container;
} 