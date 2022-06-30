const cachorros = require('./database/cachorros.json');
const fs = require('fs')

const salvar = () => {
    let path = './database/cachorros.json'
    let json = JSON.stringify(cachorros, null, 4)
    fs.writeFileSync(path, json)
}

const buscar = id => {
    let cachorroProcurado = cachorros.find(cachorro => cachorro.id === id)
    if(cachorroProcurado) {
        return cachorroProcurado
    } else {
        console.log("Cachorro não encontrado")
    }
}

const listar = () => console.table(cachorros)

const descrever = id => {
    let cachorroProcurado = buscar(id)
    if( cachorroProcurado ) {
        console.table(cachorroProcurado)
    } else {
        console.log(`Não existe cachorro com o id ${id}`)
    }
} 

const adicionar = (nomeDoCachorro, sexoDoCachorro, cachorroCastrado, dataNascimentoDoCachorro, pesoDoCachorro) => {
    let novoCachorro = {
        id: cachorros.length + 1,
        nome: nomeDoCachorro,
        sexo: sexoDoCachorro,
        castrado: cachorroCastrado,
        dataDeNascimento: dataNascimentoDoCachorro,
        peso: pesoDoCachorro,
        sexo: sexoDoCachorro,
        vacinas: [],
        servicos: [] 
    }
    cachorros.push(novoCachorro)
    salvar(cachorros)
}

module.exports = {
    buscar,
    listar,
    descrever,
    adicionar
}