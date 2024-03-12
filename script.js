const prova1 = Vue.createApp({
    //Um display vazio e dois vetores para carregar os numeros e operadores matematicos mostrados em tela
    data() {
        return {
            display: '',
            numeros: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0],
            operadores: ['+', '-', '*', '/']
        };
    },
    methods: {

        //Tela da calculadora que começa vazia e recebe um numero pelo input do usuario
        calculadoraTela(num) {
            this.display += num;
        },

        //Função sera carregada pelo evento e pelo vetor de operadores matematicos pré estabelecidos
        operacao(operador) {
            if (this.display !== '' && !isNaN(parseFloat(this.display))) {
                this.display += operador;
            }
        },

        //Chama a função para executar as operações e mostra na tela da calculadora, criada com try/catch para tratatamento de erro
        calcular() {
            try {
                const resultado = this.executarOperacoes(this.display);
                this.display = resultado;
            } catch (error) {
                this.display = 'Erro';
            }
        },

        //Após chamada pela função calcular inicia a logica das operações de acordo com o operador matematico recebido pelo evento
        //Foi adicionada REGEX para um codigo mais correto, usando do metodo TEST para certificar que sera retornado o padrão pedido
        executarOperacoes(expressao) {
            const operacoes = expressao.match(/(\d+|\+|\-|\*|\/)/g);
            let resultado = 0;
            let operador = '+';

            for (const op of operacoes) {
                if (/^\d+$/.test(op)) {
                    switch (operador) {
                        case '+':
                            resultado += parseFloat(op);
                            break;
                        case '-':
                            resultado -= parseFloat(op);
                            break;
                        case '*':
                            resultado *= parseFloat(op);
                            break;
                        case '/':
                            resultado /= parseFloat(op);
                            break;
                    }
                } else {
                    operador = op;
                }
            }

            return resultado;
        },

        //Limpa o display da calculadora
        limpar() {
            this.display = '';
        }

    }
});

prova1.mount('#Prova1');