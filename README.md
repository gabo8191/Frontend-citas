# Despliegue del Frontend de Citas Médicas sobre Nginx

Este documento proporciona los pasos necesarios para montar el frontend de la aplicación de citas médicas utilizando Nginx, versión estable 1.26.2.

## Requisitos

- Nginx estable, versión 1.26.2
- Sistema operativo Windows (aunque los pasos son similares en otros sistemas)
- Archivos del frontend disponibles en la carpeta `Frontend-citas`

## Instrucciones

### 1. Descarga e instalación de Nginx

- Descarga Nginx desde el sitio oficial: [https://nginx.org/en/download.html](https://nginx.org/en/download.html).
- Extrae los archivos en una ubicación en tu disco local, preferiblemente en `C:/nginx` para seguir este ejemplo.

### 2. Configuración de Nginx

- Dentro de la carpeta `C:/nginx`, busca la subcarpeta `conf` y reemplaza el archivo `nginx.conf` por el que se adjunta a este proyecto.
- En este archivo de configuración (`nginx.conf`), se especifica la ruta del directorio raíz que Nginx utilizará para servir los archivos del frontend. En este caso, la línea que se debe encontrar y modificar si es necesario es:

  ```nginx
  root   "C:/nginx/htdocs";
  ```

Si se decide colocar los archivos en una ubicación diferente, modifique esta línea con la ruta correcta.

### 3. Creación de la carpeta `htdocs`

- Dentro de `C:/nginx`, cree una carpeta llamada `htdocs`. Esta será la carpeta donde Nginx buscará los archivos para servir en el navegador.

  ```bash
  C:/nginx/htdocs
  ```

### 4. Copiar los archivos del frontend

- Copie todos los archivos de la carpeta `Frontend-citas` a la carpeta `C:/nginx/htdocs`.

### 5. Iniciar Nginx

- Inicie Nginx desde la línea de comandos navegando a la carpeta donde se instaló Nginx (`C:/nginx`) y ejecute el comando:

  ```bash
  start nginx
  ```

  Si ya tiene Nginx en funcionamiento, puede reiniciarlo con el siguiente comando:

  ```bash
  nginx -s reload
  ```

### 6. Acceder al frontend

- Abra su navegador y navegue a `http://localhost`. Debería de ver el frontend de la aplicación de citas médicas cargado correctamente.

## Notas

- Asegúrese de que no haya conflictos de puertos en su máquina. Por defecto, Nginx usa el puerto 80.
- Puede modificar la configuración del puerto en el archivo `nginx.conf` si es necesario.

### Verificación del funcionamiento

Si todo está configurado correctamente, debería poder ver el frontend y realizar las peticiones a al backend. Si recibe errores de conexión, verifique que Nginx esté corriendo y que los puertos necesarios estén abiertos.
