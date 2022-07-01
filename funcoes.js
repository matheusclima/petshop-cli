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

const listar = () => {
    console.table(cachorros.map(cachorro => {
        return {
            id: cachorro.id,
            nome: cachorro.nome,
            sexo: cachorro.sexo === "m" ? "Macho" : "Fêmea",
            castrado: cachorro.castrado ? "Sim" : "Não",
            peso: `${cachorro.peso} kg`
        }
    }))
}

const descrever = id => {
    let cachorroProcurado = buscar(id)
    if( !cachorroProcurado ) {
        console.log(`Não existe cachorro com o id ${id}`)
        return
    }
    console.log(`Nome: ${cachorroProcurado.nome}`)
    console.log(`Sexo: ${cachorroProcurado.sexo === "m" ? "Macho" : "Fêmea"}`)
    console.log(`Castrado: ${cachorroProcurado.castrado ? "Sim" : "Não"}`)
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
    salvar()
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
    salvar()
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
    salvar()
}

const remover = (idCachorro) => {
    let cachorroRemovido = buscar(idCachorro)
    let index = cachorros.indexOf(cachorroRemovido)
    if(!cachorroRemovido) {
        return
    }
    cachorros.splice(index, 1)
    salvar()
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