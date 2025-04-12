# Sistema Financeiro

Sistema financeiro para controle de vendas e despesas desenvolvido com Node.js, Express e React.

## 🚀 Funcionalidades

- Controle de vendas
- Gestão de despesas
- Cadastro de clientes
- Controle de produtos
- Relatórios financeiros
- Autenticação de usuários

## 📋 Pré-requisitos

- Node.js (versão 14 ou superior)
- MongoDB
- NPM ou Yarn

## 🔧 Instalação

1. Clone o repositório:
```bash
git clone [URL_DO_REPOSITÓRIO]
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:
```
MONGODB_URI=sua_uri_do_mongodb
PORT=5002
JWT_SECRET=seu_secret_jwt
EMAIL_USER=seu_email
EMAIL_PASS=sua_senha
```

4. Inicie o servidor:
```bash
npm start
```

5. Para desenvolvimento:
```bash
npm run dev
```

## 🌐 Deploy

O projeto está configurado para deploy no Vercel. Para fazer o deploy:

1. Faça login na sua conta do Vercel
2. Importe o repositório
3. Configure as variáveis de ambiente no painel do Vercel
4. Clique em Deploy

## 📦 Estrutura do Projeto

```
├── client/           # Frontend React
├── server/           # Backend Express
├── models/           # Modelos do MongoDB
├── routes/           # Rotas da API
├── middleware/       # Middlewares
└── server.js         # Ponto de entrada do servidor
```

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes. 