const codigoBanco = (numero) => {

    const bancosPorCodigo = {
        "001": "Banco do Brasil S.A.",
        "033": "Banco Santander (Brasil) S.A.",
        "104": "Caixa Econômica Federal",
        "237": "Banco Bradesco S.A.",
        "341":	"Banco Itaú S.A.",
        "356":	"Banco Real S.A. (antigo)",
        "389":	"Banco Mercantil do Brasil S.A.",
        "399":	"HSBC Bank Brasil S.A.",
        "422":	"Banco Safra S.A.",
        "453":	"Banco Rural S.A.",
        "633":	"Banco Rendimento S.A.",
        "652":	"Itaú Unibanco Holding S.A.",
        "745":	"Banco Citibank S.A."
    }

    let banco = bancosPorCodigo[numero];
    if (numero === '001') {
        banco = bancosPorCodigo[numero].replace(' S.A.', '');
        return banco;
    } else {
        banco = bancosPorCodigo[numero].replace(' S.A.', '').replace(' (Brasil)','').replace(' (antigo)', '').replace(' Holding', '');
        return banco;
    }
}

const removeCaracteres = (stringEntrada) => {
    let stringFormatada = '';
    for (let i = 0; i < stringEntrada.length; i++) {
        if (!isNaN(stringEntrada[i])) {
            stringFormatada += stringEntrada[i];
        }
    }
    return stringFormatada;
}

const transformaNumeroEmCPF = (numero) => {
    const cpfFormatado = numero.slice(0,3) + '.' + numero.slice(3,6) + '.' + numero.slice(6,9) + '-' + numero.slice(9);
    return cpfFormatado;
}

const transformaNumeroEmAgencia = (numero) => {
    const numeroFormatado = numero.slice(0, -1) + '-' + numero.slice(-1);
    return numeroFormatado;
}

const transformaNumeroEmCC = (numero) => {
    const numeroFormatado = numero.slice(0, -1) + '-' + numero.slice(-1);
    return numeroFormatado;
}

module.exports = {
    codigoBanco:codigoBanco,
    removeCaracteres:removeCaracteres,
    transformaNumeroEmCPF:transformaNumeroEmCPF,
    transformaNumeroEmAgencia:transformaNumeroEmAgencia,
    transformaNumeroEmCC:transformaNumeroEmCC
};
