const express  = require('express');
const api = express();

// 127.0.0.1 é o endereço padrao do nosso computador

// http://127.0.0.1:5000/calcularIMC?nome=Gabriel&peso=86&altura=1.86

// ###### Explicacao #####
// http://127.0.0.1:5000 - Endereço da API
// /calcularIMC - Nome do metodo (ou funcao) da API que queremos utilizar
// ?nome=Gabriel&peso=86&altura=1.86 - Query parametros, parametros que precisamos passar para a API

// Primeiro metodo (funcao)
// req: Requisição que estamos recebendo do cliente
// res (Response): resposta que vamos retornar para o cliente
api.get('/teste', (req, res) => {
    return res.status(200).send('Nossa API esta funcionando!');
});

// Funcao para calcular o IMC
fCalcularImc = (peso, altura) => {
    return peso/(altura*altura)
};

// Funcao para verificar a classificacao
fClassificacao = (imc) => {
    if (imc < 18.5) {
        return 'Voce esta abaixo do peso';
    } else if (imc < 24.9) {
        return 'Voce esta no peso ideal';
    } else {
        return 'Voce esta com sobrepeso';
    }
};
// Array para armazenar o historico de calculos
let historico = [];

// GET para calcular o valor de IMC.
// Esse metodo precisa receber os parametros de Nome, Altura e Peso.
api.get('/calcularIMC', (req, res) => {
    let nomeUsuario = String(req.query.nome);
    let pesoUsuario = Number(req.query.peso);
    let alturaUsuario = Number(req.query.altura);

    if (isNaN(pesoUsuario) || isNaN(alturaUsuario)) {
        return res.status(400).send('Formato de dados incorreto, o campo peso e altura aceitam somente numeros.');
    }

    let imcUsuario = fCalcularImc(pesoUsuario, alturaUsuario);
    let classificacaoUsuario = fClassificacao(imcUsuario);

    historico.push({
        nome: nomeUsuario, 
        peso: pesoUsuario, 
        altura: alturaUsuario, 
        imc: imcUsuario, 
        classificacao: classificacaoUsuario
    });

    return res.json({
        nome: nomeUsuario, 
        peso: pesoUsuario, 
        altura: alturaUsuario, 
        imc: imcUsuario, 
        classificacao: classificacaoUsuario
    });
});

// Consulta de historico
api.post('/consultaHistorico', (req, res) => {
    if (historico.length == 0) {
        return res.send('O historico esta vazio!');
    }

    let json = JSON.stringify(historico);
    return res.send(json);
});

// Funcao para iniciar nossa API
api.listen(5000, () => {
    console.log('A API esta funcionando...');
});