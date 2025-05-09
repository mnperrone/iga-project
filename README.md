# IGA Project - Plataforma de Cursos de Cocina

## Descripción
IGA Project es una plataforma web moderna diseñada para una escuela de cocina que ofrece una experiencia completa para estudiantes y administradores. La plataforma permite a los usuarios explorar cursos, inscribirse, acceder a recetas exclusivas y obtener certificaciones profesionales. Además, incluye herramientas avanzadas para la gestión de cursos y compras, todo con un enfoque en la facilidad de uso y la escalabilidad.

## Beneficios Clave
- **Acceso a Cursos de Cocina**: Los usuarios pueden explorar un catálogo diverso de cursos, desde cocina básica hasta especialidades como repostería y cocina internacional.
- **Gestión Simplificada**: Los administradores pueden gestionar cursos, estudiantes y compras desde un panel centralizado.
- **Clases en Vivo**: La integración de clases en vivo permite una experiencia de aprendizaje interactiva y en tiempo real.
- **Certificaciones Profesionales**: Los estudiantes pueden obtener certificaciones que validan sus habilidades culinarias.
- **Sistema de Pagos Seguro**: La integración de pagos asegura transacciones rápidas y confiables.
- **Escalabilidad**: La arquitectura basada en Docker permite un despliegue rápido y escalable en diferentes entornos.

## Características Principales
- Catálogo de cursos de cocina con imágenes y descripciones detalladas.
- Sistema de inscripción y gestión de cursos.
- Clases en vivo para una experiencia interactiva.
- Recetas exclusivas disponibles para los estudiantes.
- Sistema de certificaciones para validar habilidades.
- Panel de administración para gestionar cursos, usuarios y compras.
- Sistema de pagos integrado para facilitar transacciones.
- Arquitectura modular para facilitar el mantenimiento y la expansión.

## Tecnologías Utilizadas
### Frontend
- **JavaScript y Vite.js**: Para una experiencia de usuario rápida y moderna.
- **Vite.js como bundler**: Vite.js se utiliza como bundler para el frontend, ofreciendo tiempos de inicio rápidos y una experiencia de desarrollo fluida gracias a su servidor de desarrollo basado en ES Modules. Además, proporciona Hot Module Replacement (HMR) para actualizaciones instantáneas en el navegador y utiliza Rollup para generar paquetes optimizados en producción.
- **CSS3 con diseño responsivo**: Adaptado a dispositivos móviles y de escritorio.
- **Componentes modulares**: Para un desarrollo más organizado y reutilizable.

### Backend
- **Laravel 10**: Framework robusto para la gestión de la lógica del servidor.
- **MySQL**: Base de datos relacional para almacenar información de cursos, usuarios y compras.
- **PHP 8.2**: Para un rendimiento óptimo y compatibilidad con Laravel.
- **Docker**: Para un entorno de desarrollo y producción consistente.

## Requisitos del Sistema
- Node.js 16+
- PHP 8.2+
- Composer
- Docker y Docker Compose
- MySQL 8.0

## Instalación y Configuración

### 1. Configuración del Entorno
Crear un archivo `.env` en la raíz del proyecto con la siguiente configuración:
```
DB_DATABASE=iga_project
DB_USERNAME=root
DB_PASSWORD=
```

### 2. Levantar con Docker
```bash
docker-compose up -d
```
Esto iniciará:
- Frontend en http://localhost:5173
- Backend API en http://localhost:8000
- Base de datos MySQL en localhost:3306

### Frontend (desarrollo sin Docker)
```bash
cd frontend
npm install
npm run dev
```

### Backend (desarrollo sin Docker)
```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan serve
```

## Estructura del Proyecto
```
iga-project/
├── frontend/           # Aplicación JavaScript
│   ├── src/
│   ├── public/
│   └── ...
├── backend/           # API Laravel
│   ├── app/
│   ├── database/
│   └── ...
└── docker/           # Configuración de Docker
    ├── nginx/
    ├── php/
    └── mysql/
```

## Contribución
1. Fork el proyecto.
2. Crea tu rama de características (`git checkout -b feature/AmazingFeature`).
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`).
4. Push a la rama (`git push origin feature/AmazingFeature`).
5. Abre un Pull Request.

## Licencia
Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

## Contacto
Para soporte o consultas, por favor contactar a mnperrone@gmail.com.
