# Malla interactiva


![Contribuidores](https://img.shields.io/github/contributors/csarman/malla-interactiva)
![package version](https://img.shields.io/github/package-json/v/csarman/malla-interactiva)
![license](https://img.shields.io/github/license/csarman/malla-interactiva)
![Docker build status](https://img.shields.io/github/workflow/status/csarman/malla-interactiva/Docker%20Build?label=docker%20build%20)
![Docker image size](https://img.shields.io/docker/image-size/booterman/malla-interactiva?label=docker%20image%20size)
![Docker pull count](https://img.shields.io/docker/pulls/booterman/malla-interactiva)


Proyecto Universitario en donde busca desarrollar un simulador interactivo con el objetivo de simplificar la información para los alumnos.


# Índice
1. [Caracteristicas de la malla](#Características-de-la-malla)
2. [TODO](#TODO)
3. [¿Cómo funciona la malla?](#¿Cómo-funciona-la-malla?)
4. [Agregar o cambiar una malla](#Agregar-o-cambiar-una-malla)
5. [Probar malla](#Probar-malla)

# Características de la malla
- Visualiza los créditos de las asignaturas según el sistema **USM** o **SCT** 
- Selecciona asignaturas para aprobarlas, a medida que vayas aprobando más ramos, podrás ver que ramos
  se desbloquean.
- Calcula tu prioridad. Puedes calcularla basado en ambos sistemas de créditos.  
    ![Gif demo de calculo de prioridad](https://media.giphy.com/media/9FZo5ua3aCmXij4xZ5/giphy.gif)
- Crear una malla personal que se adecue a tu desdicha recorrida en la Universidad.
    ![Gif demo de la malla personalidada](https://media.giphy.com/media/QK448lB7juUF0ftL7g/giphy.gif)
    - Agregar y cambiar los pre-requisitos de los ramos, incluyendo los ya existentes!
    - Agregar ramos que no se encuentren en la malla oficial pero que hayas cursado.
- Cualquier cambio realizado queda guardado para la próxima visita a la página
- Modo oscuro y modo claro automático basado en la configuración del SO o explorador

# TO DO
* [ ] Subir a la plataforma mallas UAI:
    * [ ] Industrial
    * [ ] Informática
    * [ ] Bioingeniería
    * [ ] Obras civiles



## ¿Cómo funciona la malla?

Cada malla necesita de dos archivos `.json` para que esta se muestre en el sitio. Estos tienen por nombre
`data_CARR.json` y `colors_CARR.json` y se ubican en el directorio `/data`. `CARR` corresponde a la abreviatura de la carrera (por Ej: INF para informática) El primero (`data_CARR.json`) contienela información de cada ramo y sus características agrupados por semestre. Se sigue la siguiente estructura:  
```json5
{
  "s2": [
    ["Química y Sociedad","QUI-010",3,5,"PC",[],"A"],
    ["Matemáticas II","MAT-022",5,7,"PC",["MAT-021"],"A"],
    ["Física General I","FIS-110",5,8,"PC",["MAT-021","FIS-100"],"A"],
    ["Introducción a la Ingeniería","IWG-101",2,3,"TIN",[],"A"],
    ["Humanístico II","HRW-133",2,3,"HUM",[],"A"],
    ["Educación Física II","DEW-101",1,0,"HUM",["DEW-100"],"A"]
  ],
//  ...
}
```
En donde  
`s2` Corresponde al semestre, en este caso, Semestre II. `s2` contiene una lista de ramos, donde cada ramo tiene 7 items en el siguiente orden:
1. ***Ramo***: El nombre completo del ramo.
2. ***Sigla***: Sigla del ramo. **Única** para cada ramo, no se puede repetir y no puede contener espacios. Se pide seguir el formato `sigla-número`
3. ***Créditos USM***: Entero, la cantidad de créditos USM.
4. ***Créditos SCT***: Entero, la cantidad de créditos SCT. Si su valor es `0`, se calcula
   basándose en los créditos USM
5. ***Categoría***: Categoría del ramo al que pertenece (por ejemplo, *PC*: Plan Común), se deben agregar ó editar en el json `colors_CARR.json`.
6. ***Prerrequisitos***: Una lista de strings que contiene las siglas de los prerrequisitos del ramo. **Es importante
   que la sigla ya exista en semestres anteriores**, de lo contrario podría fallar. Esta lista es opcional.
7. ***Indicador Par o Impar***: Puede tener el valor de `"P"`, `"I"`, `"A"` o `""`. Indica
   si el ramo se dicta en un semestre **P**ar, **I**mpar, o en **A**mbos. `""` Actúa como `"A"` pero significa que no se sabe, por favor evitar dejarlo en blanco.
   
El segundo archivo corresponde a `colors_CARR.json`. Este contiene las categorías y los colores de la malla y sigue el siguiente formato:

```json5
{
  "Abreviación": ["Color", "Categoría"],
//  ...
}
```
Para elegir un buen color, puedes buscar Color Picker en [Google](https://www.google.com/search?client=safari&rls=en&q=Color+Picker&ie=UTF-8&oe=UTF-8)  
Ejemplo:

```json5
{
  "PC": ["#00838F", "Plan Común"]
}
```

Si aun hay dudas, puede revisar [data_INF.json](https://github.com/CsarMan/malla-interactiva/blob/master/data/data_INF.json)
y [colors_INF.json](https://github.com/CsarMan/malla-interactiva/blob/master/data/colors_INF.json)

## Agregar o cambiar una malla

La forma más directa es editar o crear directamente los archivos usando el
formato ya explicado, y realizar una pull request con los archivos en directorio correcto.

*Nota*: Es recomendable (por no decir necesario) hacer el proceso en un computador.


## Probar malla
El primer paso antes de probar la malla es clonar el repositorio, para esto deben instalar [git](https://git-scm.com/). 
El segundo paso es hablarme porque son varios pasos que después paso al limpio aquí :D

Para probar la malla, existen los siguientes métodos:

**NOTA:** Independientemente de la forma en que se prueba la malla, en caso de editar archivos `.js`, para que estos se reflejen, ejecute desde una terminal en la carpeta raíz en una máquina `linux`
```shell
npm run devBuild
```

### Usando Python (¡Si funcionó!)
Con este método se levanta un mini servidor http lo que facilita la carga para el navegador. 
Para esto, lo primero que se debe hacer es **abrir una máquina linux** (como ubuntu), luego se tiene que **abrir una terminal** para luego dirigirse al **directorio principal de la malla**.
Una vez que ya se está en el directorio de malla interactiva, se debe ejecutar el siguiente código:

* Si tiene **Python 3** (el actual):
    ```shell
    python -m http.server
    ```

Luego de esto se debe abrir un navegador (ejemplo: Chrome o Firefox) e ir a la dirección http://localhost:8000 y ahí debería ver la malla.



### Usando Docker (No funcionó cuándo lo probé)
Los únicos requisitos son tener `docker`, `podman` o cualquier otro _container manager_.

Primero clone el repo y construya la imagen mediante:
```shell
docker build -t malla-interactiva .
```

dentro del mismo directorio del repositorio.

* **Para correr la imagen** ejecute:
    ```shell
    docker run -d -p 8080:8080 --name mallas malla-interactiva
    ```
    Y listo! Con esto podrá visitar la malla utilizando la dirección [http://localhost:8080/](http://localhost:8080/).

* **Para detener y eliminarla** la instancia del container al mismo tiempo ejecute:

    ```shell
    docker rm --force mallas
    ```
* **Para solo detener** la instancia
    ```shell
    docker stop mallas
    ```



### Usando Firefox (No lo intenté)
Se tiene que abrir el `index.html` con **Firefox** (debido a que los otros navegadores tienen
desactivada la lectura de archivos locales por defecto), y al final de la URL agregar `?m=CARR`. Por ejemplo,
para abrir `data_INF.json` debería quedar algo como `index.html?m=INF`.


