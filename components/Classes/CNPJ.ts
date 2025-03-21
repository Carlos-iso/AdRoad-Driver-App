import ValidationContract from "../../Validation/fluentValidator";

interface CNPJProps {
    cnpj: string;
}

export default class CNPJ {
    private cnpj: string;
    private validator: ValidationContract;

    constructor(props: CNPJProps) {
        this.cnpj = props.cnpj;
        this.validator = new ValidationContract();
        this.validate();
    }

    /**
     * Valida o CNPJ.
     */
    private validate(): void {
        this.validator.isRequired(this.cnpj, "CNPJ é obrigatório.");
        this.validator.isCNPJ(this.cnpj, "CNPJ inválido.");
    }

    /**
     * Retorna o valor do CNPJ.
     */
    public get value(): string {
        return this.cnpj;
    }

    /**
     * Verifica se o CNPJ é válido.
     */
    public isValid(): boolean {
        return this.validator.isValid();
    }

    /**
     * Retorna os erros de validação, se houver.
     */
    public get errors(): { message: string }[] {
        return this.validator.getErrors();
    }
}