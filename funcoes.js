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
        id: cachorros[cachorros.length - 1].id + 1,
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

const vacinar = (idDoCachorroVacinado, vacina) => {
    let cachorroVacinado = buscar(idDoCachorroVacinado)
    let data = new Date().toISOString().substr(0, 10)
    if(cachorroVacinado) {
        
        cachorros[idDoCachorroVacinado - 1].vacinas.push({
            vacina: vacina,
            data: data
        })

    } else {
        console.log("Cachorro inexistente")
    }

    salvar(cachorros)
}

const atribuirServico = (idCachorro, servico) => {
    let cachorro = buscar(idCachorro)
    if(!cachorro) {
        return
    }

    cachorro.servicos.push({
        nome: servico,
        data: new Date().toISOString().substr(0, 10)
    })
    salvar(cachorros)
}

const remover = (idCachorro) => {
    if(buscar(idCachorro)) {
        salvar(cachorros.filter(cachorro => cachorro.id != idCachorro))
    } else {
        console.log("Cachorro inexistente")
    }
}

module.exports = {
    buscar,
    listar,
    descrever,
    adicionar,
    vacinar,
    atribuirServico,
    remover
}