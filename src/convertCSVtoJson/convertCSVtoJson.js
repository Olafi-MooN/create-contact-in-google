// Importações de modulos
const fs = require('fs');
const csv = require('fast-csv');

// Criando um modulo para ser reaproveitado em outra parte do projeto
const convertToJson = (nameFileCsv, fileOutJson) => {

    // Preaparando para fazer a leitura do arquvivo 'nameFileCsv'
    const stream = fs.createReadStream(nameFileCsv,{encoding: 'latin1'});
   
    var lista = []; // Essa lista vai receber o texto linha a linha do csv
    
    // Realizando a leitura linha a linha
    const streamCsv = csv.parse({ headers: true, delimiter: ";" })
    .on('error', error => console.error(error))
    .on('data', row => lista.push(row)) // adicionando a linha dentro do array list
    .on('end', rowCount => {
        // Criando um arquivo com os dados da lista
        fs.writeFile(fileOutJson, JSON.stringify(lista, null, 2), err => console.error(err || "Arquivo convertido com sucesso"));
        console.log(rowCount)
    });
    
    stream.pipe(streamCsv) // executando o fast-csv
}

//convertToJson('base.CSV', 'dataEditable.json');

module.exports = convertToJson;