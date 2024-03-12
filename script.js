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

        //Chama a função para executar as operações e mostrar na tela da calculadora, criada com try/catch para tratatamento de erro
        //Caso o resultado obtido da função executarOpracoes nao satisfazer os criterios, ele mostrara a mensagem Erro no display da calculadora
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
        //OBS Fui auxiliado para a criação das expressões regulares
        executarOperacoes(expressao) {
            const operacoes = expressao.match(/(\d+|\+|\-|\*|\/)/g);
            let resultado = 0;
            let operador = '+';

            //Nesse for in sera checado se o ultimo digito é um numero, caso não for, ele checara qual operador foi informado e executara a operação
            for (const num of operacoes) {
                if (/^\d+$/.test(num)) {
                    switch (operador) {
                        case '+':
                            resultado += parseFloat(num);
                            break;
                        case '-':
                            resultado -= parseFloat(num);
                            break;
                        case '*':
                            resultado *= parseFloat(num);
                            break;
                        case '/':
                            resultado /= parseFloat(num);
                            break;
                    }
                } else {
                    operador = num;
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