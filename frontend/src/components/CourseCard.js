export function createCourseCard(course) {
  const card = document.createElement('div');
  card.className = 'course-card';

  const image = document.createElement('img');
  image.src = `/images/${course.image}`;
  image.alt = course.title;
  image.className = 'course-image';

  const content = document.createElement('div');
  content.className = 'course-content';

  const category = document.createElement('span');
  category.className = 'course-category';
  category.textContent = course.category;

  const title = document.createElement('h3');
  title.className = 'course-title';
  title.textContent = course.title;

  const description = document.createElement('p');
  description.className = 'course-description';
  description.textContent = course.description;

  const meta = document.createElement('div');
  meta.className = 'course-meta';

  const level = document.createElement('span');
  level.className = 'level';
  level.textContent = course.level;

  const duration = document.createElement('span');
  duration.className = 'duration';
  duration.textContent = course.duration;

  const price = document.createElement('span');
  price.className = 'price';
  price.textContent = `$${course.price}`;

  const button = document.createElement('button');
  button.className = 'course-button';
  button.textContent = 'Ver Detalles';
  button.addEventListener('click', () => {
    window.location.href = `/course/${course.id}`;
  });

  // Ensamblar el DOM
  meta.appendChild(level);
  meta.appendChild(duration);

  content.appendChild(category);
  content.appendChild(title);
  content.appendChild(description);
  content.appendChild(meta);
  content.appendChild(price);
  content.appendChild(button);

  card.appendChild(image);
  card.appendChild(content);

  return card;
} 