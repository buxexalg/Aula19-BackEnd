const helpers = require('./helpers');
const fs = require("fs");
const data = new Date();
const dia = data.getDate();
const mes = data.getMonth() + 1;
const ano = data.getFullYear();

const correntistas = [];
const extrato = [];

const buscaCorrentista = (cpf) => {
    for (let i = 0; i < correntistas.length; i++) {
        if (correntistas[i]['cpfCorrentista'] === helpers.removeCaracteres(cpf)) {
            return correntistas[i];
        }
    }
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



const criaExtratoBancario = (tipoDeOperacao, cpfCorrentista, codigoBanco, valor) => {
    if (tipoDeOperacao.toUpperCase() === 'ENTRADA' || tipoDeOperacao.toUpperCase() === 'SAIDA') {
        const extratoUnico = {
            'data' : dia + '/' + mes + '/' + ano,
            'tipoDeOperacao' : tipoDeOperacao.toUpperCase(), 
            'cpfCorrentista' : cpfCorrentista, 
            'codigoBanco' : codigoBanco, 
            'valor' : valor
        }

        extrato.push(extratoUnico);
        return extrato;
    } else {console.log('Insira o tipo de operação como entrada ou saida.')}
}

const atualizacaoCorrentista = (cpfCorrentista, propriedadeParaAtualizar, valorPropriedade) => {
    if (propriedadeParaAtualizar.toUpperCase() === 'saldo' || propriedadeParaAtualizar.toUpperCase() === "codigoBanco") {
        console.log('Não é possível alterar essas propriedades.')
    } else if (propriedadeParaAtualizar.toUpperCase() === 'nomeCorrentista'){
        const indiceAtualizacao = correntistas.indexOf(buscaCorrentista(cpfCorrentista));
        correntistas[indiceAtualizacao][propriedadeParaAtualizar] = valorPropriedade;
    } else {
        const indiceAtualizacaoNum = correntistas.indexOf(buscaCorrentista(cpfCorrentista));
        correntistas[indiceAtualizacaoNum][propriedadeParaAtualizar] = helpers.removeCaracteres(valorPropriedade);
    }
}

const removeCorrentista = (cpfCorrentista) => {
    const indiceRemocao = correntistas.indexOf(buscaCorrentista(cpfCorrentista));
    correntistas.splice(indiceRemocao, 1);
}

const depositoCorrentista = (cpfCorrentista, codigoBanco, valorADepositar) => {
    if (valorADepositar > 0) {
        const indiceAtualizacao = correntistas.indexOf(buscaCorrentista(cpfCorrentista));
        correntistas[indiceAtualizacao]['saldo'] = String(parseInt(correntistas[indiceAtualizacao]['saldo'], 10) + valorADepositar);
    }
    criaExtratoBancario('ENTRADA', cpfCorrentista, codigoBanco, valorADepositar);
}

const retiraSaldo = (cpfCorrentista, codigoBanco, valorARetirar) => {
    const remetente = buscaCorrentista(cpfCorrentista);
    if (valorARetirar > remetente.saldo) {
        console.log("Saldo insuficiente!");
    } else {
        if (valorARetirar > 0) {
            const indiceAtualizacao = correntistas.indexOf(buscaCorrentista(cpfCorrentista));
            correntistas[indiceAtualizacao]['saldo'] = String(parseInt(correntistas[indiceAtualizacao]['saldo'], 10) - valorARetirar);
        }
    } 
    criaExtratoBancario('SAIDA', cpfCorrentista, codigoBanco, valorARetirar);   
}

const transferenciaMesmoBanco = (cpfDestinatario, bancoDestinatario, cpfRemetente, bancoRemetente, valorADepositar) => {
    const remetente = buscaCorrentista(cpfRemetente);
        if (bancoDestinatario === bancoRemetente) {
        if (valorADepositar > remetente.saldo) {
            console.log("Saldo insuficiente!");
        } else {
            depositoCorrentista(cpfRemetente, bancoRemetente, valorADepositar);
            retiraSaldo(cpfDestinatario, bancoDestinatario, valorADepositar);
        }
    } else {
        console.log('Os correntistas não são do mesmo banco.')
    }
}

adicionaCorrentista('Meu Amigão', '00000000001', '001', '00011', '00000011', 500);

adicionaCorrentista('Seu Amigão', '00000000002', '001', '00011', '00000021', 1000);

transferenciaMesmoBanco('00000000001', '001','00000000002','001', 500);

console.table(correntistas);

console.table(extrato);