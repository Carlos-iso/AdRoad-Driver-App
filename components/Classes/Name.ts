import ValidationContract from "../Validation/fluentValidator";
interface NameProps {
	name: string;
}
export class Name {
	private name: string;
	private validator: ValidationContract;
	constructor(props: NameProps) {
		this.name = props.name;
		this.validator = new ValidationContract();
		this.validate();
	}
	/**
	 * Valida o nome.
	 */
	private validate(): void {
		this.validator.isRequired(this.name, "Nome é obrigatório.");
		this.validator.hasMinLen(
			this.name,
			3,
			"Nome deve ter pelo menos 3 caracteres."
		);
		this.validator.hasMaxLen(
			this.name,
			20,
			"Nome deve ter no máximo 100 caracteres."
		);
	}
	/**
	 * Retorna o valor do nome.
	 */
	public get value(): string {
		return this.name;
	}
	/**
	 * Verifica se o nome é válido.
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
