# IGA Project - Plataforma de Cursos de Cocina

## Descripción
IGA Project es una plataforma web moderna para una escuela de cocina que ofrece cursos en línea, recetas exclusivas y certificaciones profesionales. La plataforma está construida con JavaScript y Vite.js para el frontend y Laravel para el backend, proporcionando una experiencia de usuario fluida y profesional.
En entornos de desarrollo el proyecto se encuentra configurado para ser levantado en Docker siguiendos los pasos incluidos en este readme.

## Características Principales
- Catálogo de cursos de cocina
- Sistema de inscripción y gestión de cursos
- Clases en vivo
- Recetas exclusivas
- Sistema de certificaciones
- Panel de administración
- Sistema de pagos integrado

## Tecnologías Utilizadas
### Frontend
- JavaScript y Vite.js
- CSS3 con diseño responsivo
- Vite como bundler
- Componentes modulares

### Backend
- Laravel 10
- MySQL
- PHP 8.2
- Docker

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
1. Fork el proyecto
2. Crea tu rama de características (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## Licencia
Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

## Contacto
Para soporte o consultas, por favor contactar a mnperrone@gmail.com 
