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
        throw new Error("Method not implemented.");
    }

    depositar(numero: number, valor: number): void {
        throw new Error("Method not implemented.");
    }

    transferir(numeroOrigem: number, numeroDestino: number, valor: number): void {
        throw new Error("Method not implemented.");
    }

    public gerarNumero(): number {
        return ++this.numero;
    }

    public buscaNoArray(numero: number): Conta | null {
        const contaEncontrada = this.listaContas.find((conta) => {
        return conta.numero === numero;
    });

    console.log(contaEncontrada);

    return contaEncontrada || null;
    }
}