import ValidationContract from "../Validation/fluentValidator";
interface PasswordProps {
	password: string;
}
export default class Password {
	private password: string;
	private validator: ValidationContract;
	constructor(props: PasswordProps) {
		this.password = props.password;
		this.validator = new ValidationContract();
		this.validate();
	}
	/**
	 * Valida a senha.
	 */
	private validate(): void {
		this.validator.isRequired(this.password, "Senha é obrigatória.");
		this.validator.hasMinLen(
			this.password,
			8,
			"Senha deve ter pelo menos 8 caracteres."
		);
		this.validator.hasMaxLen(
			this.password,
			20,
			"Senha deve ter no máximo 20 caracteres."
		);
		// Adicione outras regras de validação, como letras maiúsculas, números, etc.
	}
	/**
	 * Retorna o valor da senha.
	 */
	public get value(): string {
		return this.password;
	}
	/**
	 * Verifica se a senha é válida.
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
