import { getCourses } from '../api.js';

export async function createCoursesView() {
  const container = document.createElement('div');
  container.className = 'courses-view';

  const header = document.createElement('div');
  header.className = 'container';
  header.innerHTML = `
    <h1>Nuestros Cursos</h1>
    <p>Descubre nuestra selección de cursos de gastronomía</p>
  `;

  const coursesGrid = document.createElement('div');
  coursesGrid.className = 'courses-grid';

  try {
    const courses = await getCourses();

    courses.forEach(course => {
      const courseCard = document.createElement('div');
      courseCard.className = 'course-card';

      // Ajustar la ruta de la imagen
      const imagePath = `/images/${course.image}`;

      courseCard.innerHTML = `
        <img src="${imagePath}" alt="${course.name}" class="course-image">
        <div class="course-content">
          <span class="course-category">${course.category || 'General'}</span>
          <h3 class="course-title">${course.name}</h3>
          <p class="course-description">${course.description}</p>
          <div class="course-meta">
            <span>${course.duration || 'No especificada'}</span>
            <span>${course.level || 'No especificado'}</span>
          </div>
          <div class="course-price">
            <span class="price">$${parseFloat(course.price).toFixed(2)}</span>
          </div>
          <button class="course-button" onclick="window.navigateTo('/checkout?course=${course.id}')">
            Comprar Curso
          </button>
        </div>
      `;
      coursesGrid.appendChild(courseCard);
    });
  } catch (error) {
    console.error('Error al cargar los cursos:', error);
    coursesGrid.innerHTML = `
      <div class="error-message">
        <p>Lo sentimos, hubo un error al cargar los cursos. Por favor, intenta de nuevo más tarde.</p>
      </div>
    `;
  }

  container.appendChild(header);
  container.appendChild(coursesGrid);

  return container;
} 
