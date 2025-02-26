// Fazer get no banco interno e validar
// Encaminhar para home

// export async function fetchDataApi(
//     url: string,
//     addMethod: string,
//     addHeader: object,
//     addBody: object
// ): Promise<Data> {
//     try {
//         const response = await fetch(url, {
//             method: addMethod,
//             headers: addHeader,
//             body: addBody
//         });
//         if (!response.ok) {
//             throw new Error(
//                 `Erro na requisição: ${response.status} ${response.statusText}`
//             );
//         }
//         const data: Data = await response.json();
//         return data;
//     } catch (error) {
//         if (error instanceof Error) {
//             console.error("Erro ao buscar dados:", error.message);
//         } else {
//             console.error("Erro desconhecido:", error);
//         }
//         throw error;
//     } finally {
//         return data;
//     }
// }
