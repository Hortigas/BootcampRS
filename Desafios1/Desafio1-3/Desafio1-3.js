//Usuários e tecnologias
{
    const usuarios = [
        { nome: 'Carlos', tecnologias: ['HTML', 'CSS'] },
        { nome: 'Jasmine', tecnologias: ['JavaScript', 'CSS'] },
        { nome: 'Tuane', tecnologias: ['HTML', 'Node.js'] },
    ];

    for (usuario of usuarios) {
        // prettier-ignore
        console.log(`${usuario.nome} trabalha com ` + usuario.tecnologias.join(', '));
        if (usuario.tecnologias.includes('CSS'))
            console.log(`O usuário ${usuario.nome} trabalha com CSS`);
        console.log();
    }
}
//Soma de despesas e receitas
{
    const usuarios = [
        {
            nome: 'Salvio',
            receitas: [115.3, 48.7, 98.3, 14.5],
            despesas: [85.3, 13.5, 19.9],
        },
        {
            nome: 'Marcio',
            receitas: [24.6, 214.3, 45.3],
            despesas: [185.3, 12.1, 120.0],
        },
        {
            nome: 'Lucia',
            receitas: [9.8, 120.3, 340.2, 45.3],
            despesas: [450.2, 29.9],
        },
    ];

    for (let usuario of usuarios) {
        let valor = calculaSaldo(usuario.receitas, usuario.despesas);
        let sinal = 'POSITIVO';
        if (valor < 0) sinal = 'NEGATIVO';
        console.log(
            `${usuario.nome} possui saldo ${sinal} de ${valor.toFixed(2)}`
        );
    }

    function calculaSaldo(receitas, despesas) {
        return (
            receitas.reduce((a, b) => a + b) - despesas.reduce((a, b) => a + b)
        );
    }
}
