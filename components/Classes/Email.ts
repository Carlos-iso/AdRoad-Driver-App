import ValidationContract from "../Validation/fluentValidator";
interface EmailProps {
  email: string;
}
export class Email {
  private email: string;
  private validator: ValidationContract;
  constructor(props: EmailProps) {
    this.email = props.email;
    this.validator = new ValidationContract();
    this.validate();
  }
  /**
   * Valida o e-mail.
   */
  private validate(): void {
    this.validator.isRequired(this.email, "E-mail é obrigatório.");
    this.validator.isEmail(this.email, "E-mail inválido.");
  }
  /**
   * Retorna o valor do e-mail.
   */
  public get value(): string {
    return this.email;
  }
  /**
   * Verifica se o e-mail é válido.
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
