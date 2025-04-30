<script>
export default {
  name: 'App'
}
</script>

<template>
  <div class="app">
    <header class="header">
      <h1>Escuela de Cocina</h1>
      <nav>
        <router-link to="/" class="nav-link">Inicio</router-link>
        <router-link to="/courses" class="nav-link">Cursos</router-link>
      </nav>
    </header>

    <main class="main-content">
      <router-view></router-view>
    </main>

    <footer class="footer">
      <p>&copy; 2024 Escuela de Cocina. Todos los derechos reservados.</p>
    </footer>
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Arial', sans-serif;
  line-height: 1.6;
  color: #2c3e50;
  background-color: #f5f5f5;
}

.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.header {
  background-color: #42b983;
  color: white;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-link {
  color: white;
  text-decoration: none;
  margin-left: 1rem;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.nav-link:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.main-content {
  flex: 1;
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}

.footer {
  background-color: #2c3e50;
  color: white;
  text-align: center;
  padding: 1rem;
  margin-top: auto;
}
</style>
