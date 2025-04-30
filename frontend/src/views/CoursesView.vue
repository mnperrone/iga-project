<template>
  <div class="courses">
    <h1>Cursos de Gastronomía IGA</h1>
    
    <div class="filters">
      <select v-model="selectedCategory" class="filter-select">
        <option value="">Todas las categorías</option>
        <option value="basico">Básico</option>
        <option value="intermedio">Intermedio</option>
        <option value="avanzado">Avanzado</option>
      </select>
    </div>

    <div class="courses-grid">
      <div v-for="course in filteredCourses" :key="course.id" class="course-card">
        <img :src="course.image" :alt="course.title">
        <div class="course-info">
          <h3>{{ course.title }}</h3>
          <p>{{ course.description }}</p>
          <div class="course-meta">
            <span class="level">{{ course.level }}</span>
            <span class="duration">{{ course.duration }}</span>
          </div>
          <div class="course-price">
            <span class="price">${{ course.price }}</span>
            <router-link :to="'/course/' + course.id" class="course-button">
              Ver Detalles
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CoursesView',
  data() {
    return {
      selectedCategory: '',
      courses: [
        {
          id: 1,
          title: 'Fundamentos de Cocina Profesional',
          description: 'Aprende las técnicas básicas de cocina y preparación de alimentos con los mejores chefs de IGA.',
          level: 'Básico',
          duration: '4 semanas',
          category: 'basico',
          price: 29999,
          image: '/images/course1.jpg'
        },
        {
          id: 2,
          title: 'Cocina Internacional',
          description: 'Explora diferentes cocinas del mundo y sus técnicas tradicionales. Incluye recetas de Asia, Europa y América.',
          level: 'Intermedio',
          duration: '6 semanas',
          category: 'intermedio',
          price: 39999,
          image: '/images/course2.jpg'
        },
        {
          id: 3,
          title: 'Alta Cocina y Presentación',
          description: 'Técnicas avanzadas y presentación profesional de platos. Ideal para chefs que buscan perfeccionar su arte.',
          level: 'Avanzado',
          duration: '8 semanas',
          category: 'avanzado',
          price: 49999,
          image: '/images/course3.jpg'
        },
        {
          id: 4,
          title: 'Pastelería y Repostería',
          description: 'Aprende a crear postres y pasteles de nivel profesional con técnicas francesas e italianas.',
          level: 'Intermedio',
          duration: '6 semanas',
          category: 'intermedio',
          price: 34999,
          image: '/images/course4.jpg'
        },
        {
          id: 5,
          title: 'Maridaje y Sommelier',
          description: 'Domina el arte de combinar comida y vinos. Incluye catas y técnicas de servicio.',
          level: 'Avanzado',
          duration: '4 semanas',
          category: 'avanzado',
          price: 44999,
          image: '/images/course5.jpg'
        }
      ]
    }
  },
  computed: {
    filteredCourses() {
      if (!this.selectedCategory) return this.courses;
      return this.courses.filter(course => course.category === this.selectedCategory);
    }
  }
}
</script>

<style scoped>
.courses {
  padding: 2rem;
}

h1 {
  text-align: center;
  margin-bottom: 2rem;
  color: #2c3e50;
}

.filters {
  margin-bottom: 2rem;
  text-align: center;
}

.filter-select {
  padding: 0.5rem 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

.courses-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.course-card {
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
}

.course-card:hover {
  transform: translateY(-5px);
}

.course-card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.course-info {
  padding: 1.5rem;
}

.course-info h3 {
  margin: 0 0 1rem 0;
  color: #2c3e50;
}

.course-meta {
  display: flex;
  justify-content: space-between;
  margin: 1rem 0;
  color: #666;
}

.course-price {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
}

.price {
  font-size: 1.25rem;
  font-weight: bold;
  color: #e74c3c;
}

.course-button {
  display: inline-block;
  background-color: #2c3e50;
  color: white;
  text-align: center;
  padding: 0.8rem 1.5rem;
  border-radius: 4px;
  text-decoration: none;
  transition: background-color 0.2s;
}

.course-button:hover {
  background-color: #34495e;
}
</style> 