

console.log("ID del proceso:", process.pid);
console.log("Directorio actual:", process.cwd());
console.log("Versión de Node:", process.version);
console.log("Plataforma:", process.platform);
console.log("Arquitectura:", process.arch);
console.log(`Tiempo de ejecucion: ${process.uptime()} segundos \n`);

//VARIABLES DE ENTORNO
console.log(process.env); // Muestra todas las variables de entorno
console.log("PATH:", process.env.PATH);
console.log("USER PROFILE:", process.env.USER_PROFILE);
console.log("NODE_ENV:", process.env.NODE_ENV || "No definido");

//USO DE MEMORIA
const memoryUsage = process.memoryUsage();
console.table(memoryUsage);

for (const key in memoryUsage) {
    console.log(`Memory ${key} : ${(memoryUsage[key] / 1024 / 1024).toFixed(2)} MB`);
}

//EVENTOS DE SALIDA
process.on('exit', (code) => {
    console.log("El proceso está terminado", code);
});


//SEÑALES DE INTERRUPCIÓN
process.on('SIGINT', () => {
    console.log("Se recibió la señal de interrupción");
    // Limpiar recursos, cerrar conexiones, etc.
    process.exit(0);
});

console.log('Escribe algo y presiona enter o Ctrl+C para salir');
process.stdin.on('data', data => {
    const input = data.toString().trim();
    if (input.toLowerCase() == 'salir') {
        console.log('Comando de salida recibido');
        process.exit(0);
    } else {
        console.log(`Mensaje: ${input}`);
        console.log('Escribe "Salir" para terminar o escribe algo más.');
    }
})