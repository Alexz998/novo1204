# Instalação do Sistema Financeiro

## Pré-requisitos

1. **Node.js**
   - Baixe e instale o Node.js da página oficial: https://nodejs.org/
   - Escolha a versão LTS (Long Term Support)
   - Durante a instalação, marque a opção para adicionar ao PATH

2. **MongoDB**
   - Baixe o MongoDB Community Server: https://www.mongodb.com/try/download/community
   - Execute o instalador
   - Marque a opção "Install MongoDB as a Service"
   - Mantenha as configurações padrão

## Passos de Instalação

1. **Copiar os arquivos do sistema**
   - Copie toda a pasta do sistema para o computador de destino
   - Certifique-se de copiar todas as pastas e arquivos:
     - `/client`
     - `/server`
     - `/models`
     - `/routes`
     - `/middleware`
     - `server.js`
     - `package.json`
     - `package-lock.json`
     - `.env`
     - `iniciar_oculto.vbs`

2. **Instalar dependências do backend**
   - Abra o Prompt de Comando como Administrador
   - Navegue até a pasta do sistema
   - Execute o comando:
     ```
     npm install
     ```

3. **Instalar dependências do frontend**
   - No mesmo Prompt de Comando
   - Navegue até a pasta client
   - Execute o comando:
     ```
     npm install
     ```

4. **Configurar variáveis de ambiente**
   - Abra o arquivo `.env`
   - Verifique se as configurações estão corretas:
     ```
     MONGODB_URI=mongodb://localhost:27017/sistema-financeiro
     PORT=5002
     JWT_SECRET=Alexzsilva998
     ```

5. **Iniciar o sistema**
   - Dê um duplo clique no arquivo `iniciar_oculto.vbs`
   - O sistema iniciará em segundo plano
   - Uma mensagem popup confirmará o início

## Verificação da Instalação

1. **Verificar se o MongoDB está rodando**
   - Abra o Gerenciador de Serviços (services.msc)
   - Procure por "MongoDB"
   - O status deve estar como "Em execução"

2. **Verificar se o backend está respondendo**
   - Abra o navegador
   - Acesse: http://localhost:5002
   - Deve aparecer uma mensagem de erro (isso é normal, significa que o servidor está rodando)

3. **Verificar se o frontend está respondendo**
   - Abra o navegador
   - Acesse: http://localhost:3000
   - A interface do sistema deve carregar

## Solução de Problemas

1. **Se o MongoDB não iniciar**
   - Verifique se o serviço está instalado
   - Tente reiniciar o serviço no Gerenciador de Serviços

2. **Se o backend não iniciar**
   - Verifique se a porta 5002 está livre
   - Verifique se o MongoDB está rodando
   - Verifique se as dependências foram instaladas corretamente

3. **Se o frontend não iniciar**
   - Verifique se a porta 3000 está livre
   - Verifique se as dependências do frontend foram instaladas
   - Verifique se o backend está rodando

## Desinstalação

1. **Parar os serviços**
   - Abra o Gerenciador de Tarefas
   - Encerre os processos "node.exe" e "npm"

2. **Remover o MongoDB**
   - Abra o Painel de Controle
   - Vá em Programas e Recursos
   - Desinstale o MongoDB

3. **Remover o Node.js**
   - No Painel de Controle
   - Desinstale o Node.js

4. **Remover os arquivos do sistema**
   - Delete a pasta do sistema 