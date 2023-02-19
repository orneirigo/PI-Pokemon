# Pokemon App

<p align="left">
  <img height="150" src="./PokemonApp.png" />
</p>

## Objetivos

- Construir una App utlizando React, Redux, Node y Sequelize.
- Afirmar y conectar conceptos.
- Aprender mejores prácticas.
- Aprender y practicar el workflow de GIT.
- Usar y practicar testing.

## Tiempo

El proyecto se desarrolla en un lapso de 2 semanas.

## BoilerPlate

El boilerplate cuenta con dos carpetas: `api` y `client`. En estas carpetas estará el código del back-end y el front-end respectivamente.
El contenido de `client` fue creado usando Create React App.

## Enunciado

La idea general es crear una aplicación en la cual se puedan ver los distintos Pokemon utilizando la api externa [pokeapi](https://pokeapi.co/) y a partir de ella poder, entre otras cosas:

  - Buscar pokemons
  - Filtrarlos / Ordenarlos
  - Crear nuevos pokemons

__IMPORTANTE__: Para las funcionalidades de filtrado y ordenamiento no se utilizan los endpoints de la API externa, que ya devuelven los resultados filtrados u ordenados, tampoco se emplean librerías externas para aplicar estilos, los mismos fueron implementados con CSS Modules.

## Tecnologías aplicadas

- React
- Redux
- Express
- Sequelize - Postgres

## Frontend

Se desarrolla con React y Redux para manejar el estado de la app.

#### Página inicial
- Landing page con botón para ingresar al home.
#### Home
- Input de búsqueda para encontrar pokemons por nombre (la búsqueda será exacta, es decir solo encontrará al pokemon si se coloca el nombre completo).
- Área donde se verá el listado de pokemons. Al iniciar se cargan los primeros resultados obtenidos y se muestran imagen, nombre y tipos.
- Opciones para filtrar por tipo de pokemon y por pokemon existente o creado.
- Opciones para ordenar tanto ascendentemente como descendentemente los pokemons de manera alfabética y por fuerza.
- Paginado para buscar y mostrar los siguientes pokemons (12 pokemons por página).
#### Detalle del Pokemon
- Campos mostrados en la ruta principal para cada pokemon (imagen, nombre y tipos).
- Número del pokemon.
- Estadísticas (vida, fuerza, defensa, velocidad).
- Altura y peso.
#### Creación de nuevo Pokemon
- Un formulario __controlado con JavaScript__ con los campos mencionados en el detalle del pokemon.
- Posibilidad de seleccionar entre uno y dos tipos de pokemon.
- Botón para crear un nuevo pokemon.

## Backend

Se desarrolla un servidor en Node/Express que obtiene los datos desde una API externa y desde una base de datos local creada con PostgreSQL, la cual es manipulada mediante Sequelize.

#### GET /pokemons
  - Obtiene un listado de los pokemons desde pokeapi con los datos necesarios para la ruta principal.
#### GET /pokemons/{idPokemon}
  - Obtiene el detalle de un pokemon en particular.
#### GET /pokemons?name="..."
  - Obtiene el pokemon que coincida exactamente con el nombre pasado como query parameter (puede ser de pokeapi o creado).
#### POST /pokemons
  - Recibe los datos recolectados por body desde el formulario controlado, a partir de la ruta de creación de pokemons.
  - Crea un pokemon en la base de datos.
#### GET /types
  - Obtiene todos los tipos de pokemons posibles.
  - Se guardan estos valores en la base de datos y se emplean desde allí.
