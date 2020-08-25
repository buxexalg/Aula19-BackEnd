const helpers = require('./helpers');
const fs = require("fs");

const correntistas = [];

const buscaCorrentista = (cpf) => {
    for (let i = 0; i < correntistas.length; i++) {
        if (correntistas[i]['cpfCorrentista'] === cpf) {
            return correntistas[i];
        }
    }
    console.log('Não existe CPF cadastrado.')
    return false;
} 

const adicionaCorrentista = (nomeCorrentista, cpfCorrentista, codigoBanco, agencia, contaCorrente, saldo = 0) => {
    if (!buscaCorrentista(helpers.removeCaracteres(cpfCorrentista))) { 
    const correntista = {
        'nomeCorrentista' : nomeCorrentista, 
        'cpfCorrentista' : helpers.removeCaracteres(cpfCorrentista), 
        'codigoBanco' : helpers.removeCaracteres(codigoBanco), 
        'agencia' : helpers.removeCaracteres(agencia), 
        'contaCorrente' : helpers.removeCaracteres(contaCorrente), 
        'saldo' : saldo
    }
    correntistas.push(correntista);
    fs.writeFile("correntistas.txt", JSON.stringify(correntistas), erro);
    } else { console.log('O correntista já existe na lista.')}
    return correntistas;
}

const erro = (err) => {
    if (err) {
        console.log(err);
    }
}

adicionaCorrentista('Joãozinho123', '056.155.877-85', '033', '8514-7', '5527681-3', '153248');
adicionaCorrentista('Joãozinho123', '056.155.567-85', '033', '8514-7', '5527681-3', '153248');
adicionaCorrentista('Joãozinho123', '056.155.517-85', '033', '8514-7', '5527681-3', '153248');
adicionaCorrentista('Joãozinho123', '056.155.537-85', '033', '8514-7', '5527681-3', '153248');
