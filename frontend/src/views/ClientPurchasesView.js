import { courses } from '../data/courses.js';

// Simulación de datos de compras (en un caso real, esto vendría de una API)
const clientPurchases = [
  {
    id: 1,
    courseId: 1,
    purchaseDate: '2024-04-29',
    progress: 75
  },
  {
    id: 2,
    courseId: 2,
    purchaseDate: '2024-04-28',
    progress: 30
  }
];

export default function ClientPurchasesView() {
  const container = document.createElement('div');
  container.className = 'client-purchases-view';

  container.innerHTML = `
    <div class="container">
      <h1>Mis Cursos</h1>
      
      <div class="purchases-grid">
        ${clientPurchases.map(purchase => {
          const course = courses.find(c => c.id === purchase.courseId);
          return `
            <div class="course-card">
              <img src="${course.image}" alt="${course.title}" class="course-image">
              <div class="course-content">
                <h3 class="course-title">${course.title}</h3>
                <p class="course-description">${course.description}</p>
                <div class="course-progress">
                  <div class="progress-bar" style="width: ${purchase.progress}%"></div>
                  <span class="progress-text">Progreso: ${purchase.progress}%</span>
                </div>
                <button class="course-button" onclick="window.navigateTo('/courses/${course.id}')">
                  Continuar Curso
                </button>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `;

  return container;
} 