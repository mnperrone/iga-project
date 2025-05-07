FROM php:8.2-fpm

# Instalar dependencias del sistema
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip \
    default-mysql-client

# Limpiar cache
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

# Instalar extensiones de PHP
RUN docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd

# Obtener Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Establecer directorio de trabajo
WORKDIR /var/www/html

# Copiar composer.json y composer.lock primero
COPY composer.json composer.lock ./

# Instalar dependencias
RUN composer install --no-scripts --no-autoloader

# Copiar el resto de los archivos del proyecto
COPY . .

# Generar el autoloader optimizado
RUN composer dump-autoload --optimize

# Configurar permisos
RUN chown -R www-data:www-data \
    /var/www/html/storage \
    /var/www/html/bootstrap/cache

# Asegurarse de que los directorios tengan los permisos correctos
RUN chmod -R 775 \
    /var/www/html/storage \
    /var/www/html/bootstrap/cache

# Copiar el archivo de configuración de PHP
COPY docker/php/local.ini /usr/local/etc/php/conf.d/local.ini

# Exponer puerto
EXPOSE 9000

CMD ["php-fpm"] 