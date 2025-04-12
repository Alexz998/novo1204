const fs = require('fs');
const path = require('path');

// Criar diretório de logs se não existir
const logDir = path.join(__dirname, '../logs');
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

// Função para formatar a data
const formatDate = () => {
  const now = new Date();
  return now.toISOString().replace(/T/, ' ').replace(/\..+/, '');
};

// Função para escrever no arquivo de log
const writeLog = (type, message) => {
  const logFile = path.join(logDir, `${type}.log`);
  const logMessage = `[${formatDate()}] ${message}\n`;
  fs.appendFileSync(logFile, logMessage);
};

// Middleware de logging
const logger = (req, res, next) => {
  // Log da requisição
  const requestLog = `${req.method} ${req.url} - IP: ${req.ip}`;
  writeLog('requests', requestLog);

  // Log do corpo da requisição (exceto para senhas)
  if (req.body) {
    const bodyCopy = { ...req.body };
    if (bodyCopy.senha) bodyCopy.senha = '******';
    writeLog('requests', `Body: ${JSON.stringify(bodyCopy)}`);
  }

  // Interceptar a resposta
  const originalSend = res.send;
  res.send = function (body) {
    // Log da resposta
    writeLog('responses', `${req.method} ${req.url} - Status: ${res.statusCode}`);
    if (body) {
      writeLog('responses', `Response: ${typeof body === 'object' ? JSON.stringify(body) : body}`);
    }

    // Chamar o método original
    return originalSend.call(this, body);
  };

  next();
};

// Função para log de erros
const errorLogger = (error, req, res, next) => {
  const errorLog = `Erro: ${error.message}\nStack: ${error.stack}`;
  writeLog('errors', errorLog);
  next(error);
};

module.exports = { logger, errorLogger }; 