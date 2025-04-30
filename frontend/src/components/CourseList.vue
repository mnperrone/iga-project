<template>
  <div class="course-list">
    <h1>Cursos Gastronómicos IGA</h1>
    <div class="courses-grid">
      <div v-for="course in courses" :key="course.id" class="course-card">
        <img :src="course.image" :alt="course.name" class="course-image">
        <div class="course-content">
          <h2>{{ course.name }}</h2>
          <p class="description">{{ course.description }}</p>
          <p class="price">${{ course.price }}</p>
          <button @click="selectCourse(course)" class="buy-button">Comprar Curso</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import axios from 'axios'

export default {
  name: 'CourseList',
  emits: ['select-course'],
  setup(props, { emit }) {
    const courses = ref([])

    const fetchCourses = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/courses')
        courses.value = response.data
      } catch (error) {
        console.error('Error fetching courses:', error)
      }
    }

    const selectCourse = (course) => {
      emit('select-course', course)
    }

    onMounted(fetchCourses)

    return {
      courses,
      selectCourse
    }
  }
}
</script>

<style scoped>
.course-list {
  padding: 2rem;
}

.courses-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.course-card {
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
}

.course-card:hover {
  transform: translateY(-4px);
}

.course-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.course-content {
  padding: 1.5rem;
}

h2 {
  margin: 0 0 1rem;
  color: #2c3e50;
}

.description {
  color: #666;
  margin-bottom: 1rem;
}

.price {
  font-size: 1.25rem;
  font-weight: bold;
  color: #42b983;
  margin-bottom: 1rem;
}

.buy-button {
  width: 100%;
  padding: 0.75rem;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.buy-button:hover {
  background-color: #3aa876;
}
</style> 