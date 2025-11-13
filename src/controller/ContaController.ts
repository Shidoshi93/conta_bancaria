import { Conta } from "../model/Conta";
import { ContaRepository } from "../repository/ContaRepository";
import { colors } from "../utils/Colors";

export class ContaController implements ContaRepository {
    private listaContas: Array<Conta> = new Array<Conta>();
    private numero = 0;

    procurarPorNumero(numero: number): void {
        let buscaConta = this.buscaNoArray(numero);

        if (buscaConta != null) {
            buscaConta.visualizar();
        } else {
            console.log(colors.fg.red, "\nA Conta número: " + numero
                + " não foi encontrada!", colors.reset
            );
        }
    }

    listarTodas(): void {
        this.listaContas.map((conta) => {
            conta.visualizar();
        })
    }

    cadastrar(conta: Conta): void {
        this.listaContas.push(conta);
        console.log(colors.fg.green, "\nA Conta número: " + conta.numero +
            " foi criada com sucesso!", colors.reset)
    }

    atualizar(conta: Conta): void {
        console.log("CONTA: ", JSON.stringify(conta));
        let buscaConta = this.buscaNoArray(conta.numero);

        if (buscaConta != null) {
            this.listaContas[this.listaContas.indexOf(buscaConta)] = conta;
            console.log(colors.fg.green, "\nA Conta número: " + conta.numero +
                " foi atualizada com sucesso!", colors.reset);
        }
    }

    deletar(numero: number): void {
        let buscaConta = this.buscaNoArray(numero);

        if (buscaConta != null) {
            this.listaContas.splice(this.listaContas.indexOf(buscaConta), 1);
            console.log(colors.fg.green, "\nA Conta número: " + numero +
                " foi deletada com sucesso!", colors.reset);
        }
    }


    sacar(numero: number, valor: number): void {
        let conta = this.buscaNoArray(numero);

        if (conta == null) {
            console.log(colors.fg.red, "\nA Conta número: " + numero
                + " não foi encontrada!", colors.reset
            );
            return;
        }

        if (conta.sacar(valor)) {
            console.log(colors.fg.green, "\nSaque de R$ " + valor.toFixed(2)
                + " realizado com sucesso na Conta número: " + numero, colors.reset
            );
        } else {
            console.log(colors.fg.red, "\nSaldo insuficiente para saque na Conta número: "
                + numero, colors.reset
            );
        }
    }

    depositar(numero: number, valor: number): void {
        let conta = this.buscaNoArray(numero);

        if (conta == null) {
            console.log(colors.fg.red, "\nA Conta número: " + numero
                + " não foi encontrada!", colors.reset
            );
            return;
        }

        conta.depositar(valor);
        console.log(colors.fg.green, "\nDepósito de R$ " + valor.toFixed(2)
            + " realizado com sucesso na Conta número: " + numero, colors.reset
        );
    }

    transferir(numeroOrigem: number, numeroDestino: number, valor: number): void {
        let contaOrigem = this.buscaNoArray(numeroOrigem);
        let contaDestino = this.buscaNoArray(numeroDestino);

        if (contaOrigem == null) {
            console.log(colors.fg.red, "\nA Conta de Origem número: " + numeroOrigem
                + " não foi encontrada!", colors.reset
            );
            return;
        }

        if (contaDestino == null) {
            console.log(colors.fg.red, "\nA Conta de Destino número: " + numeroDestino
                + " não foi encontrada!", colors.reset
            );
            return;
        }

        if (contaOrigem.sacar(valor)) {
            contaDestino.depositar(valor);
            console.log(colors.fg.green, "\nTransferência de R$ " + valor.toFixed(2)
                + " realizada com sucesso da Conta número: " + numeroOrigem
                + " para a Conta número: " + numeroDestino, colors.reset
            );
        } else {
            console.log(colors.fg.red, "\nSaldo insuficiente para transferência na Conta número: "
                + numeroOrigem, colors.reset
            );
        }
    }

    public gerarNumero(): number {
        return ++this.numero;
    }

    public buscaNoArray(numero: number): Conta | null {
        const contaEncontrada = this.listaContas.find(conta => conta.numero === numero);

        return contaEncontrada || null;
    }
}