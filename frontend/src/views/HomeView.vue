<template>
  <div class="home">
    <section class="hero">
      <div class="container">
        <h1>Bienvenido a IGA</h1>
        <p>Tu camino hacia la excelencia culinaria comienza aquí</p>
        <router-link to="/courses" class="btn">Explorar Cursos</router-link>
      </div>
    </section>

    <section class="features">
      <div class="container">
        <h2>¿Por qué elegirnos?</h2>
        <div class="features-grid">
          <div class="feature-card">
            <img src="/images/live-classes.jpg" alt="Clases en vivo" class="feature-image">
            <h3>Clases en Vivo</h3>
            <p>Aprende con chefs profesionales en tiempo real</p>
          </div>
          <div class="feature-card">
            <img src="/images/recipes.jpg" alt="Recetas exclusivas" class="feature-image">
            <h3>Recetas Exclusivas</h3>
            <p>Accede a recetas únicas y técnicas avanzadas</p>
          </div>
          <div class="feature-card">
            <img src="/images/certification.jpg" alt="Certificación" class="feature-image">
            <h3>Certificación</h3>
            <p>Obtén certificados reconocidos internacionalmente</p>
          </div>
        </div>
      </div>
    </section>

    <section class="specialties">
      <h2>Nuestras Especialidades</h2>
      <div class="specialties-grid">
        <div class="specialty">
          <img src="/images/pastry.jpg" alt="Pastelería">
          <h3>Pastelería</h3>
          <p>Dulces y postres de nivel profesional</p>
        </div>
        <div class="specialty">
          <img src="/images/cuisine.jpg" alt="Cocina Internacional">
          <h3>Cocina Internacional</h3>
          <p>Técnicas de diferentes culturas</p>
        </div>
        <div class="specialty">
          <img src="/images/wine.jpg" alt="Maridaje">
          <h3>Maridaje</h3>
          <p>Arte de combinar comida y vinos</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'HomeView'
}
</script>

<style scoped>
.home {
  min-height: 100vh;
}

.hero {
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/images/hero-bg.jpg');
  background-size: cover;
  background-position: center;
  color: white;
  text-align: center;
  padding: 8rem 0;
}

.hero h1 {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.hero p {
  font-size: 1.5rem;
  margin-bottom: 2rem;
}

.features {
  padding: 4rem 0;
  background-color: var(--light-gray);
}

.features h2 {
  text-align: center;
  margin-bottom: 3rem;
  color: var(--secondary-color);
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.feature-card {
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  transition: transform 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-5px);
}

.feature-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.feature-card h3 {
  padding: 1.5rem 1.5rem 0.5rem;
  color: var(--secondary-color);
}

.feature-card p {
  padding: 0 1.5rem 1.5rem;
  color: #666;
}

@media (max-width: 768px) {
  .hero {
    padding: 4rem 0;
  }

  .hero h1 {
    font-size: 2rem;
  }

  .hero p {
    font-size: 1.2rem;
  }

  .features-grid {
    grid-template-columns: 1fr;
  }
}

.specialties {
  padding: 2rem;
  background-color: #f8f9fa;
}

.specialties h2 {
  color: #2c3e50;
  margin-bottom: 2rem;
}

.specialties-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.specialty {
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.specialty img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.specialty h3 {
  color: #2c3e50;
  margin: 1rem 0;
}

.specialty p {
  color: #666;
  padding: 0 1rem 1rem;
}
</style> 