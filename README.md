# Frontend para Gestión de Cultivos con React

Este proyecto es el frontend para una aplicación de gestión de cultivos, desarrollada con **React**. La aplicación permite visualizar una tabla de cultivos y un mapa interactivo para mostrar la ubicación de cada cultivo, facilitando la gestión y el seguimiento de los mismos.

## Instalación

- Clona el repositorio:
    ```bash
    git clone <URL_DEL_REPOSITORIO>
    ```

- Navega al directorio del proyecto:
    ```bash
    cd <NOMBRE_DEL_PROYECTO>
    ```

- Instala las dependencias:
    ```bash
    npm install
    ```

- Ejecuta la aplicación localmente:
    ```bash
    npm start
    ```

## Dependencias

Este proyecto utiliza las siguientes dependencias principales:
- **React**: Framework principal para la interfaz de usuario.
- **Axios**: Realización de peticiones HTTP hacia el backend.
- **React-Leaflet**: Integración de Leaflet para la visualización del mapa interactivo.
- **Leaflet**: Biblioteca para crear mapas interactivos.

## Estructura de Vistas

La aplicación incluye las siguientes vistas principales:
- **CropsView**: Muestra una tabla con los cultivos registrados y un mapa para visualizar su ubicación. Permite seleccionar los cultivos y visualizarlos en el mapa.

### Funcionalidades

- **Ver cultivos en tabla**: Muestra una lista de cultivos con detalles como nombre, agua requerida, y altura promedio de la raíz.
- **Visualización en el mapa**: Muestra la ubicación de los cultivos seleccionados en un mapa interactivo usando **Leaflet**.
- **Selección de cultivos**: La tabla incluye una casilla de verificación para seleccionar los cultivos y verlos en el mapa.
- **Autenticación de usuarios**: Los usuarios pueden iniciar sesión con credenciales de administrador o supervisor.

### Credenciales de Acceso

- **Usuario (Administrador)**: `admin1`, **Contraseña**: `password1`
- **Usuario (Supervisor)**: `supervisor1`, **Contraseña**: `password2`

## Backend

El backend para este proyecto está desarrollado con **Spring Framework** y está disponible en el siguiente repositorio:

- **Repositorio del Backend**: [https://irrigation-suggester-mini-core-service.onrender.com](https://irrigation-suggester-mini-core-service.onrender.com)

## Enlace de la Aplicación

El frontend está desplegado en **Netlify** y puede ser accedido desde el siguiente enlace:

- **Frontend**: [https://crop-irrigation-web-app.netlify.app/](https://crop-irrigation-web-app.netlify.app/)

## Datos de la API

La aplicación consume la siguiente API que devuelve los datos de los cultivos:

**Endpoint**: `GET /api/crop/all`

**Estructura de la respuesta JSON**:
```json
{
  "status": "SUCCESS",
  "data": [
    {
      "id": <id>,
      "name": "<nombre_del_cultivo>",
      "waterRequired": <agua_requerida_en_litros_por_m2>,
      "rootHeight": <altura_promedio_de_la_raiz_en_metros>,
      "location": {
        "latitude": <latitud>,
        "longitude": <longitud>
      }
    },
    // más cultivos...
  ]
}
```

# Funcionalidades del Proyecto

La aplicación incluye las siguientes funcionalidades principales:

- Inicio de sesión: Acceso para Administradores y Supervisores con autenticación básica.
- Visualización de cultivos: Tabla con la lista de cultivos que incluye detalles como nombre, agua requerida y altura promedio de la raíz.
- Visualización en mapa: Los cultivos seleccionados se muestran en un mapa interactivo usando Leaflet.
- Selección de cultivos para mapa: Casillas de verificación en la tabla para seleccionar cultivos y visualizarlos en el mapa.




