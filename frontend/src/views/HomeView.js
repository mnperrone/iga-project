export default function HomeView() {
  const container = document.createElement('div');
  container.className = 'home';

  container.innerHTML = `
    <section class="hero">
      <div class="container">
        <h1>Bienvenido a IGA</h1>
        <p>Tu camino hacia la excelencia culinaria comienza aquí</p>
        <button class="btn" onclick="window.navigateTo('/courses')">Explorar Cursos</button>
      </div>
    </section>

    <section class="features">
      <div class="container">
        <h2>¿Por qué elegirnos?</h2>
        <div class="features-grid">
          <div class="feature-card">
            <img src="https://images.unsplash.com/photo-1556911220-bda9f7f7597e?w=800&q=80" alt="Clases en vivo" class="feature-image">
            <h3>Clases en Vivo</h3>
            <p>Aprende con chefs profesionales en tiempo real</p>
          </div>
          <div class="feature-card">
            <img src="https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=800&q=80" alt="Recetas exclusivas" class="feature-image">
            <h3>Recetas Exclusivas</h3>
            <p>Accede a recetas únicas y técnicas avanzadas</p>
          </div>
          <div class="feature-card">
            <img src="https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=800&q=80" alt="Certificación" class="feature-image">
            <h3>Certificación</h3>
            <p>Obtén certificados reconocidos internacionalmente</p>
          </div>
        </div>
      </div>
    </section>
  `;

  return container;
} 