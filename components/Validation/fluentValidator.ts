interface ErrorMessage {
	message: string;
}
export default class ValidationContract {
	private errors: ErrorMessage[];
	constructor(errors: ErrorMessage[] = []) {
		this.errors = errors;
	}
	isRequired(value: string | null | undefined, message: string): void {
		if (!value || value.length <= 0) {
			this.errors.push({ message });
		}
	}
	isRequiredFields(fields: object, message: string): string[] {
		const emptyFields = Object.entries(fields).filter(
			([key, value]) => !value || value.trim() === ""
		);
		if (emptyFields.length > 0) {
			console.error(message);
			return emptyFields.map(([key]) => key);
		}
		return [];
	}
	hasMinLen(
		value: string | null | undefined,
		min: number,
		message: string
	): void {
		if (!value || value.length < min) {
			this.errors.push({ message });
		}
	}
	hasMaxLen(
		value: string | null | undefined,
		max: number,
		message: string
	): void {
		if (!value || value.length > max) {
			this.errors.push({ message });
		}
	}
	hasMaxLenFilds(fields: object, max: number, message: string): string {
		const shortFields = Object.entries(fields).filter(
			([key, value]) => value.length > max
		);
		if (shortFields.length > 0) {
			return `${message}${shortFields.map(([key]) => key)}`;
		} else {
			return "";
		}
	}
	isFixedLen(
		value: string | null | undefined,
		len: number,
		message: string
	): void {
		if (!value || value.length !== len) {
			this.errors.push({ message });
		}
	}
	isEmail(value: string | null | undefined, message: string): void {
		const reg = new RegExp(/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/);
		if (!value || !reg.test(value)) {
			this.errors.push({ message });
		}
	}
	isCNPJ(value: string | null | undefined, message: string): void {
		if (!value) {
			this.errors.push({ message });
			return;
		}
		const cleanedCNPJ = value.replace(/\D/g, ""); // Remove caracteres não numéricos
		// Verifica o tamanho e se todos os dígitos são iguais
		if (cleanedCNPJ.length !== 14 || /^(\d)\1{13}$/.test(cleanedCNPJ)) {
			this.errors.push({ message });
			return;
		}
		// Calcula os dígitos verificadores
		const cnpjWithoutDigits = cleanedCNPJ.slice(0, 12);
		const firstDigit = this.calculateCNPJDigit(cnpjWithoutDigits, 12);
		const secondDigit = this.calculateCNPJDigit(
			cnpjWithoutDigits + firstDigit,
			13
		);
		// Compara os dígitos calculados com os dígitos informados
		const calculatedCNPJ = cnpjWithoutDigits + firstDigit + secondDigit;
		if (cleanedCNPJ !== calculatedCNPJ) {
			this.errors.push({ message });
		}
	}
	confirmKey(key: string, confirmKey: string, message: string): void {
		if (key !== confirmKey) {
			this.errors.push({ message });
		}
	}
	/**
	 * Calcula um dígito verificador do CNPJ.
	 */
	private calculateCNPJDigit(cnpj: string, factor: number): number {
		let total = 0;
		for (const digit of cnpj) {
			if (factor > 1) {
				total += parseInt(digit) * factor--;
			}
		}
		const remainder = total % 11;
		return remainder < 2 ? 0 : 11 - remainder;
	}
	getErrors(): ErrorMessage[] {
		return this.errors;
	}
	clear(): void {
		this.errors = [];
	}
	isValid(): boolean {
		return this.errors.length === 0;
	}
}
