const helpers = require('./helpers');
const fs = require("fs");

const correntistas = [];

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

const depositoCorrentista = (cpfCorrentista, valorADepositar) => {
    if (valorADepositar > 0) {
        const indiceAtualizacao = correntistas.indexOf(buscaCorrentista(cpfCorrentista));
        correntistas[indiceAtualizacao]['saldo'] = String(parseInt(correntistas[indiceAtualizacao]['saldo'], 10) + valorADepositar);
    }
}

const retiraSaldo = (cpfCorrentista, codigoBanco, valorARetirar) => {
    const remetente = buscaCorrentista(cpfRemetente);
    if (valorADepositar > remetente.saldo) {
        console.log("Saldo insuficiente!");
    } else {
        if (valorARetirar > 0) {
            const indiceAtualizacao = correntistas.indexOf(buscaCorrentista(cpfCorrentista));
            correntistas[indiceAtualizacao]['saldo'] = String(parseInt(correntistas[indiceAtualizacao]['saldo'], 10) - valorARetirar);
        }
    }    
}

const transferenciaMesmoBanco = (cpfDestinatario, bancoDestinatario, cpfRemetente, bancoRemetente, valorADepositar) => {
    const remetente = buscaCorrentista(cpfRemetente);
        if (bancoDestinatario === bancoRemetente) {
        if (valorADepositar > remetente.saldo) {
            console.log("Saldo insuficiente!");
        } else {
            retiraSaldo(cpfDestinatario, valorADepositar);
            depositoCorrentista(cpfRemetente, valorADepositar);
        }
    } else {
        console.log('Os correntistas não são do mesmo banco.')
    }
}

/* adicionaCorrentista('Meu Amigão', '00000000001', '001', '00011', '00000011', 500);

adicionaCorrentista('Seu Amigão', '00000000002', '001', '00021', '00000021', 1000);

transferenciaMesmoBanco('00000000001', '001','00000000002','002', 500);

console.table(correntistas); */