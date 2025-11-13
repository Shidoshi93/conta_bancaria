export class StringVaziaError extends Error{
    constructor(campo: string) {
        super(`O campo '${campo}' não pode ser vazio ou conter apenas espaços.`);
    }
}