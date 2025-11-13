import { StringVaziaError } from "../exceptions/StringVaziaError";

export class ValidadorString {
    public static stringEhVaziaOuTemESpacosVazios(valor: string | undefined | null): boolean {
        if (!valor) return true;

        return valor.trim().length === 0;
    }

    public static dispararErrorStringVazia(campo: string): void {
        throw new StringVaziaError(campo);
    }
}