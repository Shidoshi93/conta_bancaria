import readlinesync, { question, questionFloat, questionInt } from 'readline-sync';
import { colors } from './utils/Colors';
import { Conta } from './model/Conta';
import { ContaCorrente } from './model/ContaCorrente';
import { ContaPoupanca } from './model/ContaPoupanca';

const LARGURA_MENU: number = 53;
const contas: Array<Conta> = new Array<Conta>;

export function main() {

    const contacorrente: ContaCorrente = new ContaCorrente(2, 123, 1, "Mariana", 15000, 1000);
    contacorrente.visualizar();
    contacorrente.sacar(2000);
    contacorrente.visualizar();
    contacorrente.depositar(1000);
    contacorrente.visualizar();

    const contapoupanca: ContaPoupanca = new ContaPoupanca(3, 123, 2, "Victor", 1000, 10);
    contapoupanca.visualizar();
    contapoupanca.sacar(200);
    contapoupanca.visualizar();
    contapoupanca.depositar(1000);
    contapoupanca.visualizar();

    while (true) {
        const opcao: number = opcoesMenu();

        switch (opcao) {
            case 1:
                console.log(colors.fg.whitestrong,
                    "\n\nCriar Conta\n", colors.reset);

                const conta = criarConta();

                console.log("Criando conta...");
                contas.push(conta);
                console.log("Conta criada com Sucesso!");

                keyPress();
                break;
            case 2:
                console.log(colors.fg.whitestrong,
                    "\n\nListar todas as Contas", colors.reset);

                contas.map((item) => {
                    item.visualizar();
                });

                keyPress()
                break;
            case 3:
                console.log(colors.fg.whitestrong,
                    "\n\nConsultar dados da Conta - por número\n\n", colors.reset);

                keyPress()
                break;
            case 4:
                console.log(colors.fg.whitestrong,
                    "\n\nAtualizar dados da Conta\n\n", colors.reset);

                keyPress()
                break;
            case 5:
                console.log(colors.fg.whitestrong,
                    "\n\nApagar uma Conta\n\n", colors.reset);

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

function criarConta(): Conta {
    const numeroConta = questionInt("Digite o número da conta: ");
    const numeroAgencia = questionInt("Digite o número da agência: ");
    const tipoConta = questionInt("Digite o número da conta (1- Conta Corrente, 2- Conta Poupança): ");
    const titular = question("Informe o titular da conta: ");
    const saldo = questionFloat("Digite o saldo da conta: ");

    return new Conta(numeroConta, numeroAgencia, tipoConta, titular, saldo);
}

main();