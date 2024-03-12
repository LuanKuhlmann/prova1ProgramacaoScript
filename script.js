const prova1 = Vue.createApp({
    // Estrutura oque sera mostrado na tela da calculadora, os dois vetores serão varridos no codigo html
    data() {
        return {
            display: '',
            numeros: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0],
            operadores: ['+', '-', '*', '/']
        };
    },
    methods: {

        //Adiciona o input a tela da calculadora
        calculadoraTela(num) {
            this.display += num;
        },

        //Adiciona o operador a tela da calculadora e certifica que é um operador
        operacao(operador) {
            const lastChar = this.display.slice(-1);
            if (lastChar && !this.operadores.includes(lastChar)) {
                this.display += operador;
            }
        },
        //Função que irá começar o calculo, passara oque esta na tela para a proxina função caso o TRY esteja todo correto
        //Se alguma validação falhar, caira no CATCH onde mostrará mensagem de erro
        calcular() {
            try {
                const resultado = this.executarOperacoes(this.display);
                this.display = resultado.toString();
            } catch (error) {
                this.display = 'Erro';
            }
        },
        //Função chamada pela anterior, recebera a expressão que esta na tela 
        //Os dados serão estruturados de acordo com oque a expressão regelular aceitar, efetuando os calculos e retornando para a função anterior o resultado
        executarOperacoes(expressao) {
            const operacoes = expressao.match(/(\d+|\+|\-|\*|\/)/g);
            let resultado = parseFloat(operacoes[0]);

            for (let i = 1; i < operacoes.length; i += 2) {
                const operador = operacoes[i];
                const numero = parseFloat(operacoes[i + 1]);

                //Irá receber o operador e ativara a condição necessaria para a execução da função
                switch (operador) {
                    case '+':
                        resultado += numero;
                        break;
                    case '-':
                        resultado -= numero;
                        break;
                    case '*':
                        resultado *= numero;
                        break;
                    case '/':
                        if (numero === 0) throw 'Erro';
                        resultado /= numero;
                        break;
                }
            }

            return resultado;
        },

        //Função para limpar a tela da calculadora 
        limpar() {
            this.display = '';
        }
    }
});

prova1.mount('#Prova1');
