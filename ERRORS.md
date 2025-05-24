# Relatório de Erros TypeScript

## 1. **Erros de Desestruturação Não Utilizada** (TS6198)
Esses erros ocorrem quando você faz a desestruturação de objetos mas não utiliza as variáveis extraídas.

- **Arquivo:** `components/Advertiser/AdvertiserBalance/Stylesheet/StyleAdvertiserBalance.ts`
  - **Erro:** Desestruturação não utilizada
  - **Código:** `const { width, height } = Dimensions.get("screen");`

- **Arquivo:** `components/Advertiser/AdvertiserHome/Stylesheet/StyleAdvertiserHome.ts`
  - **Erro:** Desestruturação não utilizada
  - **Código:** `const { width, height } = Dimensions.get("screen");`

- **Arquivo:** `components/Advertiser/AdvertiserProfile/Stylesheet/StyleAdvertiserProfile.ts`
  - **Erro:** Desestruturação não utilizada
  - **Código:** `const { width, height } = Dimensions.get("screen");`

- **Arquivo:** `components/Driver/DriverHome/Stylesheet/StyleDriverHome.tsx`
  - **Erro:** Desestruturação não utilizada
  - **Código:** `const { width, height } = Dimensions.get("screen");`

---

## 2. **Erros de Declarações Não Utilizadas** (TS6133)
Esses erros indicam que algumas variáveis ou importações foram declaradas mas não estão sendo usadas no código.

- **Arquivo:** `components/Advertiser/AdvertiserHome/Index/AdvertiserHome.tsx`
  - **Erros:**
    - `ScrollView` não utilizado
    - `ActivityIndicator` não utilizado
    - `useFocusEffect` não utilizado
    - `setScreenName` não utilizado
    - `route` não utilizado

- **Arquivo:** `components/Advertiser/AdvertiserProfile/Index/AdvertiserProfile.tsx`
  - **Erros:**
    - `ScrollView` não utilizado
    - `StyleSheet` não utilizado

- **Arquivo:** `components/Auth/Index/Auth.tsx`
  - **Erros:**
    - `formatCNPJ` não utilizado
    - `isValid` não utilizado
    - `text` não utilizado (no `onChangeText`)

- **Arquivo:** `components/Driver/DriverHome/Index/DriverHome.tsx`
  - **Erros:**
    - `useEffect` não utilizado
    - `ScrollView` não utilizado
    - `StyleSheet` não utilizado
    - `Dimensions` não utilizado
    - `ImageBackground` não utilizado
    - `setStatus` não utilizado
    - `adPreview` não utilizado
    - `setAdPreview` não utilizado
    - `showEarnings` não utilizado
    - `setShowEarnings` não utilizado
    - `earnings` não utilizado

- **Arquivo:** `components/Driver/DriverProfile/Index/DriverProfile.tsx`
  - **Erros:**
    - `TokenDataLocal` não utilizado

- **Arquivo:** `components/Graphic/Index/Graphic.tsx`
  - **Erro:** `Text` não utilizado

- **Arquivo:** `components/Home/rascunho.tsx`
  - **Erros:**
    - `setStatus` não utilizado
    - `setAdPreview` não utilizado

- **Arquivo:** `components/SplashScreen/Index/SplashScreen.tsx`
  - **Erro:** `SplashScreen` não utilizado

---

## 3. **Erro de Tipo de Argumento** (TS2345)
Esse erro ocorre quando um tipo de dado fornecido não é compatível com o esperado.

- **Arquivo:** `components/Advertiser/AdvertiserHome/Index/AdvertiserHome.tsx`
  - **Erro:** Argumento `null` não pode ser atribuído ao tipo esperado (`DriverProfile | AdvertiserProfile | (() => DriverProfile | AdvertiserProfile)`).

---

## 4. **Erro de Exportação de Módulo** (TS2459)
Esse erro acontece quando você tenta importar algo que é declarado localmente em um módulo, mas não é exportado.

- **Arquivo:** `components/Driver/DriverProfile/Index/DriverProfile.tsx`
  - **Erros:**
    - `DriverProfile` não é exportado corretamente de `../../../Auth/Classes/AuthService`
    - `AdvertiserProfile` não é exportado corretamente de `../../../Auth/Classes/AuthService`

---

## 5. **Erro de Referência a Variável Não Definida** (TS2304)
Esse erro ocorre quando você tenta usar uma variável que não foi definida anteriormente no código.

- **Arquivo:** `components/Advertiser/AdvertiserHome/Index/AdvertiserHome.tsx`
  - **Erro:** `authData` não é definido no arquivo, mas é utilizado na renderização.

---

# Sugestões de Correção

## 1. **Desestruturação Não Utilizada**
Para corrigir os erros de desestruturação não utilizada, basta remover as variáveis não usadas ou utilizá-las corretamente no código. Exemplo:

```ts
const { width, height } = Dimensions.get("screen"); // Se não usar, remova