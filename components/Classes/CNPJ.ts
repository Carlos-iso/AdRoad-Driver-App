import ValidationContract from "../Validation/fluentValidator.ts";
export interface CNPJProps {
  cnpjRoot: number;            // Ex: 12345678
  cnpjHeadquarters: number;    // Ex: 0001
  cnpjVerifier: number;       // Ex: 95
}
export default class CNPJ {
  private cnpj: CNPJProps;
  private validator: ValidationContract;
  constructor(props: CNPJProps) {
    this.cnpj = props;
    this.validator = new ValidationContract();
    this.validate();
  }
  /**
   * Valida o CNPJ.
   */
  private validate(): void {
    this.validator.isRequired(this.cnpj, "CNPJ é obrigatório.")
    this.validator.isCNPJ(this.cnpj, "CNPJ inválido.")
  }
  /**
   * Retorna o valor do CNPJ.
   */
  public get value(): CNPJProps {
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