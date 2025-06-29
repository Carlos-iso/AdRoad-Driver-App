import ValidationContract from "../Validation/fluentValidator";
import { normalizerCNPJ } from "../Utils/Utils";
export interface CNPJProps {
  cnpj: string; // Ex: 12345678000195
}
export class Cnpj {
  private validator: ValidationContract;
  private cnpj: CNPJProps;
  constructor(cnpj: CNPJProps) {
    this.cnpj = normalizerCNPJ(cnpj);
    this.validator = new ValidationContract();
    this.validate();
  }
  /**
   * Valida o CNPJ.
   */
  private validate(): CNPJProps {
    this.validator.isRequired(normalizerCNPJ(this.cnpj), "CNPJ é obrigatório.")
    this.validator.isCNPJ(this.cnpj, "CNPJ inválido.")
    return this.cnpj;
  }
  /**
 * Tira ou coloca pontuaçao
 */
  public tuggleDot() {
    return "Em Breve..."
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