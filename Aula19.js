const helpers = require('./helpers');
const { codigoBanco, transformaNumeroEmAgencia } = require('./helpers');

const correntistas = [
    {
        nomeCorrentista: 'Joãozinho do Teste',
        cpfCorrentista: '12345678912',
        codigoBanco: '001',
        agencia: '00123',
        contaCorrente: '023145',
        saldo: '0'
    },
    {
        nomeCorrentista: 'Joãozinho do Teste',
        cpfCorrentista: '123456789782',
        codigoBanco: '001',
        agencia: '00123',
        contaCorrente: '023145',
        saldo: '0'
    },
    {
        nomeCorrentista: 'Joãozinho do Teste',
        cpfCorrentista: '13245678912',
        codigoBanco: '001',
        agencia: '00123',
        contaCorrente: '023145',
        saldo: '0'
    },
    {
        nomeCorrentista: 'Joãozinho do Teste',
        cpfCorrentista: '12344578912',
        codigoBanco: '001',
        agencia: '00123',
        contaCorrente: '023145',
        saldo: '0'
    },
]

const buscaCorrentista = (cpf) => {
    for (let i = 0; i < correntistas.length; i++) {
        if (correntistas[i]['cpfCorrentista'] === cpf) {
            return correntistas[i];
        }
    }
    return 'Não existe CPF cadastrado.'
} 
