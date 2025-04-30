<template>
  <div class="admin-courses">
    <div class="container">
      <h1>Gestión de Cursos</h1>
      
      <div class="stats-container">
        <div class="stat-card">
          <div class="stat-value">{{ totalCourses }}</div>
          <div class="stat-label">Total de Cursos</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">{{ totalSales }}</div>
          <div class="stat-label">Ventas Totales</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">{{ totalRevenue }}</div>
          <div class="stat-label">Ingresos Totales</div>
        </div>
      </div>

      <div class="table-container">
        <table class="purchases-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Curso</th>
              <th>Cliente</th>
              <th>Fecha de Compra</th>
              <th>Precio</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="purchase in purchases" :key="purchase.id">
              <td>{{ purchase.id }}</td>
              <td>{{ purchase.course.title }}</td>
              <td>{{ purchase.client.name }}</td>
              <td>{{ formatDate(purchase.purchaseDate) }}</td>
              <td>${{ purchase.price }}</td>
              <td>
                <span :class="['status-badge', purchase.status]">
                  {{ purchase.status }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdminCourses',
  data() {
    return {
      purchases: [
        {
          id: 1,
          course: { title: 'Pastelería Profesional' },
          client: { name: 'Juan Pérez' },
          purchaseDate: '2024-04-29',
          price: 299.99,
          status: 'completado'
        },
        {
          id: 2,
          course: { title: 'Cocina Internacional' },
          client: { name: 'María García' },
          purchaseDate: '2024-04-28',
          price: 399.99,
          status: 'pendiente'
        }
      ]
    }
  },
  computed: {
    totalCourses() {
      return this.purchases.length
    },
    totalSales() {
      return this.purchases.length
    },
    totalRevenue() {
      return this.purchases.reduce((total, purchase) => total + purchase.price, 0).toFixed(2)
    }
  },
  methods: {
    formatDate(date) {
      return new Date(date).toLocaleDateString('es-ES')
    }
  }
}
</script>

<style scoped>
.admin-courses {
  padding: 2rem 0;
}

.status-badge {
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  font-size: 0.875rem;
  font-weight: 500;
}

.status-badge.completado {
  background-color: #10b981;
  color: white;
}

.status-badge.pendiente {
  background-color: #f59e0b;
  color: white;
}
</style> 