## TODO

## Endpoints

### 1. GET /api/pokemon

Obtener todos los datos de lo pokemons con sus detalles en la pokeapi debe de extraer y fusionar los datos de `pokemon` y `pokemon-species`

#### Request:

-   Method: **GET**
-   URL: `/api/pokemon`
-   Params:
    -   limit?: `string` (default "-1")
    -   name?: `string` (buscar un pokemon por su nombre)

### 2. GET /api/pokemon/{id | name}

Obtener los datos de un pokemon en especifico igualmente se fusionan los datos de `pokemon` y `pokemon-species` de la pokeapi

#### Request:

-   Method: **GET**
-   URL: `/api/pokemon/:id`

### 2. GET /api/generation

Obtener los datos de un pokemon en especifico igualmente se fusionan los datos de `pokemon` y `pokemon-species` de la pokeapi

#### Request:

-   Method: **GET**
-   URL: `/api/pokemon/:id`
