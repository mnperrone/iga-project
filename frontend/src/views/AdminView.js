import '../styles/main.css';

export function createAdminView() {
    const container = document.createElement('div');
    container.className = 'admin-container';

    container.innerHTML = `
        <div class="admin-header">
            <h1>Panel de Administración</h1>
        </div>
        
        <div class="admin-menu">
            <div class="admin-menu-item">
                <h2>Gestión de Cursos</h2>
                <p>Administra los cursos disponibles, sus precios y detalles.</p>
                <a href="/admin/courses" class="admin-button">Ver Cursos</a>
            </div>
            
            <div class="admin-menu-item">
                <h2>Gestión de Compras</h2>
                <p>Visualiza y administra las compras realizadas por los clientes.</p>
                <a href="/admin/purchases" class="admin-button">Ver Compras</a>
            </div>
        </div>
    `;

    return container;
} 