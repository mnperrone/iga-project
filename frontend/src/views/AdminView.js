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

    // Estilos
    const style = document.createElement('style');
    style.textContent = `
        .admin-container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 2rem;
        }

        .admin-header {
            text-align: center;
            margin-bottom: 3rem;
        }

        .admin-header h1 {
            color: #2c3e50;
            font-size: 2.5rem;
            margin-bottom: 1rem;
        }

        .admin-menu {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 2rem;
            padding: 1rem;
        }

        .admin-menu-item {
            background: white;
            border-radius: 8px;
            padding: 2rem;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            transition: transform 0.2s;
        }

        .admin-menu-item:hover {
            transform: translateY(-5px);
        }

        .admin-menu-item h2 {
            color: #2c3e50;
            margin-bottom: 1rem;
            font-size: 1.5rem;
        }

        .admin-menu-item p {
            color: #666;
            margin-bottom: 1.5rem;
            line-height: 1.5;
        }

        .admin-button {
            display: inline-block;
            background: #3498db;
            color: white;
            padding: 0.8rem 1.5rem;
            border-radius: 4px;
            text-decoration: none;
            transition: background 0.2s;
        }

        .admin-button:hover {
            background: #2980b9;
        }
    `;

    container.appendChild(style);
    return container;
} 