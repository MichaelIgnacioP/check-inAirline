# API de Check-in Airline

Esta API de Check-in Airline es un programa que simula el proceso de check-in de una aerolínea. Utiliza una base de datos MySQL (solo lectura) que contiene todos los datos necesarios para la simulación.

## Cómo ejecutar la API

Para ejecutar la API de Check-in Airline, sigue los siguientes pasos:

### 1. Instalación

Asegúrate de tener instalado Node.js en tu sistema.

1. Clona este repositorio en tu máquina local.
2. Abre una terminal y navega hasta el directorio del proyecto.
3. Ejecuta el siguiente comando para instalar las dependencias:

```shell
npm install
```

### 2. Configuración de la base de datos

1. Crea un archivo .env en el directorio raíz del proyecto y configura las variables de entorno necesarias para la conexión a la base de datos MySQL. Asegúrate de incluir las siguientes variables:

DB_HOST=`<host-de-la-base-de-datos>`

DB_USER=`<usuario-de-la-base-de-datos>`

DB_PASSWORD=`<contraseña-de-la-base-de-datos>`

DB_DATABASE=`<nombre-de-la-base-de-datos>`

PORT=`<puerto-de-la-aplicación>`

### 3. Ejecución

1. Ejecuta el siguiente comando para iniciar la API:

```shell
npm start
```

2. La API estará disponible en la URL `http://localhost:<puerto>`, donde `<puerto>` es el número de puerto especificado en el archivo `.env`.

## Descripción de la solución

El código de la solución se divide en varios archivos y carpetas:

- `index.js`: Este archivo es el punto de entrada de la aplicación. Configura y ejecuta el servidor Express y define las rutas.
- `routes/flight.js`: Este archivo contiene la lógica de las rutas relacionadas con los vuelos y pasajeros. Se conecta a la base de datos y realiza consultas para obtener los datos necesarios.
- `db.js`: Este archivo establece la conexión a la base de datos MySQL y crea un pool de conexiones reutilizables.
- `middlewares/logging.js`: Este archivo define un middleware que registra los detalles de las solicitudes entrantes.
- `helpers/validateCompanions.js`: Este archivo contiene una función que valida si los acompañantes de los pasajeros son correctos.
- `helpers/validateSeatProximity.js`: Este archivo contiene una función que valida la proximidad de asientos para un grupo de pasajeros. 
- `helpers/validateEconomyClass.js`: Este archivo contiene una función que valida si la clase económica de los pasajeros es correcta.

### Dependencias principales

- `express`: Un framework web rápido y minimalista para Node.js.
- `mysql2`: Un cliente MySQL para Node.js que admite promesas.

## Rutas

### GET /flights/:id/passengers

Esta ruta devuelve información sobre los pasajeros de un vuelo específico.

**Método:** GET

**Parámetros de ruta:**

- `id` (número): El ID del vuelo del que se desea obtener información.

**Respuesta exitosa (código 200):**
```json
{
  "code": 200,
  "data": {
    "flightId": 1,
    "takeoffDateTime": 1688207580,
    "takeoffAirport": "Aeropuerto Internacional Arturo Merino Benitez, Chile",
    "landingDateTime": 1688221980,
    "landingAirport": "Aeropuerto Internacional Jorge Cháve, Perú",
    "airplaneId": 1,
    "passengers": [
      {
        "passengerId": 90,
        "dni": 983834822,
        "name": "Marisol",
        "age": 44,
        "country": "México",
        "boardingPassId": 24,
        "purchaseId": 47,
        "seatTypeId": 1,
        "seatId": 1
      },
      { ... }
    ]
  }
}
```

**Respuesta de error vuelo no encontrado (código 404):**
```json
{
  "code": 404,
  "data": {}
}
```
**Respuesta de error (código 400):**
```json
{
  "code": 400,
  "errors": "could not connect to db"
}
```
**Respuesta de error (error en la validación de acompañantes):**
```json
{
  "code": 400,
  "error": "Error en la validación de acompañantes"
}
```
**Respuesta de error (error en la validación de proximidad de asientos):**
```json
{
  "code": 400,
  "error": "Error en la validación de proximidad de asientos"
}
```
**Respuesta de error (error en la validación clase económica):**
```json
{
  "code": 400,
  "error": "Error en la validación clase económica"
}
```
## Instrucciones para realizar pruebas

Puedes utilizar herramientas como Postman o Thunder Client para realizar pruebas de las rutas de la API. A continuación te muestro un ejemplo utilizando Postman para obtener información de los pasajeros de un vuelo mediante los params:

```shell
http://localhost:<puerto>/flights/1/passengers
```

Reemplaza `<puerto>` por el número de puerto en el que se está ejecutando la API.

Recibirás una respuesta en formato JSON con información sobre los pasajeros del vuelo.

## Despliegue

La aplicación se ha desplegado utilizando Vercel debido a su compatibilidad con Node.js y su facilidad de uso. Vercel es una plataforma de despliegue y alojamiento que permite implementar aplicaciones web estáticas y de servidor de forma rápida y sencilla.


```shell
https://check-in-airline.vercel.app/flights/1/passengers
```

## Consideraciones adicionales

- La API implementa validaciones de los datos de los pasajeros, como la validación de acompañantes, proximidad de asientos y clase económica.
- Se han proporcionado los archivos y bibliotecas necesarios en la estructura del proyecto.
- El archivo `.gitignore` excluye los archivos `node_modules/` y `package-lock.json`, por lo que no se incluirán en el repositorio. Asegúrate de ejecutar `npm install` para instalar las dependencias antes de ejecutar la API.
- Se considera un middleware para el control de métricas importantes, y una de las más relevantes es el tiempo de respuesta.

**Nota:**

En la respuesta del endpoint, algunos campos pueden contener valores nulos. Si esto ocurre, se recomienda revisar la base de datos para garantizar que los datos estén completos y correctamente ingresados. Es posible que algunos registros no tengan valores asignados para ciertos campos.


¡Gracias por revisar esta documentación! Si tienes alguna pregunta o inquietud, no dudes en contactarme.

¡Disfruta de la simulación de check-in de vuelos con la API!


