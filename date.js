const dateFormatter = require('platzidate');

console.log('Timestamp: ', dateFormatter.getTimestamp());
console.log('Fecha en Español: ', dateFormatter.getLongTime());
console.log('Fecha en Inglés: ', dateFormatter.getLongTime('en-US'));