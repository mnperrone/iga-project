# IGA Project - Plataforma de Cursos de Cocina

## Descripción
IGA Project es una plataforma web moderna para una escuela de cocina que ofrece cursos en línea, recetas exclusivas y certificaciones profesionales. La plataforma está construida con JavaScript vanilla para el frontend y Laravel para el backend, proporcionando una experiencia de usuario fluida y profesional.

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
- JavaScript Vanilla
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

## Instalación

### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Backend
```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan serve
```

### Docker
```bash
docker-compose up -d
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
Para soporte o consultas, por favor contactar a [TU_EMAIL] 