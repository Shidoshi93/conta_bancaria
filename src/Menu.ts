import readlinesync from 'readline-sync';
import { colors } from './utils/Colors';
import { Conta } from './model/Conta';
import { ContaCorrente } from './model/ContaCorrente';
import { ContaPoupanca } from './model/ContaPoupanca';
import { ValidadorString } from './utils/ValidadorStrings';
import { ContaController } from './controller/ContaController';

const LARGURA_MENU: number = 53;
const tiposContas = ["Conta Corrente", "Conta Poupança"];
let contas: ContaController = new ContaController();
let numero: number = 0;
let conta: Conta | null;

export function main() {

    while (true) {
        const opcao: number = opcoesMenu();

        switch (opcao) {
            case 1:
                console.log(colors.fg.whitestrong,
                    "\n\nCriar Conta\n", colors.reset);

                contas.cadastrar(criarOuAtualizar(false));

                keyPress();
                break;
            case 2:
                console.log(colors.fg.whitestrong,
                    "\n\nListar todas as Contas", colors.reset);

                contas.listarTodas();

                keyPress()
                break;
            case 3:
                console.log(colors.fg.whitestrong,
                    "\n\nConsultar dados da Conta - por número\n\n", colors.reset);

                contas.procurarPorNumero(readlinesync.questionInt("Digite o número da conta: "));

                keyPress()
                break;
            case 4:
                console.log(colors.fg.whitestrong,
                    "\n\nAtualizar dados da Conta\n\n", colors.reset);

                numero = readlinesync.questionInt("Digite o número da conta: ");
                conta = contas.buscaNoArray(numero)

                conta ? contas.atualizar(criarOuAtualizar(true, conta.numero, conta.agencia)) :
                    console.log(colors.fg.whitestrong,
                        `\nA Conta número: ${numero} não foi encontrada!`, colors.reset);

                keyPress()
                break;
            case 5:
                console.log(colors.fg.whitestrong,
                    "\n\nApagar uma Conta\n\n", colors.reset);

                numero = readlinesync.questionInt("Digite o número da conta: ");
                conta = contas.buscaNoArray(numero)

                conta ? contas.deletar(numero) :
                    console.log(colors.fg.whitestrong,
                        `\nA Conta número: ${numero} não foi encontrada!`, colors.reset);

                keyPress()
                break;
            case 6:
                console.log(colors.fg.whitestrong,
                    "\n\nSaque\n\n", colors.reset);

                keyPress()
                break;
            case 7:
                console.log(colors.fg.whitestrong,
                    "\n\nDepósito\n\n", colors.reset);

                keyPress()
                break;
            case 8:
                console.log(colors.fg.whitestrong,
                    "\n\nTransferência entre Contas\n\n", colors.reset);

                keyPress()
                break;
            default:
                console.log(colors.fg.whitestrong,
                    "\nOpção Inválida!\n", colors.reset);

                keyPress()
                break;
        }
    }

}

function opcoesMenu(): number {
    let opcao: number;

    const linhaAsteriscos = "*".repeat(LARGURA_MENU);
    console.log(colors.bg.black + colors.fg.yellow);
    console.log(linhaAsteriscos);
    console.log(criarLinhaDeEspacos());
    console.log(criarLinhaDeEspacos());
    console.log(criarLinhaDeEspacos("BANCO DO BRAZIL COM Z"));
    console.log(criarLinhaDeEspacos());
    console.log(linhaAsteriscos);

    console.log(criarLinhaDeEspacos());
    console.log(criarLinhaDeEspacos("1 - Criar Conta"));
    console.log(criarLinhaDeEspacos("2 - Listar todas as Contas"));
    console.log(criarLinhaDeEspacos("3 - Buscar Conta por Numero"));
    console.log(criarLinhaDeEspacos("4 - Atualizar Dados da Conta"));
    console.log(criarLinhaDeEspacos("5 - Apagar Conta"));
    console.log(criarLinhaDeEspacos("6 - Sacar"));
    console.log(criarLinhaDeEspacos("7 - Depositar"));
    console.log(criarLinhaDeEspacos("8 - Transferir valores entre Contas"));
    console.log(criarLinhaDeEspacos("9 - Sair"));
    console.log(criarLinhaDeEspacos());
    console.log(linhaAsteriscos + colors.reset);

    console.log("Entre com a opção desejada: ");
    opcao = readlinesync.questionInt("");

    if (opcao == 9) {
        console.log(colors.fg.greenstrong,
            "\nBanco do Brazil com Z - O seu Futuro começa aqui!");
        sobre();
        console.log(colors.reset, "");
        process.exit(0);
    }

    return opcao;
}

function sobre(): void {
    console.log("\n*****************************************************");
    console.log("Projeto Desenvolvido por: ");
    console.log("Generation Brasil - generation@generation.org");
    console.log("github.com/conteudoGeneration");
    console.log("*****************************************************");
}

function keyPress(): void {
    console.log(colors.reset, "");
    console.log("\nPressione enter para continuar...");
    readlinesync.prompt();
}

function criarLinhaDeEspacos(texto: string = ""): string {
    const margemEsquerda: string = "            ";
    let linhaCompleta: string = margemEsquerda + texto;
    const espacosRestantes: number = LARGURA_MENU - linhaCompleta.length;

    if (espacosRestantes > 0) {
        linhaCompleta += " ".repeat(espacosRestantes);
    }

    return linhaCompleta.substring(0, LARGURA_MENU);
};

type ContaInput = {
    tipoConta: number;
    titular: string;
    saldo: number;
    limite: number | undefined;
    diaAniversario: number | undefined;
}

function criarOuAtualizar(atualiza: boolean, numeroConta?: number, numeroAgecia?: number): Conta {
    const conta: ContaInput = {
        tipoConta: readlinesync.keyInSelect(tiposContas, "", { cancel: false }) + 1,
        titular: "",
        saldo: readlinesync.questionFloat("Digite o saldo da conta: "),
        limite: undefined,
        diaAniversario: undefined,
    }

    conta.titular = validarTitular(conta.titular);

    const numeroContaFinal: number = (atualiza && typeof numeroConta === "number") ? numeroConta : 
        contas.gerarNumero();
    const numeroAgenciaFinal: number = (atualiza && typeof numeroAgecia === "number") ? numeroAgecia : 
        contas.gerarNumero();

    if (conta.tipoConta === 1) {
        conta.limite = readlinesync.questionInt("Digite o limite da conta (R$): ")
        return new ContaCorrente(
            numeroContaFinal,
            numeroAgenciaFinal,
            conta.tipoConta,
            conta.titular,
            conta.saldo,
            conta.limite
        )
    }

    conta.diaAniversario = readlinesync.questionInt("Digite o dia do aniversário da conta Poupança: ")

    return new ContaPoupanca(
        numeroContaFinal,
        numeroAgenciaFinal,
        conta.tipoConta,
        conta.titular,
        conta.saldo,
        conta.diaAniversario
    );
}

function validarTitular(titular: string): string {
    let tentativas: number = 0;
    let maxTentativas: number = 3;

    while (tentativas < maxTentativas) {
        titular = readlinesync.question("Digite o Titular da conta: ");

        if (!ValidadorString.stringEhVaziaOuTemESpacosVazios(titular)) {
            break;
        }

        console.warn(`Titular inválido. Tentativas restantes: ${maxTentativas - (tentativas + 1)}`);
        tentativas++;
    }


    if (titular.length === 0) ValidadorString.dispararErrorStringVazia("Titular");


    return titular;
}

main();