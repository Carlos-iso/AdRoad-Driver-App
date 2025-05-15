interface Data {
  id: number;
  token: string;
  issuedAt: number;
  userData: object;
}
export function timeMs(seg: number): number {
  return seg * 1000;
}
export function formatCNPJ(value: string): string {
    // Remove tudo que não é dígito
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
