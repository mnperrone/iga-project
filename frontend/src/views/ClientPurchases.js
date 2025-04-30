import { courses } from '../data/courses';
import { createCourseCard } from '../components/CourseCard.js';

export function renderClientPurchases(clientId) {
  const container = document.createElement('div');
  container.className = 'container';

  const header = document.createElement('div');
  header.className = 'header';
  
  const title = document.createElement('h1');
  title.textContent = 'Mis Cursos Comprados';
  title.className = 'page-title';

  const subtitle = document.createElement('p');
  subtitle.textContent = 'Aquí puedes ver todos los cursos que has comprado';
  subtitle.className = 'page-subtitle';

  header.appendChild(title);
  header.appendChild(subtitle);

  const grid = document.createElement('div');
  grid.className = 'course-grid';

  // Simulamos que el cliente ha comprado los primeros 3 cursos
  const purchasedCourses = courses.slice(0, 3);
  
  purchasedCourses.forEach(course => {
    const courseCard = createCourseCard(course);
    const progressBar = document.createElement('div');
    progressBar.className = 'course-progress';
    
    const progress = document.createElement('div');
    progress.className = 'progress-bar';
    progress.style.width = `${Math.floor(Math.random() * 100)}%`;
    
    const progressText = document.createElement('span');
    progressText.className = 'progress-text';
    progressText.textContent = `${Math.floor(Math.random() * 100)}% Completado`;
    
    progressBar.appendChild(progress);
    progressBar.appendChild(progressText);
    courseCard.appendChild(progressBar);
    
    grid.appendChild(courseCard);
  });

  container.appendChild(header);
  container.appendChild(grid);
  document.body.appendChild(container);
} 