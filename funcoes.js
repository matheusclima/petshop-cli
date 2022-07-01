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
    } 
    console.log("Cachorro não encontrado")
}

const listar = () => console.table(cachorros)

const descrever = id => {
    let cachorroProcurado = buscar(id)
    if( !cachorroProcurado ) {
        console.log(`Não existe cachorro com o id ${id}`)
        return
    }
    console.log(`Nome: ${cachorroProcurado.nome}`)
    console.log(`Sexo: ${cachorroProcurado.sexo === "m" ? "Macho":"Fêmea"}`)
    console.log(`Castrado: ${cachorroProcurado.castrado ? "Sim":"Não"}`)
    console.log(`Nascimento: ${cachorroProcurado.dataDeNascimento}`)
    console.log(`Peso: ${cachorroProcurado.peso} kg`)
    console.log(`Vacinas: `)
    console.table(cachorroProcurado.vacinas)
    console.log(`Serviços: `)
    console.table(cachorroProcurado.servicos)
}

const adicionar = (nomeDoCachorro, sexoDoCachorro, cachorroCastrado, dataNascimentoDoCachorro, pesoDoCachorro) => {
    let novoCachorro = {
        id: cachorros[cachorros.length - 1].id + 1,
        nome: nomeDoCachorro,
        sexo: sexoDoCachorro,
        castrado: cachorroCastrado,
        dataDeNascimento: dataNascimentoDoCachorro,
        peso: pesoDoCachorro,
        vacinas: [],
        servicos: [] 
    }
    cachorros.push(novoCachorro)
    salvar(cachorros)
}

const vacinar = (idDoCachorroVacinado, vacina) => {
    let cachorroParaReceberVacina = buscar(idDoCachorroVacinado)
    let data = new Date().toISOString().substr(0, 10)
    
    if( !cachorroParaReceberVacina ) {
        return
    }

    cachorroParaReceberVacina.vacinas.push({
        vacina: vacina,
        data: data
    })
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
    let cachorroRemovido = buscar(idCachorro)
    if(!cachorroRemovido) {
        return
    }
    salvar(cachorros.filter(cachorro => cachorro !== cachorroRemovido))
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