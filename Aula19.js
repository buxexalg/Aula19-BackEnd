const helpers = require('./helpers');

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
    } else { console.log('O correntista já existe na lista.')}
    return correntistas;
}



