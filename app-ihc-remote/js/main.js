function leerDatosMockapi() {
    //Función para obtener y mostrar los datos
    function obtenerDatos() {
        axios.get('https://660f6f5a356b87a55c51616a.mockapi.io/orden')
        .then(function(response) {
            if (response.data.length > 0) { //Verificar si hay registros
                var ultimoRegistro = response.data[response.data.length -1].orden; //Obtener el contenido del último registro
                console.log(ultimoRegistro); //Mostrar el contenido en la consola
                document.getElementById('orden').value = ultimoRegistro; //Mostrar el contenido en el elemento con id "orden"
            } else {
                console.log("No hay registros disponibles");
            }
        })
        .catch(function(error) {
            console.log(error);
        });
    }

    //Llamar a la función obtenerDatos inicialmente
    obtenerDatos();

    //Ejecutar la función obtenerDAtos cada 2 segundos
    setInterval(obtenerDatos, 2000);
}

//Llamar a la función para empezar a leer los datos
leerDatosMockapi();