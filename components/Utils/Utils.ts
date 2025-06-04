import { CNPJProps } from "../Classes/CNPJ";
// Tipos de cnpj:
// 1 - CNPJ completo formatado 00.000.000/0000-00 18 caracteres 14 numeros
// 2 - CNPJ completo não formatado 00000000000000 14 numeros
// 3 - CNPJ raiz {00000000 8 numeros} + {0000 4 numeros} + {00 2 numeros}
interface Data {
  id: number;
  token: string;
  issuedAt: number;
  userData: object;
}
export function timeMs(seg: number): number {
  return seg * 1000;
}
export function parseCNPJ(cnpjStr: string): CNPJProps | null {
  const clean = cnpjStr.replace(/\D/g, "");
  if (clean.length !== 14) return null;
  return {
    cnpjRoot: parseInt(clean.substring(0, 8)),
    cnpjHeadquarters: parseInt(clean.substring(8, 12)),
    cnpjVerifier: parseInt(clean.substring(12, 14)),
  };
}
export function normalizerCNPJ(value: CNPJProps): string {
  const { cnpjRoot, cnpjHeadquarters, cnpjVerifier } = value;
  return `${cnpjRoot.toString().padStart(8, "0")}${cnpjHeadquarters
    .toString()
    .padStart(4, "0")}${cnpjVerifier.toString().padStart(2, "0")}`;
}
export function formatCNPJ(value: string | string) /* Precisa definir um tipo especifico de calback */ {
  // Remove tudo que não é dígito
  if (typeof value === "string") {
    const cleaned = value.replace(/\D/g, "");
    // Aplica a formatação do CNPJ
    const match = cleaned.match(
      /^(\d{0,2})(\d{0,3})(\d{0,3})(\d{0,4})(\d{0,2})/
    );
    if (!match) return value;
    return [
      match[1],
      match[2] ? `.${match[2]}` : "",
      match[3] ? `.${match[3]}` : "",
      match[4] ? `/${match[4]}` : "",
      match[5] ? `-${match[5]}` : ""
    ].join("");
  } else {
    return "Não é uma string";
  }
}
export async function fetchDataApi(
  url: string,
  addMethod: string,
  addHeader: Record<string, string>,
  addBody: object | null = null
): Promise<Data> {
  try {
    // Configuração da requisição
    const config: RequestInit = {
      method: addMethod,
      headers: {
        "Content-Type": "application/json",
        ...addHeader
      }
    };
    if (addBody) {
      config.body = JSON.stringify(addBody);
    }
    const response = await fetch(url, config);
    if (!response.ok) {
      throw new Error(
        `Erro na requisição: ${response.status} ${response.statusText}`
      );
    }
    const data: Data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Erro ao buscar dados:", error.message);
    } else {
      console.error("Erro desconhecido:", error);
    }
    throw error; // Re-lança o erro para que o chamador possa lidar com ele
  }
}
