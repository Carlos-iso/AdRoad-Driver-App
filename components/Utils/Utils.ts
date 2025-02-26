interface Data {
    id: number;
    token: string;
    issuedAt: number;
    userData: object;
}
export function timeMs(seg: number): number {
    return seg * 1000;
}
export async function fetchDataApi(
    url: string,
    addMethod: string = addMethod,
    addHeader: Record<string, string> = addHeader,
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
