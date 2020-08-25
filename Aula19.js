/*
Código	Nome do Banco
001	Banco do Brasil S.A.
033	Banco Santander (Brasil) S.A.
104	Caixa Econômica Federal
237	Banco Bradesco S.A.
341	Banco Itaú S.A.
356	Banco Real S.A. (antigo)
389	Banco Mercantil do Brasil S.A.
399	HSBC Bank Brasil S.A.
422	Banco Safra S.A.
453	Banco Rural S.A.
633	Banco Rendimento S.A.
652	Itaú Unibanco Holding S.A.
745	Banco Citibank S.A.
*/

/*
Dados	Tipo	Descrição
Nome do Correntista |	string | 	Nome completo de uma pessoa física
CPF do Correntista |	string, formato 000.000.000-00 | Número do CPF de uma pessoa física
Códido do Banco | string, formato 000 |	Número do código do banco representado em string
Agência |	string, formato (0000-0) |	número da agência representado em forma de string
Conta corrente |	string, formato 000000-0 |	número da conta corrente representado em forma de string
Saldo |	number |	valor em centavos do saldo
*/

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

const codigoBanco = (numero) => {
    let banco = bancosPorCodigo[numero];
    if (numero === '001') {
        banco = bancosPorCodigo[numero].replace(' S.A.', '');
        return banco;
    } else {
        banco = bancosPorCodigo[numero].replace(' S.A.', '').replace(' (Brasil)','').replace(' (antigo)', '').replace(' Holding', '');
        return banco;
    }
    
}

