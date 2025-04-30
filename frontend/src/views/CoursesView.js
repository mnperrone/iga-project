import { courses } from '../data/courses.js';

export default function CoursesView() {
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

  courses.forEach(course => {
    const courseCard = document.createElement('div');
    courseCard.className = 'course-card';
    courseCard.innerHTML = `
      <img src="${course.image}" alt="${course.title}" class="course-image">
      <div class="course-content">
        <span class="course-category">${course.category}</span>
        <h3 class="course-title">${course.title}</h3>
        <p class="course-description">${course.description}</p>
        <div class="course-meta">
          <span>${course.duration}</span>
          <span>${course.level}</span>
        </div>
        <button class="course-button" onclick="window.navigateTo('/checkout?course=${course.id}')">
          Comprar Curso
        </button>
      </div>
    `;
    coursesGrid.appendChild(courseCard);
  });

  container.appendChild(header);
  container.appendChild(coursesGrid);

  return container;
} 