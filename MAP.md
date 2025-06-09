# 🗺️ Mapa de Tarefas - Autenticação e Cadastro de Anúncios (Anunciante)

## ✅ Objetivo Geral

Implementar toda a lógica de autenticação e fluxo de cadastro de anunciantes, além do sistema de criação, edição e listagem de anúncios vinculados aos anunciantes.

---

## 🔐 Autenticação de Anunciante

### 📥 Cadastro de Anunciante

-   [ ✅ ] Criar formulário de cadastro com campos:
    -   [ ✅ ] Nome da empresa
    -   [ ✅ ] E-mail
    -   [ ✅ ] Telefone
    -   [ ✅ ] Senha / Confirmação de senha
-   [ ] Validar dados no frontend
-   [ ] Criar rota `POST /auth/advertiser/register`
-   [ ] Validar dados no backend (duplicidade, formato, etc)
-   [ ] Criptografar senha com bcrypt
-   [ ] Salvar no banco (MongoDB)
-   [ ] Retornar JWT + dados do anunciante

### 🔐 Login de Anunciante

-   [ ] Criar formulário de login
-   [ ] Criar rota `POST /auth/advertiser/login`
-   [ ] Validar credenciais (e-mail + senha)
-   [ ] Gerar e retornar JWT em caso de sucesso
-   [ ] Tratar erros (usuário não encontrado, senha incorreta)
-   [ ] Armazenar token no frontend (ex: AsyncStorage ou LocalStorage)
-   [ ] Redirecionar para `AdvertiserHome`

### 🚪 Logout

-   [ ] Criar botão de logout
-   [ ] Limpar token
-   [ ] Redirecionar para tela de login

---

## 🧾 Cadastro e Gerenciamento de Anúncios

### 📝 Estrutura de Dados do Anúncio

-   [ ] Definir model `Ad` com campos:
    -   [ ] Título
    -   [ ] Descrição
    -   [ ] Link do vídeo ou imagem
    -   [ ] Bairro(s) de exibição
    -   [ ] Data de início / fim
    -   [ ] ID do anunciante (relacionamento)
    -   [ ] Status (ativo, pausado, expirado)

### ➕ Criar Anúncio

-   [ ] Criar formulário com campos acima
-   [ ] Validar no frontend
-   [ ] Criar rota `POST /ads/create`
-   [ ] Validar e salvar anúncio no backend
-   [ ] Associar com ID do anunciante via token

### 📋 Listar Anúncios do Anunciante

-   [ ] Criar rota `GET /ads/my-ads`
-   [ ] Retornar todos os anúncios do anunciante autenticado
-   [ ] Exibir na tela com título, status, datas, etc.

### ✏️ Editar Anúncio

-   [ ] Criar tela/formulário de edição
-   [ ] Criar rota `PUT /ads/:id`
-   [ ] Permitir apenas ao dono editar
-   [ ] Atualizar dados no banco

### 🗑️ Deletar Anúncio (Opcional)

-   [ ] Criar botão de deletar com confirmação
-   [ ] Criar rota `DELETE /ads/:id`
-   [ ] Permitir apenas ao dono excluir

---

## 🔒 Proteção de Rotas

-   [ ] Middleware `authAdvertiser` para validar JWT
-   [ ] Proteger rotas de anúncio (criação, edição, listagem)
-   [ ] Redirecionar para login se não autenticado

---

## 🧪 Testes e Verificações

-   [ ] Testar cadastro/login com dados inválidos
-   [ ] Testar fluxo completo (login → cadastro de anúncio → listagem)
-   [ ] Testar JWT expirado
-   [ ] Testar proteção contra anúncios não autorizados

---

## 🧭 Navegação

-   [ ] Redirecionar para tela correta após login/cadastro
-   [ ] Mostrar mensagens de erro/sucesso
-   [ ] Mostrar loading onde necessário

---

## 📦 Extras Futuramente

-   [ ] Upload de mídia em vez de link
-   [ ] Visualização de métricas dos anúncios
-   [ ] Pagamento para promover anúncios
